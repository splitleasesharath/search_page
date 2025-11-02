# Search Page

A skeletal implementation of the Split Lease search page following the Islands Architecture pattern with React component islands mounted on static HTML.

## Overview

The search page provides an interface for users to search and filter rental listings. This implementation focuses on the filter section UI with fully functional components, while results display and map integration are left as placeholders for future Supabase and Google Maps implementation.

## Architecture

### Islands Architecture Pattern

The page follows the Islands Architecture pattern:
- **Static HTML Shell**: `index.html` provides the base page structure
- **Interactive Islands**: React components mounted as islands for interactivity
- **Lazy Hydration**: Components hydrate only when needed, improving performance

### Page Structure

```
┌─────────────────────────────────────────────────┐
│                  Header                          │
├───────────┬─────────────────────┬────────────────┤
│           │                     │                │
│  Filters  │    Search Results   │      Map       │
│  (Left)   │      (Center)       │    (Right)     │
│           │                     │                │
│  Island 1 │     Island 2        │   Island 3     │
└───────────┴─────────────────────┴────────────────┘
│                  Footer                          │
└─────────────────────────────────────────────────┘
```

## Components

### Filter Components (Left Sidebar)

#### SearchFilters (Organism)
**File**: `app/split-lease/components/src/organisms/SearchFilters/`

Container component that composes all filter components and manages their state.

**State Management**:
- `selectedDays`: Array of selected day indices (0-6)
- `borough`: Selected borough/county
- `weekPattern`: Recurring week pattern selection
- `priceTier`: Price range selection with min/max values
- `sortBy`: Sort order with field name and direction
- `neighborhoods`: Array of selected neighborhood names
- `listingsCount`: Number of listings found (currently 0 - placeholder)

#### SearchScheduleSelector
**File**: `app/split-lease/components/src/SearchScheduleSelector/`

Interactive day-of-week picker with click and drag selection.

**Features**:
- Click individual days to toggle selection
- Drag across days to select range
- Validation for 2-5 contiguous days (configurable)
- Check-in/Check-out display
- Error messages for invalid selections
- Animated interactions

**Props**:
- `selectedDays`: number[] - Currently selected day indices
- `onChange`: (days: number[]) => void - Selection change callback
- `minDays`: number - Minimum required days (default: 2)
- `maxDays`: number - Maximum allowed days (default: 5)
- `requireContiguous`: boolean - Require consecutive days (default: true)

#### BoroughSelector
**File**: `app/split-lease/components/src/molecules/BoroughSelector/`

Dropdown for selecting NYC boroughs or NJ counties.

**Options**:
- Bergen County NJ
- Bronx
- Brooklyn
- Essex County NJ
- Hudson County NJ
- Manhattan (default)
- Queens

#### WeekPatternSelector
**File**: `app/split-lease/components/src/molecules/WeekPatternSelector/`

Dropdown for selecting recurring schedule patterns.

**Options**:
- Every week (default)
- One week on/one week off
- Two weeks on/two weeks off
- One week on/three weeks off

#### PriceTierSelector
**File**: `app/split-lease/components/src/molecules/PriceTierSelector/`

Dropdown for selecting price ranges.

**Options**:
- < $200/night
- $200-$350/night (default)
- $350-$500/night
- $500+/night
- All Prices

Each option includes min/max price values for future database queries.

#### SortBySelector
**File**: `app/split-lease/components/src/molecules/SortBySelector/`

Dropdown for selecting result sort order.

**Options**:
- Our Recommendations (default) - sorts by recommendation_score DESC
- Price-Lowest to Highest - sorts by price ASC
- Most Viewed - sorts by view_count DESC
- Recently Added - sorts by created_at DESC

Each option includes field name and sort direction for database queries.

#### NeighborhoodSearch
**File**: `app/split-lease/components/src/molecules/NeighborhoodSearch/`

Search input and multi-select for neighborhood refinement.

**Current State**: Placeholder component with search input only
**Future**: Will load neighborhood options from Supabase based on selected borough

### Placeholder Components

