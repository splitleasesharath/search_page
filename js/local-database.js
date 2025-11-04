/**
 * Local Database Connection for Split Lease
 * Connects to the SQLite database and the optimized IndexedDB system
 */

class LocalDatabaseManager {
    constructor() {
        this.jsonData = null;
        this.optimizedDB = null;
        this.isLoaded = false;
    }

    /**
     * Initialize the local database connection
     */
    async initialize() {
        try {
            console.log('🗄️ Initializing local database connection...');

            // Try to load from exported JSON file first (fallback)
            await this.loadFromJSON();

            // Initialize optimized IndexedDB for real-time updates
            await this.initializeOptimizedDB();

            this.isLoaded = true;
            console.log('✅ Local database initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize local database:', error);
            return false;
        }
    }

    /**
     * Load data from the exported JSON file as fallback
     */
    async loadFromJSON() {
        try {
            const response = await fetch('./split_lease_listings.json');
            if (response.ok) {
                const data = await response.json();
                this.jsonData = data;
                console.log(`📊 Loaded ${data.listings?.length || 0} listings from JSON export`);
            } else {
                console.warn('⚠️ JSON export file not found, will rely on optimized DB');
            }
        } catch (error) {
            console.warn('⚠️ Could not load JSON export:', error.message);
        }
    }

    /**
     * Initialize the optimized IndexedDB system
     */
    async initializeOptimizedDB() {
        if (typeof OptimizedListingDatabase !== 'undefined') {
            try {
                this.optimizedDB = new OptimizedListingDatabase();
                await this.optimizedDB.init();
                console.log('✅ OptimizedDB initialized successfully');
            } catch (error) {
                console.error('❌ OptimizedDB initialization failed:', error);
            }
        }
    }

    /**
     * Get all listings with optional filters
     */
    async getListings(filters = {}) {
        const rawListings = await this.getRawListings(filters);
        const transformedListings = [];
        for (const listing of rawListings) {
            const transformed = await this.transformListing(listing);
            transformedListings.push(transformed);
        }
        return transformedListings;
    }

    /**
     * Get raw listings from database
     */
    async getRawListings(filters = {}) {
        // Try OptimizedDB first
        if (this.optimizedDB) {
            try {
                const dbFilters = this.convertFiltersForDB(filters);
                const listings = await this.optimizedDB.getListings(dbFilters);
                if (listings && listings.length > 0) {
                    console.log(`📊 Retrieved ${listings.length} listings from OptimizedDB`);
                    return listings;
                }
            } catch (error) {
                console.error('❌ Error fetching from OptimizedDB:', error);
            }
        }

        // Fallback to JSON data
        if (this.jsonData && this.jsonData.listings) {
            let listings = [...this.jsonData.listings];

            // Apply filters to JSON data
            listings = this.applyFiltersToJSON(listings, filters);

            console.log(`📊 Retrieved ${listings.length} listings from JSON fallback`);
            return listings;
        }

        console.warn('⚠️ No data source available');
        return [];
    }

    /**
     * Convert app filters to database filters
     */
    convertFiltersForDB(filters) {
        const dbFilters = {};

        if (filters.borough && filters.borough !== 'all') {
            dbFilters.borough = this.convertBoroughName(filters.borough);
        }

        if (filters.neighborhood) {
            dbFilters.neighborhood = filters.neighborhood;
        }

        if (filters.priceMin !== undefined) {
            dbFilters.minPrice = filters.priceMin;
        }

        if (filters.priceMax !== undefined) {
            dbFilters.maxPrice = filters.priceMax;
        }

        if (filters.bedrooms !== undefined) {
            dbFilters.bedrooms = filters.bedrooms;
        }

        if (filters.typeOfSpace) {
            dbFilters.typeOfSpace = filters.typeOfSpace;
        }

        if (filters.sortBy) {
            dbFilters.sortBy = this.convertSortBy(filters.sortBy);
        }

        if (filters.limit) {
            dbFilters.limit = filters.limit;
        }

        return dbFilters;
    }

