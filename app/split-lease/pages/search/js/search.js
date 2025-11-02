/**
 * Search Page Initialization
 *
 * Mounts all React islands and manages cross-island state.
 */

(function() {
  'use strict';

  // Check if React and components are loaded
  if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
    console.error('React is not loaded. Make sure React CDN scripts are included.');
    return;
  }

  if (typeof window.SplitLeaseComponents === 'undefined') {
    console.error('SplitLease components are not loaded. Make sure the UMD bundle is included.');
    return;
  }

  // Extract components from the bundle
  const {
    SearchFilters,
    SearchScheduleSelector,
    SearchResults,
    SearchMap,
  } = window.SplitLeaseComponents;

  // URL parameter management
  function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      borough: params.get('borough') || 'Manhattan',
      priceMin: params.get('priceMin') || '200',
      priceMax: params.get('priceMax') || '350',
      weeklyPattern: params.get('weeklyPattern') || 'Every week',
      sortBy: params.get('sortBy') || 'Our Recommendations',
      neighborhoods: params.get('neighborhoods')?.split(',').filter(Boolean) || [],
      days: params.get('days')?.split(',').map(Number).filter(n => !isNaN(n)) || [],
    };
  }

  function updateURLParams(filters) {
    const params = new URLSearchParams();

    if (filters.borough) params.set('borough', filters.borough);
    if (filters.priceTier) {
      params.set('priceMin', filters.priceTier.min.toString());
      params.set('priceMax', filters.priceTier.max.toString());
    }
    if (filters.weeklyPattern) params.set('weeklyPattern', filters.weeklyPattern.display);
    if (filters.sortBy) params.set('sortBy', filters.sortBy.display);
    if (filters.neighborhoods?.length) params.set('neighborhoods', filters.neighborhoods.join(','));
    if (filters.selectedDays?.length) {
      params.set('days', filters.selectedDays.map(d => d.index).join(','));
    }

    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ filters }, '', newURL);
  }

  // Shared state
  const state = {
    filters: {
      borough: 'Manhattan',
      priceTier: { display: '$200-$350/night', min: 200, max: 350 },
      weeklyPattern: { display: 'Every week', shortDisplay: 'Every week', mobileDisplay: 'Every week', period: 1, numWeeksDuring4: 4 },
      sortBy: { display: 'Our Recommendations', fieldName: '.Search Ranking', descending: false, mobileDisplay: 'Our Recommendations' },
      selectedDays: [],
      neighborhoods: [],
    },
    listings: [],
    isLoading: false,
    error: null,
  };

  // Event handlers
  const handlers = {
    onFiltersChange: async function(newFilters) {
      console.log('Filters changed:', newFilters);
      state.filters = { ...state.filters, ...newFilters };
      updateURLParams(state.filters);

      // Re-render results with loading state
      state.isLoading = true;
      renderSearchResults();

      // Fetch new results (mock for now)
      setTimeout(() => {
        state.isLoading = false;
        // TODO: Replace with actual API call
        // const results = await searchListings(state.filters);
        // state.listings = results.listings;
        renderSearchResults();
        renderSearchMap();
      }, 500);
    },

    onScheduleChange: function(selectedDays) {
      console.log('Schedule changed:', selectedDays);
      state.filters.selectedDays = selectedDays;
      updateURLParams(state.filters);
      handlers.onFiltersChange(state.filters);
    },

    onListingClick: function(listingId) {
      console.log('Listing clicked:', listingId);
      // Navigate to listing detail page
      window.location.href = `/listing/${listingId}`;
    },

    onMarkerClick: function(markerId) {
      console.log('Map marker clicked:', markerId);
      // Scroll to listing or open info window
    },
  };

  // Render functions
  function renderSearchFilters() {
    const container = document.getElementById('search-filters-island');
    if (!container) return;

    const root = ReactDOM.createRoot(container);
    root.render(
      React.createElement(SearchFilters, {
        filters: state.filters,
        onFiltersChange: handlers.onFiltersChange,
        showNeighborhood: true,
      })
    );
  }

  function renderSearchScheduleSelector() {
    const container = document.getElementById('schedule-selector-island');
    if (!container) return;

    const root = ReactDOM.createRoot(container);
    root.render(
      React.createElement(SearchScheduleSelector, {
        onSelectionChange: handlers.onScheduleChange,
        minDays: 2,
        maxDays: 5,
        requireContiguous: true,
        initialSelection: state.filters.selectedDays?.map(d => d.index) || [],
      })
    );
  }

  function renderSearchResults() {
    const container = document.getElementById('search-results-island');
    if (!container) return;

    const root = ReactDOM.createRoot(container);
    root.render(
      React.createElement(SearchResults, {
        listings: state.listings,
        isLoading: state.isLoading,
        error: state.error,
        totalCount: state.listings.length,
        onListingClick: handlers.onListingClick,
      })
    );
  }

  function renderSearchMap() {
    const container = document.getElementById('search-map-island');
    if (!container) return;

    const root = ReactDOM.createRoot(container);

    // Convert listings to map markers
    const markers = state.listings.map(listing => ({
      id: listing.id,
      listingId: listing.id,
      position: {
        lat: listing.location?.latitude || 40.7128,
        lng: listing.location?.longitude || -74.0060,
      },
      title: listing.title,
      price: listing.price,
      image: listing.images?.[0]?.url,
      neighborhood: listing.location?.city,
    }));

    root.render(
      React.createElement(SearchMap, {
        markers: markers,
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        onMarkerClick: handlers.onMarkerClick,
        isLoading: state.isLoading,
      })
    );
  }

  // Initialize page
  function init() {
    console.log('Initializing search page...');

    // Load filters from URL
    const urlParams = getURLParams();
    if (urlParams.borough) state.filters.borough = urlParams.borough;

    // Mount all islands
    renderSearchFilters();
    renderSearchScheduleSelector();
    renderSearchResults();
    renderSearchMap();

    // Handle browser back/forward
    window.addEventListener('popstate', function(event) {
      if (event.state && event.state.filters) {
        state.filters = event.state.filters;
        renderSearchFilters();
        renderSearchScheduleSelector();
        handlers.onFiltersChange(state.filters);
      }
    });

    console.log('Search page initialized successfully');
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
