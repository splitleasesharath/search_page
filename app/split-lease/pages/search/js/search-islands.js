/**
 * Search Page Islands Mounting Script
 *
 * This script mounts React islands onto the search page following the Islands Architecture pattern.
 * Each island is an independent React component that hydrates a specific DOM container.
 */

(function() {
    'use strict';

    // Wait for DOM and component library to be ready
    if (!window.React || !window.ReactDOM || !window.SplitLeaseComponents) {
        console.error('Required dependencies not loaded: React, ReactDOM, or SplitLeaseComponents');
        return;
    }

    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const {
        SearchFilters,
        MapPlaceholder,
        ListingsGrid,
        Header,
        Footer,
    } = window.SplitLeaseComponents;

    /**
     * Get filter parameters from URL
     * @returns {Object} Filter parameters from URL
     */
    function getFilterParamsFromURL() {
        const params = new URLSearchParams(window.location.search);
        return {
            borough: params.get('borough') || undefined,
            priceTier: params.get('pricetier') || undefined,
            weekPattern: params.get('weekly-frequency') || undefined,
            sort: params.get('sort') || 'Our Recommendations',
        };
    }

    /**
     * Update URL parameters without reloading the page
     * @param {Object} filters - Filter state object
     */
    function updateURLParams(filters) {
        const params = new URLSearchParams();

        if (filters.borough) params.set('borough', filters.borough);
        if (filters.priceTier) params.set('pricetier', filters.priceTier);
        if (filters.weekPattern) params.set('weekly-frequency', filters.weekPattern);
        if (filters.sort && filters.sort !== 'Our Recommendations') {
            params.set('sort', filters.sort);
        }

        const newURL = window.location.pathname + '?' + params.toString();
        window.history.pushState({ filters }, '', newURL);

        console.log('URL updated with filters:', filters);
    }

    /**
     * Mount React islands
     */
    function mountIslands() {
        try {
            // Get initial filter values from URL
            const initialFilters = getFilterParamsFromURL();

            // Mount Header
            const headerContainer = document.getElementById('header');
            if (headerContainer && Header) {
                const headerRoot = ReactDOM.createRoot(headerContainer);
                headerRoot.render(React.createElement(Header));
            } else {
                console.warn('Header container or component not found');
            }

            // Mount Footer
            const footerContainer = document.getElementById('footer');
            if (footerContainer && Footer) {
                const footerRoot = ReactDOM.createRoot(footerContainer);
                footerRoot.render(React.createElement(Footer));
            } else {
                console.warn('Footer container or component not found');
            }

            // Mount Search Filters
            const filtersContainer = document.getElementById('search-filters');
            if (filtersContainer && SearchFilters) {
                const filtersRoot = ReactDOM.createRoot(filtersContainer);
                filtersRoot.render(
                    React.createElement(SearchFilters, {
                        initialFilters: initialFilters,
                        onChange: (filters) => {
                            updateURLParams(filters);
                            // TODO: Trigger listing search with new filters
                            console.log('Filters changed, would trigger search with:', filters);
                        },
                    })
                );
                console.log('Search filters mounted successfully');
            } else {
                console.error('Search filters container or component not found');
            }

            // Mount Map Placeholder
            const mapContainer = document.getElementById('map-container');
            if (mapContainer && MapPlaceholder) {
                const mapRoot = ReactDOM.createRoot(mapContainer);
                mapRoot.render(
                    React.createElement(MapPlaceholder, {
                        center: { lat: 40.7128, lng: -74.0060 }, // NYC coordinates
                        zoom: 11,
                    })
                );
                console.log('Map placeholder mounted successfully');
            } else {
                console.error('Map container or component not found');
            }

            // Mount Listings Grid
            const listingsContainer = document.getElementById('listings-grid');
            if (listingsContainer && ListingsGrid) {
                const listingsRoot = ReactDOM.createRoot(listingsContainer);
                listingsRoot.render(
                    React.createElement(ListingsGrid, {
                        loading: false,
                        // listings prop will use default mock data
                    })
                );
                console.log('Listings grid mounted successfully');
            } else {
                console.error('Listings container or component not found');
            }

            console.log('All islands mounted successfully');
        } catch (error) {
            console.error('Error mounting islands:', error);
        }
    }

    // Mount islands when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mountIslands);
    } else {
        mountIslands();
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.filters) {
            console.log('Browser navigation detected, filters:', event.state.filters);
            // TODO: Re-mount search filters with new state
        }
    });
})();