    /**
     * Apply filters to JSON data
     */
    applyFiltersToJSON(listings, filters) {
        let filtered = [...listings];

        if (filters.borough && filters.borough !== 'all') {
            const borough = this.convertBoroughName(filters.borough);
            filtered = filtered.filter(listing =>
                listing.Borough && listing.Borough.toLowerCase().includes(borough.toLowerCase())
            );
        }

        if (filters.priceMin !== undefined) {
            filtered = filtered.filter(listing =>
                (listing['Starting nightly price'] || 0) >= filters.priceMin
            );
        }

        if (filters.priceMax !== undefined) {
            filtered = filtered.filter(listing =>
                (listing['Starting nightly price'] || 0) <= filters.priceMax
            );
        }

        if (filters.bedrooms !== undefined) {
            filtered = filtered.filter(listing =>
                (listing['Qty of bedrooms'] || 0) >= filters.bedrooms
            );
        }

        if (filters.typeOfSpace) {
            filtered = filtered.filter(listing =>
                listing['Type of space'] === filters.typeOfSpace
            );
        }

        // Sort listings
        if (filters.sortBy) {
            filtered = this.sortListings(filtered, filters.sortBy);
        }

        // Limit results
        if (filters.limit) {
            filtered = filtered.slice(0, filters.limit);
        }

        return filtered;
    }

    /**
     * Sort listings
     */
    sortListings(listings, sortBy) {
        switch (sortBy) {
            case 'price-low':
                return listings.sort((a, b) =>
                    (a['Starting nightly price'] || 0) - (b['Starting nightly price'] || 0)
                );
            case 'price-high':
                return listings.sort((a, b) =>
                    (b['Starting nightly price'] || 0) - (a['Starting nightly price'] || 0)
                );
            case 'recent':
                return listings.sort((a, b) =>
                    new Date(b['Created Date'] || 0) - new Date(a['Created Date'] || 0)
                );
            case 'modified':
                return listings.sort((a, b) =>
                    new Date(b['Modified Date'] || 0) - new Date(a['Modified Date'] || 0)
                );
            default:
                return listings;
        }
    }

    /**
     * Convert borough filter value to database value
     */
    convertBoroughName(borough) {
        const boroughMap = {
            'manhattan': 'Manhattan',
            'brooklyn': 'Brooklyn',
            'queens': 'Queens',
            'bronx': 'Bronx',
            'bergen': 'Bergen County NJ',
            'essex': 'Essex County NJ',
            'hudson': 'Hudson County NJ'
        };
        return boroughMap[borough] || borough;
    }

    /**
     * Convert sort filter to database sort
     */
    convertSortBy(sortBy) {
        const sortMap = {
            'price-low': 'price-low',
            'price-high': 'price-high',
            'recent': 'recent',
            'most-viewed': 'modified'
        };
        return sortMap[sortBy] || 'recent';
    }

    /**
     * Load images on-demand for a specific listing (lazy loading)
     */
    async loadListingImagesOnDemand(listing) {
        // If images are already loaded, return them
        if (listing.images && Array.isArray(listing.images) && listing.images.length > 0) {
            return listing.images;
        }

        // Check if we have Features - Photos field in the raw listing data
        if (listing._rawListing && listing._rawListing['Features - Photos']) {
            const photos = listing._rawListing['Features - Photos'];

            if (Array.isArray(photos) && photos.length > 0) {
                // Process photo URLs from the database
                const processedPhotos = photos.map(photo => {
                    if (typeof photo === 'string' && photo.startsWith('http')) {
                        return photo;
                    }
                    return null;
                }).filter(Boolean);

                if (processedPhotos.length > 0) {
                    listing.images = processedPhotos.slice(0, 5); // Limit to 5 images max
                    console.log(`📷 Loaded ${listing.images.length} images from IndexedDB for listing ${listing.id}`);
                    return listing.images;
                }
            }
        }

        // No images available - return empty array (don't show any image)
        listing.images = [];
        console.log(`📭 No images available for listing ${listing.id}`);
        return [];
    }

    /**
     * Get fallback images for a listing
     */
    getFallbackImages(id) {
        // Large pool of apartment images for variety
        const fallbackImages = [
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1565183928294-7d21b36c9c24?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=300&fit=crop'
        ];

        // Create unique selection based on listing ID with better distribution
        const idHash = Math.abs(id.split('').reduce((hash, char, i) => {
            return hash + char.charCodeAt(0) * (i + 1);
        }, 0));

        // Select 3 unique images with better distribution
        const indices = [];
        const baseIdx = idHash % fallbackImages.length;

        indices.push(baseIdx);
        indices.push((baseIdx + 7 + (idHash % 5)) % fallbackImages.length);
        indices.push((baseIdx + 13 + (idHash % 7)) % fallbackImages.length);

        // Ensure no duplicates
        const uniqueIndices = [...new Set(indices)];
        while (uniqueIndices.length < 3) {
            uniqueIndices.push((uniqueIndices[uniqueIndices.length - 1] + 3) % fallbackImages.length);
        }

        return uniqueIndices.map(idx => fallbackImages[idx]);
    }