#### SearchResults (Center)
**File**: `app/split-lease/components/src/organisms/SearchResults/`

Placeholder grid showing where listing cards will appear.

**Future Integration**: Will display listing cards fetched from Supabase based on filter selections.

#### SearchMap (Right)
**File**: `app/split-lease/components/src/organisms/SearchMap/`

Placeholder showing where Google Maps will be integrated.

**Future Integration**: Will display interactive map with listing markers, clustering, and click-to-view functionality.

## Island Hydration

### Mount Script
**File**: `app/split-lease/pages/search/js/mount-filters.js`

The mounting script hydrates all three islands:

1. **SearchFilters** - Mounts in `#search-filters`
2. **SearchResults** - Mounts in `#search-results`
3. **SearchMap** - Mounts in `#search-map`

**Process**:
1. Wait for DOM ready
2. Check for React/ReactDOM from CDN
3. Check for SplitLeaseComponents library
4. Create React roots for each mount point
5. Render components with initial props
6. Log success/errors to console

## Styling

### Page Layout CSS
**File**: `app/split-lease/pages/search/css/search.css`

- CSS Grid layout with 3 columns (filters, results, map)
- Responsive breakpoints:
  - Desktop (1280px+): 3-column layout
  - Tablet (768px-1279px): 2-column layout, map stacked below
  - Mobile (<768px): Single column, all stacked
- Sticky positioning for filters sidebar and map
- Consistent color palette matching homepage

### Component Styles
**Files**: `*.styles.ts` in each component directory

- Styled-components for component styling
- Encapsulated styles (no global conflicts)
- Theme-consistent colors and typography
- Interactive states (hover, focus, active)
- Responsive sizing

## Build Process

### Building Components

```bash
cd app/split-lease/components
npm install
npm run build
```

**Output**:
- `dist/split-lease-components.umd.js` - UMD bundle for browser
- `dist/split-lease-components.es.js` - ES module bundle
- `dist/assets/style.css` - Component styles
- `dist/index.d.ts` - TypeScript declarations

### Bundle Size
- UMD Bundle: ~110 KB (30.5 KB gzipped)
- Component Styles: ~13.8 KB (3.2 KB gzipped)

## Testing the Page

### Local Testing

1. Build the component library:
   ```bash
   cd app/split-lease/components
   npm run build
   ```

2. Open the page in a browser:
   ```bash
   # Use a local server (required for ES modules)
   npx serve app/split-lease/pages/search
   # Or
   python -m http.server 8000
   ```

3. Navigate to `http://localhost:8000/index.html`

### Expected Behavior

**Filters Section**:
- All filter components render correctly
- Day selector allows click and drag selection
- Dropdowns open and close properly
- Error messages appear for invalid day selections
- Selections update component state
- Console logs filter changes

**Results Section**:
- Placeholder cards display
- "Supabase integration pending" message shown

**Map Section**:
- Placeholder with "Map coming soon" message shown

**Console**:
- No errors
- Logs showing successful island mounting
- Logs showing filter changes when selections made

### Manual Test Checklist

- [ ] SearchScheduleSelector renders with all 7 days
- [ ] Click individual days to select/deselect
- [ ] Drag across multiple days to select range
- [ ] Check-in/Check-out display updates correctly
- [ ] Validation error shows when selecting <2 or >5 days
- [ ] BoroughSelector dropdown opens with 7 options
- [ ] WeekPatternSelector dropdown opens with 4 options
- [ ] PriceTierSelector dropdown opens with 5 options
- [ ] SortBySelector dropdown opens with 4 options
- [ ] NeighborhoodSearch input accepts text
- [ ] "0 Listings Found" counter displays
- [ ] All dropdowns respond to keyboard navigation
- [ ] Layout responds correctly at 375px, 768px, 1920px widths

## Future Integration Points

### Supabase Database Integration

**Planned Features**:
- Connect filter selections to database queries
- Fetch real listing data based on filters
- Implement search result pagination
- Add user preference persistence
- Store search history/saved searches

