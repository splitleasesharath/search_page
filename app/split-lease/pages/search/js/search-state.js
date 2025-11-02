/**
 * Search state management
 */

const SearchState = {
  // State
  state: {
    filters: {
      schedule: [],
      weeklyPattern: null,
      priceRange: null,
      location: { boroughs: [], neighborhoods: [] },
      property: {},
      amenities: [],
      sort: 'our_recommendations',
    },
    results: [],
    loading: false,
    error: null,
  },

  // Listeners
  listeners: [],

  /**
   * Get current state
   */
  getState() {
    return this.state;
  },

  /**
   * Set state and notify listeners
   */
  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  },

  /**
   * Subscribe to state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },

  /**
   * Notify all listeners of state change
   */
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  },

  /**
   * Update filters and trigger search
   */
  updateFilters(newFilters) {
    const mergedFilters = { ...this.state.filters, ...newFilters };
    this.setState({ filters: mergedFilters });

    // Update URL
    if (window.URLParams) {
      window.URLParams.updateUrlParams(mergedFilters);
    }

    // Debounce search
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  },

  /**
   * Perform search with current filters
   */
  async performSearch() {
    this.setState({ loading: true, error: null });

    try {
      // Mock search for now - in production this would call the API
      // const result = await searchListings(this.state.filters);

      // Mock data
      const mockListings = [
        {
          listing: {
            id: '1',
            name: 'Cozy Brooklyn Apartment',
            primary_photo_url: 'https://via.placeholder.com/400x300',
            location: {
              neighborhood: 'Williamsburg',
              borough: 'Brooklyn',
            },
            pricing: {
              standardized_minimum_nightly_price: 150,
            },
            features: {
              bedrooms: 2,
              bathrooms: 1,
              type_of_space: 'Entire Apartment',
            },
          },
          displayPrice: 150,
        },
        {
          listing: {
            id: '2',
            name: 'Manhattan Studio',
            primary_photo_url: 'https://via.placeholder.com/400x300',
            location: {
              neighborhood: 'Chelsea',
              borough: 'Manhattan',
            },
            pricing: {
              standardized_minimum_nightly_price: 200,
            },
            features: {
              bedrooms: 0,
              bathrooms: 1,
              type_of_space: 'Studio',
            },
          },
          displayPrice: 200,
        },
        {
          listing: {
            id: '3',
            name: 'Queens Family Home',
            primary_photo_url: 'https://via.placeholder.com/400x300',
            location: {
              neighborhood: 'Astoria',
              borough: 'Queens',
            },
            pricing: {
              standardized_minimum_nightly_price: 180,
            },
            features: {
              bedrooms: 3,
              bathrooms: 2,
              type_of_space: 'Entire Apartment',
            },
          },
          displayPrice: 180,
        },
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      this.setState({
        results: mockListings,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Failed to load listings. Please try again.',
        loading: false,
      });
    }
  },

  /**
   * Initialize state from URL
   */
  initFromUrl() {
    if (window.URLParams) {
      const urlFilters = window.URLParams.parseUrlParams();
      if (Object.keys(urlFilters).length > 0) {
        this.updateFilters(urlFilters);
      } else {
        // Perform initial search with default filters
        this.performSearch();
      }
    }
  },
};

// Make available globally
window.SearchState = SearchState;
