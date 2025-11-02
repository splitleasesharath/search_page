/**
 * URL parameter handling for search page
 */

const URLParams = {
  /**
   * Parse URL parameters into filter object
   */
  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const filters = {};

    // Parse schedule (comma-separated day numbers)
    const scheduleParam = params.get('schedule');
    if (scheduleParam) {
      filters.schedule = scheduleParam.split(',').map(Number);
    }

    // Parse weekly pattern
    const patternParam = params.get('pattern');
    if (patternParam) {
      filters.weeklyPattern = patternParam;
    }

    // Parse price range
    const priceMin = params.get('price_min');
    const priceMax = params.get('price_max');
    if (priceMin || priceMax) {
      filters.priceRange = {};
      if (priceMin) filters.priceRange.min = Number(priceMin);
      if (priceMax) filters.priceRange.max = Number(priceMax);
    }

    // Parse location
    const boroughs = params.get('boroughs');
    const neighborhoods = params.get('neighborhoods');
    if (boroughs || neighborhoods) {
      filters.location = {
        boroughs: boroughs ? boroughs.split(',') : [],
        neighborhoods: neighborhoods ? neighborhoods.split(',') : [],
      };
    }

    // Parse property filters
    const bedrooms = params.get('bedrooms');
    const bathrooms = params.get('bathrooms');
    if (bedrooms || bathrooms) {
      filters.property = {};
      if (bedrooms) filters.property.bedrooms = Number(bedrooms);
      if (bathrooms) filters.property.bathrooms = Number(bathrooms);
    }

    // Parse amenities
    const amenities = params.get('amenities');
    if (amenities) {
      filters.amenities = amenities.split(',');
    }

    // Parse sort
    const sort = params.get('sort');
    if (sort) {
      filters.sort = sort;
    }

    return filters;
  },

  /**
   * Update URL parameters from filters
   */
  updateUrlParams(filters) {
    const params = new URLSearchParams();

    // Add schedule
    if (filters.schedule && filters.schedule.length > 0) {
      params.set('schedule', filters.schedule.join(','));
    }

    // Add weekly pattern
    if (filters.weeklyPattern) {
      params.set('pattern', filters.weeklyPattern);
    }

    // Add price range
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        params.set('price_min', filters.priceRange.min);
      }
      if (filters.priceRange.max !== undefined) {
        params.set('price_max', filters.priceRange.max);
      }
    }

    // Add location
    if (filters.location) {
      if (filters.location.boroughs.length > 0) {
        params.set('boroughs', filters.location.boroughs.join(','));
      }
      if (filters.location.neighborhoods.length > 0) {
        params.set('neighborhoods', filters.location.neighborhoods.join(','));
      }
    }

    // Add property filters
    if (filters.property) {
      if (filters.property.bedrooms !== undefined) {
        params.set('bedrooms', filters.property.bedrooms);
      }
      if (filters.property.bathrooms !== undefined) {
        params.set('bathrooms', filters.property.bathrooms);
      }
    }

    // Add amenities
    if (filters.amenities && filters.amenities.length > 0) {
      params.set('amenities', filters.amenities.join(','));
    }

    // Add sort
    if (filters.sort) {
      params.set('sort', filters.sort);
    }

    // Update URL without reload
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.pushState({ filters }, '', newUrl);
  },
};

// Make available globally
window.URLParams = URLParams;