**Required Work**:
- Create Supabase client configuration
- Build listing query functions
- Implement real-time updates
- Add caching strategy
- Build listing detail views

### Google Maps Integration

**Planned Features**:
- Display interactive map with listing markers
- Implement marker clustering for dense areas
- Add map controls (zoom, pan, street view)
- Sync map view with filter selections
- Click markers to view listing details
- Draw search radius/boundary tools

**Required Work**:
- Add Google Maps API key
- Initialize map instance
- Create marker management system
- Build info window components
- Implement clustering algorithm
- Add geolocation features

### Additional Enhancements

**URL Parameters**:
- Synchronize filter state with URL
- Enable shareable search links
- Support deep linking to specific searches

**Advanced Filters**:
- Amenities (WiFi, Kitchen, Parking, etc.)
- House rules (Pets, Smoking, Guests)
- Storage availability
- Parking options

**User Features**:
- Save search functionality
- Weekly alert signup
- Filter presets ("Weekend Getaway", "Weeknight Work")
- Listing comparison tool

**Performance**:
- Debounce filter changes to reduce API calls
- Implement virtual scrolling for large result sets
- Lazy load images for listing cards
- Add service worker for offline support

## Dependencies

### Runtime Dependencies
- React 18 (from CDN)
- ReactDOM 18 (from CDN)
- styled-components 6.1.13
- framer-motion 11.11.17 (for animations - currently not used but available)

### Development Dependencies
- TypeScript 5.7.2
- Vite 5.4.11
- @vitejs/plugin-react 4.3.4

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Known Limitations

1. **No Backend Integration**: Filter selections don't trigger real searches yet
2. **Static Listings Count**: Always shows "0 Listings Found"
3. **No Neighborhood Data**: NeighborhoodSearch doesn't populate options
4. **No URL Sync**: Filter state not synchronized with URL parameters
5. **No Persistence**: Filter selections reset on page reload
6. **Placeholder Components**: Results and Map sections are non-functional

## Performance Metrics

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Component Hydration: < 100ms
- Filter Interaction Response: < 16ms (60fps)

**Current Bundle Size**:
- Total JavaScript: ~110 KB (gzipped: 30.5 KB)
- Total CSS: ~13.8 KB (gzipped: 3.2 KB)
- Above performance budget targets ✓

## Troubleshooting

### Components Don't Render

**Check**:
1. Browser console for errors
2. React/ReactDOM loaded from CDN
3. Component bundle loaded correctly
4. Mount points exist in HTML with correct IDs

### Styles Look Wrong

**Check**:
1. `dist/assets/style.css` is loaded
2. Build process completed successfully
3. No conflicting CSS from other sources
4. Browser cache cleared

### TypeScript Errors During Build

**Check**:
1. All type imports are correct
2. Component props match type definitions
3. Run `npm run typecheck` for detailed errors
4. Check for missing type exports in index files

### Day Selector Drag Not Working

**Check**:
1. Mouse events are properly attached
2. No CSS preventing pointer events
3. Browser console for errors in event handlers
4. User is dragging (not just clicking rapidly)

## Related Documentation

- [Islands Architecture Pattern](../home/README.md)
- [Component Library Structure](../../components/README.md)
- [Search Filter Analysis Report](../../../../!Agent%20Context%20and%20Tools/SL1/TAC/Context/Search/New/SEARCH_FILTER_ANALYSIS_REPORT.md)
- [Data Type Definitions](../../../../!Agent%20Context%20and%20Tools/SL1/TAC/Context/Search/Search%20Page%20Data%20Types.md)
- [Filter Option Sets](../../../../!Agent%20Context%20and%20Tools/SL1/TAC/Context/Search/Search%20Page%20Option%20Sets.md)

## Contributing

When modifying search page components:

1. Follow atomic design principles (atoms → molecules → organisms)
2. Use TypeScript for all components
3. Include prop types and JSDoc comments
4. Add styles using styled-components
5. Export components from component index
6. Rebuild component library after changes
7. Test in multiple browsers and viewports
8. Update this README with any new features or changes
