# Search Page

The Search Page is the main interface for users to find and filter rental listings on Split Lease. It implements the Islands Architecture pattern with React component islands mounted on a static HTML page.

## Overview

- **Location**: `app/split-lease/pages/search/`
- **Architecture**: Islands Architecture (Static HTML + React Islands)
- **Status**: Skeletal implementation (filters working, database integration pending)

## Page Structure

### HTML Structure (`index.html`)
- Static HTML page with semantic structure
- React 18 loaded via CDN
- Component library UMD bundle loaded
- Island mounting script initializes React components

### Layout
```
┌─────────────────────────────────────────────┐
│              Header (React Island)           │
├──────────────┬──────────────────────────────┤
│              │                              │
│   Filters    │      Map (Placeholder)       │
│   (React     │                              │
│   Island)    ├──────────────────────────────┤
│              │                              │
│              │   Listings Grid (React)      │
│              │                              │
└──────────────┴──────────────────────────────┘
│              Footer (React Island)           │
└─────────────────────────────────────────────┘
```

## Components

### Search Filters (`SearchFilters`)
Main filter container that composes all individual filter components.

**Location**: `app/split-lease/components/src/SearchFilters/`

**Features**:
- Borough filter (7 options)
- Price tier filter (4 tiers + all prices)
- Week pattern filter (4 schedule options)
- Sort filter (4 sort options)
- Search Schedule Selector placeholder

**Props**:
- `initialFilters`: Partial filter state from URL parameters
- `onChange`: Callback when filters change

### Borough Filter (`BoroughFilter`)
Dropdown to select borough/service area.

**Options**:
- Manhattan
- Brooklyn
- Queens
- Bronx
- Bergen County NJ
- Essex County NJ
- Hudson County NJ

### Price Tier Filter (`PriceTierFilter`)
Dropdown to select price range.

**Options**:
- < $200/night
- $200-$350/night
- $350-$500/night
- $500+/night
- All Prices

### Week Pattern Filter (`WeekPatternFilter`)
Dropdown to select weekly rental schedule.

**Options**:
- Every week (1 week on, 0 off)
- One week on/one week off (2 week period)
- Two weeks on/two weeks off (4 week period)
- One week on/three weeks off (4 week period)

### Sort Filter (`SortFilter`)
Dropdown to select listing sort order.

**Options**:
- Our Recommendations (default)
- Price-Lowest to Highest
- Most viewed
- Recently Added

### Map Placeholder (`MapPlaceholder`)
Placeholder component for Google Maps integration.

**Future Implementation**:
- Interactive map with listing markers
- Borough-based centering
- Marker clustering
- Info windows with listing previews

### Listings Grid (`ListingsGrid`)
Grid display of listing cards.

**Current State**: Shows mock data (4 placeholder listings)

**Features**:
- Responsive grid layout
- Listing cards with image, title, details, price
- Empty state handling
- Loading state support

## Islands Mounting

The `search-islands.js` script mounts React components at specific DOM locations:

1. **Header Island**: `#header`
2. **Search Filters Island**: `#search-filters`
3. **Map Placeholder Island**: `#map-container`
4. **Listings Grid Island**: `#listings-grid`
5. **Footer Island**: `#footer`

### Mounting Process
```javascript
// Example: Mounting Search Filters
const filtersContainer = document.getElementById('search-filters');
const filtersRoot = ReactDOM.createRoot(filtersContainer);
filtersRoot.render(
    React.createElement(SearchFilters, {
        initialFilters: getFilterParamsFromURL(),
        onChange: updateURLParams,
    })
);
```

## URL Parameters

Filter state is synchronized with URL parameters for:
- Deep linking to specific searches
- Browser back/forward navigation
- Sharing search results

### Parameter Mapping
- `borough` → Borough filter
- `pricetier` → Price tier filter
- `weekly-frequency` → Week pattern filter
- `sort` → Sort option

### Example URL
```
/search?borough=Manhattan&pricetier=$200-$350/night&sort=Price-Lowest%20to%20Highest
```

## Placeholder Integrations

### Supabase Database
**File**: `js/supabase-client.js`

Skeletal functions for:
- `searchListings(filters)` - Query listings
- `saveSearch(userId, filters)` - Save search
- `getListingsByBorough(borough)` - Borough-specific query
- `getAvailableDates(listingId, startDate, endDate)` - Availability
- `logSearchActivity(searchData)` - Analytics
- `getListingById(listingId)` - Single listing details

**Planned Schema**:
- Listings
- Users
- Listing-Photo
- Proposal
- pricing_list
- ZAT-Geo-Borough-Top Level
- ZAT-Geo-Hood-Medium Level
- ZAT-Location
- ZAT-Features
- Saved Search
- Notification Settings
- Data Collection-Search Logging
- Days/Nights Available

### Google Maps
**File**: `js/maps-client.js`