    /**
     * Get listing images from database (NO API CALLS, NO CACHING, NO FALLBACKS)
     */
    async getListingImages(dbListing, id) {
        // Check Features - Photos field
        if (dbListing['Features - Photos'] && Array.isArray(dbListing['Features - Photos'])) {
            const photos = dbListing['Features - Photos'];
            const processedPhotos = photos.map(photo => {
                if (typeof photo === 'string' && photo.startsWith('http')) {
                    return photo;
                }
                return null;
            }).filter(Boolean);

            if (processedPhotos.length > 0) {
                return processedPhotos.slice(0, 5);
            }
        }

        // No images available - return empty array
        return [];
    }

    /**
     * Transform database listing to app format
     */
    async transformListing(dbListing) {
        // Generate a unique ID if needed
        const id = dbListing._id || dbListing.id || Math.random().toString(36).substr(2, 9);

        // Get images from photos field or use fallback images
        let images = [];

        // Handle photos field which can be either a string (JSON) or already an array
        if (dbListing.photos) {
            let photosArray = dbListing.photos;

            // If it's a string, try to parse it as JSON
            if (typeof dbListing.photos === 'string') {
                try {
                    photosArray = JSON.parse(dbListing.photos);
                } catch (e) {
                    console.warn('Failed to parse photos field:', e);
                    photosArray = [];
                }
            }

            // Process the photos array
            if (Array.isArray(photosArray) && photosArray.length > 0) {
                images = photosArray
                    .filter(photo => typeof photo === 'string')
                    .map(photo => {
                        // Handle protocol-relative URLs (starting with //)
                        if (photo.startsWith('//')) {
                            return 'https:' + photo;
                        }
                        // Handle regular URLs
                        if (photo.startsWith('http://') || photo.startsWith('https://')) {
                            return photo;
                        }
                        // Skip invalid URLs
                        return null;
                    })
                    .filter(photo => photo !== null);
            }
        }

        // If no valid photos, use fallback images
        if (images.length === 0) {
            images = this.getFallbackImages(id);
        }

        // Handle both camelCase and snake_case field names from JSON
        const listingName = dbListing['listing_name'] || dbListing['Listing name'] || 'Unnamed Listing';
        const borough = dbListing['borough'] || dbListing['Borough'] || '';
        const neighborhood = dbListing['neighborhood'] || dbListing['Neighborhood'] || '';
        const typeOfSpace = dbListing['type_of_space'] || dbListing['Type of space'] || 'Entire Place';
        const qtyBedrooms = dbListing['qty_bedrooms'] || dbListing['Qty of bedrooms'] || 0;
        const qtyBathrooms = dbListing['qty_bathrooms'] || dbListing['Qty of bathrooms'] || 0;
        const qtyGuests = dbListing['qty_guests_allowed'] || dbListing['Qty of guests allowed'] || 1;
        const kitchenType = dbListing['kitchen_type'] || dbListing['Kitchen type'] || 'Full Kitchen';
        const startingPrice = dbListing['starting_nightly_price'] || dbListing['Starting nightly price'] || 0;
        const price2 = dbListing['price_2_nights'] || dbListing['Price 2 nights selected'] || null;
        const price3 = dbListing['price_3_nights'] || dbListing['Price 3 nights selected'] || null;
        const price4 = dbListing['price_4_nights'] || dbListing['Price 4 nights selected'] || null;
        const price5 = dbListing['price_5_nights'] || dbListing['Price 5 nights selected'] || null;
        const price6 = dbListing['price_6_nights'] || dbListing['Price 6 nights selected'] || null;
        const price7 = dbListing['price_7_nights'] || dbListing['Price 7 nights selected'] || null;
        const hostName = dbListing['host_name'] || dbListing['Host Name'] || 'Host';
        const hostPicture = dbListing['host_picture'] || dbListing['Host Picture'] || '';
        const weeksOffered = dbListing['weeks_offered'] || dbListing['Weeks offered'] || 'Every week';
        const daysAvailable = dbListing['days_available'] || dbListing['Days Available'] || [];
        const createdDate = dbListing['created_date'] || dbListing['Created Date'];
        const modifiedDate = dbListing['modified_date'] || dbListing['Modified Date'];

        // Extract coordinates from Location - Address JSONB field (Bubble API format)
        // Example: {"lat": 40.69493928763478, "lng": -73.99226809951242, "address": "128-132 Pierrepont St, Brooklyn, NY 11201, USA"}
        const locationAddress = dbListing['Location - Address'] || {};
        const latitude = locationAddress.lat || dbListing['listing_address_latitude'] || null;
        const longitude = locationAddress.lng || dbListing['listing_address_longitude'] || null;

        return {
            id: id,
            title: listingName,
            location: this.formatLocation({Borough: borough, Neighborhood: neighborhood}),
            neighborhood: this.extractNeighborhood({Neighborhood: neighborhood}),
            borough: this.normalizeBoroughName(borough),
            coordinates: { lat: latitude || 40.7580, lng: longitude || -73.9855 },
            price: {
                starting: startingPrice,
                full: price7 || price5 || price4 || startingPrice
            },
            // Include all price fields for dynamic pricing
            'Starting nightly price': startingPrice,
            'Price 2 nights selected': price2,
            'Price 3 nights selected': price3,
            'Price 4 nights selected': price4,
            'Price 5 nights selected': price5,
            'Price 6 nights selected': price6,
            'Price 7 nights selected': price7,
            type: typeOfSpace,
            squareFeet: null, // Not available in optimized data
            maxGuests: qtyGuests,
            bedrooms: qtyBedrooms,
            bathrooms: qtyBathrooms,
            kitchen: kitchenType,
            host: {
                name: hostName || 'Host',
                image: hostPicture || this.getHostImage(dbListing),
                verified: false // Not available in current data
            },
            images: images,
            // Store raw database listing for lazy image loading
            _rawListing: dbListing,
            isNew: this.isNewListing(dbListing),
            description: this.generateDescription({
                'Qty of bedrooms': qtyBedrooms,
                'Qty of bathrooms': qtyBathrooms,
                'Kitchen type': kitchenType
            }),
            weeks_offered: weeksOffered,
            days_available: daysAvailable,
            created_date: createdDate,
            modified_date: modifiedDate
        };
    }

