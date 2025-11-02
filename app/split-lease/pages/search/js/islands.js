/**
 * Island mounting logic for search page
 */

(function() {
  'use strict';

  // Wait for DOM and components to be ready
  function waitForDependencies() {
    return new Promise((resolve) => {
      const checkDependencies = () => {
        if (
          window.React &&
          window.ReactDOM &&
          window.SplitLeaseComponents &&
          window.SearchState &&
          window.URLParams
        ) {
          resolve();
        } else {
          setTimeout(checkDependencies, 100);
        }
      };
      checkDependencies();
    });
  }

  // Initialize islands
  async function initializeIslands() {
    await waitForDependencies();

    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const Components = window.SplitLeaseComponents;
    const SearchState = window.SearchState;

    // Initialize search state from URL
    SearchState.initFromUrl();

    // Mount SearchScheduleSelector
    const scheduleElement = document.getElementById('schedule-selector-island');
    if (scheduleElement && Components.SearchScheduleSelector) {
      const scheduleRoot = ReactDOM.createRoot(scheduleElement);
      scheduleRoot.render(
        React.createElement(Components.SearchScheduleSelector, {
          onSelectionChange: (selection) => {
            if (selection.isValid) {
              SearchState.updateFilters({ schedule: selection.selectedDays });
            }
          },
          minDays: 1,
          maxDays: 7,
          requireContiguous: false,
          initialSelection: SearchState.getState().filters.schedule || [],
        })
      );
    }

    // Mount FiltersPanel
    const filtersElement = document.getElementById('filters-panel-island');
    if (filtersElement && Components.FiltersPanel) {
      const filtersRoot = ReactDOM.createRoot(filtersElement);

      const renderFiltersPanel = () => {
        const state = SearchState.getState();
        filtersRoot.render(
          React.createElement(Components.FiltersPanel, {
            onFiltersChange: (filters) => {
              SearchState.updateFilters(filters);
            },
            initialFilters: state.filters,
          })
        );
      };

      renderFiltersPanel();
    }

    // Mount ListingsGrid
    const gridElement = document.getElementById('listings-grid-island');
    if (gridElement && Components.ListingsGrid) {
      const gridRoot = ReactDOM.createRoot(gridElement);

      const renderGrid = () => {
        const state = SearchState.getState();
        gridRoot.render(
          React.createElement(Components.ListingsGrid, {
            listings: state.results,
            loading: state.loading,
            error: state.error,
            onListingView: (listingId) => {
              console.log('View listing:', listingId);
              // Navigate to listing detail page
              // window.location.href = `/listing/${listingId}`;
            },
          })
        );
      };

      // Subscribe to state changes
      SearchState.subscribe(renderGrid);

      // Initial render
      renderGrid();
    }

    // Mount MapView (optional)
    const mapElement = document.getElementById('map-view-island');
    if (mapElement && Components.MapView) {
      const mapRoot = ReactDOM.createRoot(mapElement);

      const renderMap = () => {
        const state = SearchState.getState();
        mapRoot.render(
          React.createElement(Components.MapView, {
            listings: state.results,
            center: { lat: 40.7128, lng: -74.006 }, // NYC center
            zoom: 12,
          })
        );
      };

      // Subscribe to state changes
      SearchState.subscribe(renderMap);

      // Initial render
      renderMap();
    }

    console.log('All islands mounted successfully');
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeIslands);
  } else {
    initializeIslands();
  }
})();
