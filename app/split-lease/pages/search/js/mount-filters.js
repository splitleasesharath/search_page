/**
 * Island Mounting Script for Search Page
 * Mounts React component islands on the static HTML page
 */

(function() {
  'use strict';

  console.log('[Search Page] Initializing component islands...');

  // Wait for DOM and dependencies to be ready
  function initializeIslands() {
    // Check if React and ReactDOM are available
    if (typeof React === 'undefined' || typeof ReactDOM === 'undefined') {
      console.error('[Search Page] React or ReactDOM not loaded');
      return;
    }

    // Check if component library is loaded
    if (typeof window.SplitLeaseComponents === 'undefined') {
      console.error('[Search Page] SplitLeaseComponents library not loaded');
      return;
    }

    console.log('[Search Page] Dependencies loaded successfully');

    // Mount SearchFilters island
    mountSearchFilters();

    // Mount SearchResults island
    mountSearchResults();

    // Mount SearchMap island
    mountSearchMap();
  }

  /**
   * Mount SearchFilters component
   */
  function mountSearchFilters() {
    const mountPoint = document.getElementById('search-filters');

    if (!mountPoint) {
      console.error('[Search Page] Mount point #search-filters not found');
      return;
    }

    try {
      const { SearchFilters } = window.SplitLeaseComponents;

      if (!SearchFilters) {
        console.error('[Search Page] SearchFilters component not found in library');
        return;
      }

      // Create root and render
      const root = ReactDOM.createRoot(mountPoint);

      root.render(
        React.createElement(SearchFilters, {
          onFiltersChange: (state) => {
            console.log('[Search Page] Filters changed:', state);
            // TODO: In future, this will trigger search results update
          }
        })
      );

      console.log('[Search Page] SearchFilters mounted successfully');
    } catch (error) {
      console.error('[Search Page] Error mounting SearchFilters:', error);
    }
  }

  /**
   * Mount SearchResults component
   */
  function mountSearchResults() {
    const mountPoint = document.getElementById('search-results');

    if (!mountPoint) {
      console.error('[Search Page] Mount point #search-results not found');
      return;
    }

    try {
      const { SearchResults } = window.SplitLeaseComponents;

      if (!SearchResults) {
        console.error('[Search Page] SearchResults component not found in library');
        return;
      }

      // Create root and render
      const root = ReactDOM.createRoot(mountPoint);

      root.render(
        React.createElement(SearchResults, {})
      );

      console.log('[Search Page] SearchResults mounted successfully');
    } catch (error) {
      console.error('[Search Page] Error mounting SearchResults:', error);
    }
  }

  /**
   * Mount SearchMap component
   */
  function mountSearchMap() {
    const mountPoint = document.getElementById('search-map');

    if (!mountPoint) {
      console.error('[Search Page] Mount point #search-map not found');
      return;
    }

    try {
      const { SearchMap } = window.SplitLeaseComponents;

      if (!SearchMap) {
        console.error('[Search Page] SearchMap component not found in library');
        return;
      }

      // Create root and render
      const root = ReactDOM.createRoot(mountPoint);

      root.render(
        React.createElement(SearchMap, {})
      );

      console.log('[Search Page] SearchMap mounted successfully');
    } catch (error) {
      console.error('[Search Page] Error mounting SearchMap:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIslands);
  } else {
    initializeIslands();
  }
})();
