/**
 * Search Page Island Mounting Script
 *
 * Mounts React components as islands in the search page HTML.
 * This follows the Islands Architecture pattern where components
 * are independently mounted into designated DOM elements.
 */

(function() {
  'use strict';

  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIslands);
  } else {
    initializeIslands();
  }

  function initializeIslands() {
    console.log('Initializing search page islands...');

    // Check if React and ReactDOM are available
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.error('React or ReactDOM not loaded. Please ensure CDN scripts are loaded.');
      return;
    }

    // Check if component library is available
    if (typeof window.SplitLeaseComponents === 'undefined') {
      console.error('SplitLease components not loaded. Please ensure the UMD bundle is loaded.');
      return;
    }

    const { FilterSidebar, Header, Footer } = window.SplitLeaseComponents;

    // Mount Header
    mountHeader();

    // Mount FilterSidebar
    mountFilterSidebar();

    // Mount Footer
    mountFooter();

    console.log('All islands mounted successfully!');
  }

  /**
   * Mount Header component
   */
  function mountHeader() {
    const headerRoot = document.getElementById('header-root');
    if (!headerRoot) {
      console.warn('Header mount point not found');
      return;
    }

    const { Header } = window.SplitLeaseComponents;
    if (!Header) {
      console.warn('Header component not available');
      return;
    }

    const root = ReactDOM.createRoot(headerRoot);
    root.render(React.createElement(Header, {
      // Add header props as needed
    }));

    console.log('Header mounted');
  }

  /**
   * Mount FilterSidebar component
   */
  function mountFilterSidebar() {
    const sidebarRoot = document.getElementById('filter-sidebar');
    if (!sidebarRoot) {
      console.warn('FilterSidebar mount point not found');
      return;
    }

    const { FilterSidebar } = window.SplitLeaseComponents;
    if (!FilterSidebar) {
      console.error('FilterSidebar component not available');
      return;
    }

    const root = ReactDOM.createRoot(sidebarRoot);
    root.render(React.createElement(FilterSidebar, {
      onFilterChange: function(filters) {
        console.log('Filters changed:', filters);
        // TODO: Implement filter change handling
        // This will be wired up in future phases to fetch/filter listings
      },
      initialFilters: {
        // Add any initial filter values from URL params or saved state
      }
    }));

    console.log('FilterSidebar mounted');
  }

  /**
   * Mount Footer component
   */
  function mountFooter() {
    const footerRoot = document.getElementById('footer-root');
    if (!footerRoot) {
      console.warn('Footer mount point not found');
      return;
    }

    const { Footer } = window.SplitLeaseComponents;
    if (!Footer) {
      console.warn('Footer component not available');
      return;
    }

    const root = ReactDOM.createRoot(footerRoot);
    root.render(React.createElement(Footer, {
      // Add footer props as needed
    }));

    console.log('Footer mounted');
  }

  /**
   * Helper function to get URL parameters
   * Useful for initializing filters from URL state
   */
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      borough: params.get('borough') || undefined,
      neighborhood: params.get('neighborhood') || undefined,
      weeklyPattern: params.get('weeklyPattern') || undefined,
      priceTier: params.get('priceTier') || undefined,
      sortBy: params.get('sortBy') || undefined,
      selectedDays: params.get('selectedDays')?.split(',') || undefined,
    };
  }

  /**
   * Helper function to update URL parameters
   * Useful for syncing filter state with URL
   */
  function updateUrlParams(filters) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          params.set(key, value.join(','));
        } else {
          params.set(key, value);
        }
      }
    });

    const newUrl = window.location.pathname + '?' + params.toString();
    window.history.pushState({ filters }, '', newUrl);
  }

  // Export helper functions to window for use in components
  window.SearchPageHelpers = {
    getUrlParams,
    updateUrlParams,
  };
})();
