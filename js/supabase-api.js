/**
 * Supabase API Client for Split Lease
 * Connects to Supabase database to fetch listing data
 */

class SupabaseAPI {
    constructor() {
        this.supabaseUrl = 'https://qcfifybkaddcoimjroca.supabase.co';
        this.supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmlmeWJrYWRkY29pbWpyb2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NzU0MDUsImV4cCI6MjA3NTA1MTQwNX0.glGwHxds0PzVLF1Y8VBGX0jYz3zrLsgE9KAWWwkYms8';
        this.client = null;
        this.isInitialized = false;
    }

    /**
     * Initialize the Supabase client
     */
    async initialize() {
        try {
            // Check if Supabase JS client library is loaded
            // The @supabase/supabase-js@2 CDN exposes window.supabase
            const supabaseLib = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);

            if (!supabaseLib || !supabaseLib.createClient) {
                console.error('❌ Supabase client library not loaded. Include it in your HTML.');
                console.error('   Expected: window.supabase.createClient to be available');
                console.error('   Found: window.supabase =', typeof window.supabase);
                return false;
            }

            // Create Supabase client
            this.client = supabaseLib.createClient(this.supabaseUrl, this.supabaseKey);
            this.isInitialized = true;
            console.log('✅ Supabase API initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Supabase:', error);
            return false;
        }
    }

    /**
     * Get all active listings from Supabase
     * @param {Object} filters - Optional filters for listings
     * @returns {Promise<Array>} Array of transformed listings
     */
    async getListings(filters = {}) {
        if (!this.isInitialized) {
            console.warn('⚠️ Supabase not initialized');
            return [];
        }

        try {
            const hasFilters = filters && Object.keys(filters).length > 0;
            console.log('🔍 Fetching listings from Supabase...', hasFilters ? 'with filters' : 'all listings');
            if (hasFilters) {
                console.log('📋 Active filters:', filters);
            }

            // Build query with filters
            let query = this.client
                .from('listing')
                .select('*')
                .eq('Active', true);
                // Removed .eq('Approved', true) - no listings have Approved=true in database

            // Apply borough filter
            if (filters.boroughs && filters.boroughs.length > 0) {
                console.log('  🏙️ Filtering by boroughs:', filters.boroughs.length);
                query = query.in('Location - Borough', filters.boroughs);
            }

            // Apply week pattern filter
            if (filters.weekPatterns && filters.weekPatterns.length > 0) {
                console.log('  📅 Filtering by week patterns:', filters.weekPatterns);
                query = query.in('Weeks offered', filters.weekPatterns);
            }

            // Apply price range filter
            if (filters.priceRange) {
                console.log('  💰 Filtering by price range:', filters.priceRange);
                if (filters.priceRange.min !== undefined) {
                    query = query.gte('Standarized Minimum Nightly Price (Filter)', filters.priceRange.min);
                }
                if (filters.priceRange.max !== undefined) {
                    query = query.lte('Standarized Minimum Nightly Price (Filter)', filters.priceRange.max);
                }
            }

            // Apply neighborhood filter
            if (filters.neighborhoods && filters.neighborhoods.length > 0) {
                console.log('  🏘️ Filtering by neighborhoods:', filters.neighborhoods.length);
                query = query.in('Location - Hood', filters.neighborhoods);
            }

            // Apply sorting (wrap field names with special characters in quotes)
            if (filters.sort && filters.sort.field) {
                console.log('  🔢 Sorting by:', filters.sort.field, filters.sort.ascending ? 'ASC' : 'DESC');
                // Supabase requires column names with special chars to be quoted
                const sortField = filters.sort.field;
                query = query.order(sortField, { ascending: filters.sort.ascending });
            } else {
                // Default sort by modified date
                query = query.order('Modified Date', { ascending: false });
            }

            const { data, error } = await query;

            if (error) {
                console.error('❌ Error fetching listings:', error);
                return [];
            }

            console.log(`📊 Retrieved ${data.length} listings from Supabase`);

            // Collect all unique photo IDs from all listings
            const allPhotoIds = new Set();
            data.forEach(listing => {
                const photos = listing['Features - Photos'];
                if (Array.isArray(photos)) {
                    photos.forEach(photoId => {
                        if (photoId && typeof photoId === 'string') {
                            allPhotoIds.add(photoId);
                        }
                    });
                }
            });

            console.log(`📸 Found ${allPhotoIds.size} unique photo IDs, fetching URLs...`);

            // Fetch all photo URLs in one batch query
            const photoMap = await this.fetchPhotoUrls(Array.from(allPhotoIds));

            // Transform the raw Supabase data to match the app's expected format
            const transformedListings = data.map(listing => this.transformListing(listing, photoMap));

            return transformedListings;
        } catch (error) {
            console.error('❌ Error in getListings:', error);
            return [];
        }
    }

    /**
     * Fetch photo URLs from listing_photo table by IDs
     * @param {Array<string>} photoIds - Array of photo IDs
     * @returns {Promise<Object>} Map of photo ID to photo URL
     */
    async fetchPhotoUrls(photoIds) {
        if (!photoIds || photoIds.length === 0) {
            return {};
        }

        try {
            const { data, error } = await this.client
                .from('listing_photo')
                .select('_id, Photo')
                .in('_id', photoIds);

            if (error) {
                console.error('❌ Error fetching photos:', error);
                return {};
            }

            // Create a map of photo ID to URL
            const photoMap = {};
            data.forEach(photo => {
                if (photo.Photo) {
                    // Add https: protocol if URL starts with //
                    let photoUrl = photo.Photo;
                    if (photoUrl.startsWith('//')) {
                        photoUrl = 'https:' + photoUrl;
                    }
                    photoMap[photo._id] = photoUrl;
                }
            });

            console.log(`✅ Fetched ${Object.keys(photoMap).length} photo URLs`);
            return photoMap;
        } catch (error) {
            console.error('❌ Error in fetchPhotoUrls:', error);
            return {};
        }
    }

    /**
     * Transform Supabase listing to app format
     * @param {Object} dbListing - Raw listing from Supabase
     * @param {Object} photoMap - Map of photo IDs to URLs
     * @returns {Object} Transformed listing
     */
    transformListing(dbListing, photoMap = {}) {
        // Extract basic info
        const id = dbListing._id;
        const name = dbListing.Name || 'Unnamed Listing';
        const borough = this.normalizeBoroughName(dbListing['Location - Borough']);
        const neighborhood = dbListing['Location - Hood'] || dbListing['neighborhood (manual input by user)'] || '';

        // Extract pricing - Supabase stores per-night rates
        // Use null instead of 0 for missing prices so downstream code can handle appropriately
        const rawStartingPrice = dbListing['Standarized Minimum Nightly Price (Filter)'];
        const startingPrice = (rawStartingPrice !== null && rawStartingPrice !== undefined)
            ? parseFloat(rawStartingPrice)
            : null;

        const price2 = parseFloat(dbListing['💰Nightly Host Rate for 2 nights']) || null;
        const price3 = parseFloat(dbListing['💰Nightly Host Rate for 3 nights']) || null;
        const price4 = parseFloat(dbListing['💰Nightly Host Rate for 4 nights']) || null;
        const price5 = parseFloat(dbListing['💰Nightly Host Rate for 5 nights']) || null;
        const price7 = parseFloat(dbListing['💰Nightly Host Rate for 7 nights']) || null;

        // Extract features
        const bedrooms = dbListing['Features - Qty Bedrooms'] || 0;
        const bathrooms = dbListing['Features - Qty Bathrooms'] || 0;
        const guests = dbListing['Features - Qty Guests'] || 1;
        const typeOfSpace = dbListing['Features - Type of Space'] || 'Entire Place';
        const kitchenType = dbListing['Kitchen Type'] || 'Full Kitchen';

        // Extract photos using photoMap to convert IDs to URLs
        const photos = this.extractPhotos(dbListing['Features - Photos'], photoMap);

        // Extract coordinates
        const address = dbListing['Location - Address'];
        const coordinates = {
            lat: address?.lat || 40.7580,
            lng: address?.lng || -73.9855
        };

        // Extract host info
        const hostName = dbListing['host name'] || 'Host';
        const hostEmail = dbListing['Host email'] || '';

        // Extract availability info
        const daysAvailable = dbListing['Days Available (List of Days)'] || [];
        const weeksOffered = dbListing['Weeks offered'] || 'Every week';

        return {
            id: id,
            title: name,
            location: this.formatLocation(neighborhood, borough),
            neighborhood: neighborhood,
            borough: borough,
            coordinates: coordinates,
            price: {
                starting: startingPrice || 0,
                full: price7 || price5 || startingPrice || 0
            },
            // Include all price fields for dynamic pricing (both standard and emoji field names)
            'Starting nightly price': startingPrice,
            'Price 2 nights selected': price2,
            'Price 3 nights selected': price3,
            'Price 4 nights selected': price4,
            'Price 5 nights selected': price5,
            'Price 6 nights selected': null, // Not in Supabase schema
            'Price 7 nights selected': price7,
            // Also include emoji field names for map marker fallback logic
            '💰Nightly Host Rate for 2 nights': price2,
            '💰Nightly Host Rate for 3 nights': price3,
            '💰Nightly Host Rate for 4 nights': price4,
            '💰Nightly Host Rate for 5 nights': price5,
            '💰Nightly Host Rate for 7 nights': price7,
            type: typeOfSpace,
            squareFeet: dbListing['Features - SQFT Area'] || null,
            maxGuests: guests,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            kitchen: kitchenType,
            host: {
                name: hostName,
                image: this.getHostImage(hostName),
                verified: false
            },
            images: photos,
            description: this.generateDescription(bedrooms, bathrooms, kitchenType),
            weeks_offered: weeksOffered,
            days_available: daysAvailable,
            created_date: dbListing['Created Date'],
            modified_date: dbListing['Modified Date'],
            isNew: this.isNewListing(dbListing['Created Date']),
            _rawListing: dbListing
        };
    }

    /**
     * Extract photos from Supabase photos field and convert IDs to URLs
     * @param {Array} photosField - Array of photo IDs from Features - Photos
     * @param {Object} photoMap - Map of photo IDs to actual URLs
     */
    extractPhotos(photosField, photoMap = {}) {
        if (!photosField || !Array.isArray(photosField)) {
            return this.getFallbackImages();
        }

        // Convert photo IDs to actual URLs using photoMap
        const photoUrls = photosField
            .filter(photoId => typeof photoId === 'string')
            .map(photoId => photoMap[photoId])
            .filter(url => url !== undefined && url !== null)
            .slice(0, 5); // Limit to 5 images

        return photoUrls.length > 0 ? photoUrls : this.getFallbackImages();
    }

    /**
     * Get fallback images when no photos available
     */
    getFallbackImages() {
        const fallbackImages = [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop'
        ];
        return fallbackImages;
    }

    /**
     * Format location string
     */
    formatLocation(neighborhood, borough) {
        if (neighborhood && borough) {
            return `${neighborhood}, ${borough}`;
        } else if (borough) {
            return borough;
        } else {
            return 'New York';
        }
    }

    /**
     * Normalize borough name to lowercase format
     */
    normalizeBoroughName(boroughId) {
        // Map Supabase borough IDs to normalized names
        const boroughMap = {
            '1607041299687x679479834266385900': 'manhattan',
            '1607041299637x913970439175620100': 'brooklyn',
            '1607041299828x406969561802059650': 'queens',  // Corrected: validated via database query
            '1607041299714x866026028780297600': 'bronx',
            '1607041299747x827062990768184900': 'bergen',
            '1607041299777x826854337748672500': 'essex',
            '1607041299803x542854758464683600': 'hudson'
        };

        return boroughMap[boroughId] || 'manhattan';
    }

    /**
     * Get host image based on host name
     */
    getHostImage(hostName) {
        const bubbleHostImages = [
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409086161x522086459925635800/Robert.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409100287x106329658851495860/herbert.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409115104x181161173223309760/arthur.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409141343x409613303206629500/julia.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409157968x114901798371225990/samuel.PNG'
        ];

        const nameHash = hostName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
        return bubbleHostImages[nameHash % bubbleHostImages.length];
    }

    /**
     * Check if listing is new (created within last 30 days)
     */
    isNewListing(createdDate) {
        if (!createdDate) return false;
        const created = new Date(createdDate);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        return created > thirtyDaysAgo;
    }

    /**
     * Generate description from listing features
     */
    generateDescription(bedrooms, bathrooms, kitchenType) {
        const parts = [];

        if (bedrooms === 0) {
            parts.push('Studio');
        } else {
            parts.push(`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`);
        }

        if (bathrooms > 0) {
            parts.push(`${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}`);
        }

        if (kitchenType) {
            parts.push(kitchenType);
        }

        return '• ' + parts.join(' • ');
    }

    /**
     * Get all boroughs from zat_geo_borough_toplevel table
     * @returns {Promise<Array>} Array of borough objects with id and name
     */
    async getBoroughs() {
        if (!this.isInitialized) {
            console.warn('⚠️ Supabase not initialized');
            return [];
        }

        try {
            console.log('🏙️ Fetching boroughs from database...');

            const { data, error } = await this.client
                .from('zat_geo_borough_toplevel')
                .select('_id, "Display Borough"')
                .order('Display Borough', { ascending: true });

            if (error) {
                console.error('❌ Error fetching boroughs:', error);
                return [];
            }

            // Transform to app format
            const boroughs = data
                .filter(b => b['Display Borough'] && b['Display Borough'].trim())
                .map(b => ({
                    id: b._id,
                    name: b['Display Borough'].trim(),
                    // Generate value for select option (lowercase, replace spaces)
                    value: b['Display Borough'].trim().toLowerCase()
                        .replace(/\s+county\s+nj/i, '') // Remove "County NJ"
                        .replace(/\s+/g, '-') // Replace spaces with hyphens
                }));

            console.log(`✅ Fetched ${boroughs.length} boroughs from database`);
            return boroughs;
        } catch (error) {
            console.error('❌ Error in getBoroughs:', error);
            return [];
        }
    }

    /**
     * Get all neighborhoods from zat_geo_hood_mediumlevel table
     * @param {string} boroughId - Optional borough ID to filter neighborhoods
     * @returns {Promise<Array>} Array of neighborhood objects with id, name, and borough
     */
    async getNeighborhoods(boroughId = null) {
        if (!this.isInitialized) {
            console.warn('⚠️ Supabase not initialized');
            return [];
        }

        try {
            console.log('🏘️ Fetching neighborhoods from database...', boroughId ? `for borough: ${boroughId}` : 'all');

            let query = this.client
                .from('zat_geo_hood_mediumlevel')
                .select('_id, Display, "Geo-Borough"')
                .order('Display', { ascending: true });

            // Filter by borough if provided
            if (boroughId) {
                query = query.eq('Geo-Borough', boroughId);
            }

            const { data, error } = await query;

            if (error) {
                console.error('❌ Error fetching neighborhoods:', error);
                return [];
            }

            // Transform to app format
            const neighborhoods = data
                .filter(n => n.Display && n.Display.trim()) // Filter out empty or null Display names
                .map(n => ({
                    id: n._id,
                    name: n.Display.trim(),
                    boroughId: n['Geo-Borough'],
                    // Generate kebab-case value for checkbox value attribute
                    value: n.Display.trim().toLowerCase()
                        .replace(/[^\w\s-]/g, '') // Remove special chars
                        .replace(/\s+/g, '-') // Replace spaces with hyphens
                        .replace(/--+/g, '-') // Replace multiple hyphens with single
                }));

            console.log(`✅ Fetched ${neighborhoods.length} neighborhoods from database`);
            return neighborhoods;
        } catch (error) {
            console.error('❌ Error in getNeighborhoods:', error);
            return [];
        }
    }

    /**
     * Get database statistics
     */
    async getStats() {
        if (!this.isInitialized) return null;

        try {
            const { data, error } = await this.client
                .from('listing')
                .select('_id, "Location - Borough", "Standarized Minimum Nightly Price (Filter)"')
                .eq('Active', true);

            if (error) throw error;

            // Calculate stats
            const totalListings = data.length;
            const prices = data
                .map(l => parseFloat(l['Standarized Minimum Nightly Price (Filter)']))
                .filter(p => !isNaN(p) && p > 0);

            const averagePrice = prices.length > 0
                ? prices.reduce((a, b) => a + b, 0) / prices.length
                : 0;

            return {
                totalListings,
                averagePrice: averagePrice.toFixed(2)
            };
        } catch (error) {
            console.error('Error getting stats:', error);
            return null;
        }
    }

    // Alias methods for backward compatibility with remote code
    async init() {
        return await this.initialize();
    }

    async fetchListings(filters = {}) {
        return await this.getListings(filters);
    }
}

// Create global instance
window.SupabaseAPI = new SupabaseAPI();
