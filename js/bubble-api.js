// Bubble API Configuration
const BUBBLE_CONFIG = {
    // Your actual Bubble app domain from Swagger
    appDomain: 'upgradefromstr.bubbleapps.io', // From swagger.json
    apiPath: '/version-test/api/1.1', // From DATA API root

    // Your API key
    apiKey: window.ENV?.BUBBLE_API_KEY || 'YOUR_BUBBLE_API_KEY',

    // Data type names in Bubble (from Swagger endpoints)
    dataTypes: {
        listings: 'listing',
        listingPhotos: 'listing-photo',
        hosts: 'account-host',
        guests: 'account-guest',
        bookings: 'bookings-leases',
        locations: 'zat-location'
    }
};

// Base API URL - using the actual path from the DATA API root
const API_BASE = `https://${BUBBLE_CONFIG.appDomain}${BUBBLE_CONFIG.apiPath}`;

// Fetch listings from Bubble database
async function fetchListingsFromBubble(filters = {}) {
    try {
        console.log('Fetching listings from Bubble...');

        // Build query parameters
        const queryParams = new URLSearchParams();

        // Add constraints if filters provided
        if (filters.borough) {
            const constraints = [
                { key: 'borough', constraint_type: 'equals', value: filters.borough }
            ];
            queryParams.append('constraints', JSON.stringify(constraints));
        }

        if (filters.priceMin || filters.priceMax) {
            const priceConstraints = [];
            if (filters.priceMin) {
                priceConstraints.push({
                    key: 'price_starting',
                    constraint_type: 'greater than',
                    value: filters.priceMin
                });
            }
            if (filters.priceMax) {
                priceConstraints.push({
                    key: 'price_starting',
                    constraint_type: 'less than',
                    value: filters.priceMax
                });
            }
            queryParams.append('constraints', JSON.stringify(priceConstraints));
        }

        // Add sorting
        if (filters.sortBy) {
            queryParams.append('sort_field', filters.sortBy);
            queryParams.append('descending', filters.sortOrder === 'desc');
        }

        // Add pagination
        queryParams.append('limit', filters.limit || 20);
        queryParams.append('cursor', filters.cursor || 0);

        // Make API request
        const url = `${API_BASE}/obj/${BUBBLE_CONFIG.dataTypes.listings}?${queryParams}`;
        console.log('API URL:', url);

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${BUBBLE_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        // Check if we have results
        if (data.response && data.response.results) {
            console.log(`Found ${data.response.results.length} listings`);

            // Fetch associated photos for each listing
            const listingsWithPhotos = await fetchPhotosForListings(data.response.results);

            // Transform Bubble data to match our format
            return transformBubbleData(listingsWithPhotos);
        } else {
            console.log('No results found');
            return [];
        }

    } catch (error) {
        console.error('Error fetching from Bubble:', error);
        // Fallback to local data if API fails
        return listingsData;
    }
}

// Fetch photos for listings
async function fetchPhotosForListings(listings) {
    try {
        // Fetch all listing photos
        const photosResponse = await fetch(
            `${API_BASE}/obj/${BUBBLE_CONFIG.dataTypes.listingPhotos}`,
            {
                headers: {
                    'Authorization': `Bearer ${BUBBLE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (photosResponse.ok) {
            const photosData = await photosResponse.json();
            const photos = photosData.response?.results || [];

            // Map photos to listings
            return listings.map(listing => {
                const listingPhotos = photos.filter(photo =>
                    photo.listing === listing._id
                );
                listing.photos = listingPhotos;
                return listing;
            });
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
    }

    return listings;
}

// Transform Bubble data structure to match our local format
function transformBubbleData(bubbleListings) {
    console.log('Transforming Bubble data...');
    console.log('Sample listing data:', bubbleListings[0]);

    return bubbleListings.map((item, index) => ({
        id: item._id || index + 1,
        title: item.title || item.property_name,
        location: `${item.neighborhood}, ${item.borough}`,
        neighborhood: item.neighborhood?.toLowerCase().replace(/\s+/g, '-'),
        borough: item.borough?.toLowerCase(),
        coordinates: {
            lat: item.latitude || 40.7128,
            lng: item.longitude || -74.0060
        },
        price: {
            starting: item.price_starting || item.nightly_rate_7_nights,
            full: item.price_full || item.nightly_rate_2_nights
        },
        type: item.property_type || 'Entire Place',
        squareFeet: item.square_feet,
        maxGuests: item.max_guests || item.guest_capacity,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        kitchen: item.kitchen_type || 'Full Kitchen',
        host: {
            name: item.host_name || item.host?.name || 'Host',
            image: item.host_image || item.host?.profile_image,
            verified: item.host_verified || false
        },
        images: getListingImages(item),
        isNew: item.is_new || item.created_date > Date.now() - 7 * 24 * 60 * 60 * 1000,
        description: item.description || `• ${item.bedrooms || 'Studio'} • ${item.bathrooms} bathroom • ${item.kitchen_type || 'Kitchen'}`
    }));
}

// Helper function to extract images from listing data
function getListingImages(item) {
    const images = [];

    // Check for photos array from listing-photo data type
    if (item.photos && item.photos.length > 0) {
        item.photos.forEach(photo => {
            if (photo.image_url) images.push(photo.image_url);
            if (photo.photo) images.push(photo.photo);
            if (photo.url) images.push(photo.url);
        });
    }

    // Check for direct image fields on the listing
    // Common field names in Bubble for images
    const imageFields = [
        'image', 'images', 'photos', 'pictures',
        'image_1', 'image_2', 'image_3', 'image_4', 'image_5',
        'photo_1', 'photo_2', 'photo_3', 'photo_4', 'photo_5',
        'listing_image_1', 'listing_image_2', 'listing_image_3',
        'property_image_1', 'property_image_2', 'property_image_3'
    ];

    imageFields.forEach(field => {
        if (item[field]) {
            if (Array.isArray(item[field])) {
                images.push(...item[field]);
            } else if (typeof item[field] === 'string') {
                images.push(item[field]);
            }
        }
    });

    // Return filtered unique images, or placeholders if none found
    const uniqueImages = [...new Set(images.filter(Boolean))];

    if (uniqueImages.length === 0) {
        console.log('No images found for listing:', item.title || item._id);
        // Return placeholder images
        return [
            'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=No+Image',
            'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Property+Photo',
            'https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Listing+Image'
        ];
    }

    return uniqueImages.slice(0, 5); // Return up to 5 images
}

// Search listings with Bubble's search API
async function searchListings(searchTerm) {
    try {
        const response = await fetch(
            `${API_BASE}/obj/${BUBBLE_CONFIG.dataTypes.listings}/search`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${BUBBLE_CONFIG.apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    search_field: 'title',
                    search_value: searchTerm
                })
            }
        );

        const data = await response.json();
        return transformBubbleData(data.response.results);

    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

// Initialize connection to Bubble
async function initializeBubbleConnection() {
    console.log('Connecting to Bubble database...');

    // Test the connection
    try {
        const testData = await fetchListingsFromBubble({ limit: 1 });
        if (testData && testData.length > 0) {
            console.log('✓ Successfully connected to Bubble database');
            return true;
        }
    } catch (error) {
        console.warn('Could not connect to Bubble API, using local data');
        return false;
    }
}

// Export for use in app.js
window.BubbleAPI = {
    fetchListings: fetchListingsFromBubble,
    searchListings: searchListings,
    initialize: initializeBubbleConnection
};