Skeletal functions for:
- `initMap(containerId, options)` - Initialize map
- `addMarkers(map, listings)` - Add listing markers
- `centerMapOnBorough(map, borough)` - Borough centering
- `addMarkerClustering(map, markers)` - Marker clustering
- `fitMapToMarkers(map, markers)` - Auto-zoom to markers
- `loadGoogleMapsAPI(apiKey)` - API loading

**Borough Coordinates**:
- Manhattan: 40.7831, -73.9712
- Brooklyn: 40.6782, -73.9442
- Queens: 40.7282, -73.7949
- Bronx: 40.8448, -73.8648
- Bergen County NJ: 40.9263, -74.0776
- Essex County NJ: 40.7870, -74.2318
- Hudson County NJ: 40.7453, -74.0446

## Styling

### CSS Files
- `css/search.css` - Page-specific styles
- `../../components/dist/style.css` - Component library styles

### Layout
- Two-column grid: 320px sidebar + flexible main area
- Sticky filter sidebar
- Responsive breakpoints at 1024px, 768px, 480px
- Mobile-first approach with stacked layout on small screens

### Color Scheme
```css
--primary-color: #1a73e8;
--secondary-color: #34a853;
--text-color: #202124;
--border-color: #dadce0;
--background-color: #f8f9fa;
```

## Development

### Building Components
```bash
cd app/split-lease/components
npm install
npm run build
```

This generates:
- `dist/split-lease-components.umd.js` - UMD bundle
- `dist/style.css` - Component styles

### Type Checking
```bash
cd app/split-lease/components
npm run typecheck
```

### Testing Locally
Open `app/split-lease/pages/search/index.html` in a browser:
1. All filter dropdowns should render
2. Filter selections should log to console
3. URL should update when filters change
4. Mock listings should display in grid
5. Map placeholder should show

## Future Enhancements

### Phase 2: Database Integration
- [ ] Connect Supabase client with environment variables
- [ ] Implement real-time listing queries
- [ ] Add pagination for large result sets
- [ ] Implement saved searches functionality
- [ ] Add search analytics tracking

### Phase 3: Maps Integration
- [ ] Obtain Google Maps API key
- [ ] Implement interactive map
- [ ] Add listing markers with clustering
- [ ] Implement info windows
- [ ] Add map-based filtering (drag to search)

### Phase 4: Search Schedule Selector
- [ ] Clone and integrate external component
- [ ] Adapt to Islands Architecture
- [ ] Connect to filter state
- [ ] Implement date range selection

### Phase 5: Advanced Features
- [ ] Neighborhood refinement filter
- [ ] Amenity filters
- [ ] Advanced search (multiple bedrooms, etc.)
- [ ] User authentication for saved searches
- [ ] Loading states and error handling
- [ ] Accessibility improvements (ARIA, keyboard nav)
- [ ] Mobile filter drawer/modal
- [ ] Search suggestions/autocomplete

## Known Issues

1. **Search Schedule Selector**: Placeholder only, needs integration from external repo
2. **Mock Data**: Listings grid shows placeholder data
3. **No Backend**: Filter changes log to console but don't query database
4. **Missing Features**: No neighborhood filter, amenity filters, or advanced options

## Testing

### Manual Testing Checklist
- [ ] Page loads without errors
- [ ] All filter dropdowns render
- [ ] Filter selections update URL parameters
- [ ] URL parameters initialize filters on page load
- [ ] Browser back/forward buttons work
- [ ] Mock listings display correctly
- [ ] Map placeholder shows
- [ ] Responsive layout works on mobile, tablet, desktop
- [ ] No console errors (except expected TODOs)

### Browser Compatibility
- Chrome/Edge: ✓ Tested
- Firefox: Should work (untested)
- Safari: Should work (untested)
- Mobile browsers: Should work (untested)

## Performance

- **Initial Load**: Fast (static HTML)
- **Island Hydration**: Minimal delay with CDN React
- **Component Bundle**: ~103 KB (gzipped: 28 KB)
- **CSS Bundle**: ~14 KB (gzipped: 3 KB)

## SEO Considerations

- Static HTML provides good initial SEO
- Meta tags included for search engines
- Content is indexable before JavaScript loads
- Consider adding structured data (Schema.org) for listings

## Maintenance

### Adding New Filters
1. Create filter component in `components/src/`
2. Add to `SearchFilters` component
3. Update `FilterState` type in `types.ts`
4. Update URL parameter handling in `search-islands.js`
5. Rebuild component bundle

### Updating Styles
1. Edit component `.styles.ts` files
2. Or edit `css/search.css` for page-level styles
3. Rebuild component bundle
4. Clear browser cache

## References

- [Islands Architecture](../../README.md#islands-architecture)
- [Component Library](../../components/README.md)
- [Original Search Page](https://app.split.lease/search)
- [Feature Spec](../../../specs/feature-9da5bac9-search-page-filters.md)