    /**
     * Format location string
     */
    formatLocation(listing) {
        const neighborhood = listing.Neighborhood || '';
        const borough = listing.Borough || '';

        if (neighborhood && borough) {
            return `${neighborhood}, ${borough}`;
        } else if (borough) {
            return borough;
        } else {
            return 'New York';
        }
    }

    /**
     * Extract neighborhood for filtering
     */
    extractNeighborhood(listing) {
        const neighborhood = listing.Neighborhood || '';
        return neighborhood.toLowerCase().replace(/\s+/g, '-');
    }

    /**
     * Normalize borough name
     */
    normalizeBoroughName(borough) {
        if (!borough) return 'manhattan';

        const normalized = borough.toLowerCase();
        if (normalized.includes('manhattan')) return 'manhattan';
        if (normalized.includes('brooklyn')) return 'brooklyn';
        if (normalized.includes('queens')) return 'queens';
        if (normalized.includes('bronx')) return 'bronx';
        if (normalized.includes('bergen')) return 'bergen';
        if (normalized.includes('essex')) return 'essex';
        if (normalized.includes('hudson')) return 'hudson';

        return 'manhattan'; // default
    }

    /**
     * Get host image URL
     */
    getHostImage(listing) {
        // Try different field names for host image
        let hostImageUrl = listing['Host Pricture'] || listing.host_picture || listing['Host Picture'];

        if (hostImageUrl) {
            // Fix malformed URLs that start with // (missing protocol)
            if (hostImageUrl.startsWith('//')) {
                hostImageUrl = 'https:' + hostImageUrl;
            }

            // Fix URLs that use file:// protocol - convert to https://
            if (hostImageUrl.startsWith('file://')) {
                hostImageUrl = hostImageUrl.replace('file://', 'https://');
            }

            return hostImageUrl;
        }

        // Use original Bubble host images based on host name
        const bubbleHostImages = [
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409086161x522086459925635800/Robert.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409100287x106329658851495860/herbert.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409115104x181161173223309760/arthur.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409141343x409613303206629500/julia.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409157968x114901798371225990/samuel.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409172448x313002107074554900/selena.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409188815x773479159735143000/cynthiam.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409203960x303451834638118900/cynthia.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409219008x120901643563062940/natalia.PNG',
            'https://50bf0464e4735aabad1cc8848a0e8b8a.cdn.bubble.io/f1728409234623x872087088552266600/sharathb.PNG'
        ];

        // Pick a host image based on host name hash
        const hostName = listing['Host Name'] || 'Host';
        const nameHash = hostName.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
        return bubbleHostImages[nameHash % bubbleHostImages.length];
    }

