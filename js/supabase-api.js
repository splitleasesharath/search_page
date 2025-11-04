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
            if (typeof supabase === 'undefined') {
                console.error('❌ Supabase client library not loaded. Include it in your HTML.');
                return false;
            }

            // Create Supabase client
            this.client = supabase.createClient(this.supabaseUrl, this.supabaseKey);
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
            console.log('🔍 Fetching all listings from Supabase...');

            // Fetch ALL listings without any filters
            const { data, error } = await this.client
                .from('listing')
                .select('*')
                .order('Modified Date', { ascending: false });

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
            '1607041299664x679850027677426300': 'queens',
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