    /**
     * Get coordinates (placeholder for now)
     */
    getCoordinates(listing) {
        const borough = listing.Borough || '';

        // Default coordinates by borough
        const boroughCoords = {
            'Manhattan': { lat: 40.7580, lng: -73.9855 },
            'Brooklyn': { lat: 40.6782, lng: -73.9442 },
            'Queens': { lat: 40.7282, lng: -73.7949 },
            'Bronx': { lat: 40.8448, lng: -73.8648 },
            'Essex County NJ': { lat: 40.7831, lng: -74.1740 }
        };

        return boroughCoords[borough] || { lat: 40.7580, lng: -73.9855 };
    }

    /**
     * Check if listing is new (created in last 30 days)
     */
    isNewListing(listing) {
        if (!listing['Created Date']) return false;

        const created = new Date(listing['Created Date']);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));

        return created > thirtyDaysAgo;
    }

    /**
     * Generate description from listing data
     */
    generateDescription(listing) {
        const parts = [];

        const bedrooms = listing['Qty of bedrooms'] || 0;
        if (bedrooms === 0) {
            parts.push('Studio');
        } else {
            parts.push(`${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}`);
        }

        const bathrooms = listing['Qty of bathrooms'] || 0;
        if (bathrooms > 0) {
            parts.push(`${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}`);
        }

        const kitchen = listing['Kitchen type'];
        if (kitchen) {
            parts.push(kitchen);
        }

        return '• ' + parts.join(' • ');
    }

    /**
     * Search listings by text
     */
    async searchListings(searchTerm) {
        const allListings = await this.getRawListings();
        const term = searchTerm.toLowerCase();

        const filteredListings = allListings.filter(listing => {
            const searchableFields = [
                listing['Listing name'],
                listing.Borough,
                listing.Neighborhood,
                listing['Type of space'],
                listing['Host Name']
            ];

            return searchableFields.some(field =>
                field && field.toLowerCase().includes(term)
            );
        });

        const transformedResults = [];
        for (const listing of filteredListings) {
            const transformed = await this.transformListing(listing);
            transformedResults.push(transformed);
        }
        return transformedResults;
    }

    /**
     * Get database statistics
     */
    async getStats() {
        if (this.optimizedDB) {
            try {
                return await this.optimizedDB.getStats();
            } catch (error) {
                console.error('Error getting stats from OptimizedDB:', error);
            }
        }

        // Fallback stats from JSON
        if (this.jsonData && this.jsonData.stats) {
            return this.jsonData.stats;
        }

        return {
            totalListings: 0,
            averagePrice: 0,
            listingsByBorough: {},
            listingsByType: {}
        };
    }

    /**
     * Sync with API (refresh data)
     */
    async syncWithAPI() {
        if (this.optimizedDB) {
            try {
                console.log('🔄 Syncing with API...');
                const result = await this.optimizedDB.syncWithAPI();

                if (result.success) {
                    console.log(`✅ Sync completed: ${result.count} listings updated`);
                    // Refresh JSON fallback data
                    await this.loadFromJSON();
                }

                return result;
            } catch (error) {
                console.error('❌ Sync failed:', error);
                return { success: false, error: error.message };
            }
        }

        console.warn('⚠️ No database connection available for sync');
        return { success: false, error: 'No database connection' };
    }
}

// Create global instance
const localDB = new LocalDatabaseManager();

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.LocalDatabaseManager = LocalDatabaseManager;
    window.localDB = localDB;
}