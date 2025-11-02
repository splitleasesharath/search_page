# Feature: Build Skeletal Search Page with Filters

## Metadata
adw_id: `9da5bac9`
prompt: `Build out a skeletal search page with filters following ESM + React Islands architecture. Focus on rebuilding the filter section from the original Bubble-based search page at https://app.split.lease/search. Include Search Schedule Selector component from external repository and create skeletal structures for Supabase database and Google Maps integration.`

## Feature Description
Create a modern, code-based search page for Split Lease marketplace that replicates the filter functionality from the original Bubble implementation. The page will use Islands Architecture - static HTML enhanced with interactive React component islands. The focus is on the filter section (left sidebar), which includes borough selection, price tier, week pattern, sort options, and an integrated Search Schedule Selector component. The page will also include placeholder structures for Google Maps integration and Supabase database connectivity.

This is a skeletal/foundational implementation prioritizing UI structure and filter components without full backend logic implementation at this stage.

## User Story
As a guest looking for repeat rentals
I want to search and filter listings by location, price, schedule, and amenities
So that I can find properties that match my specific weekly rental needs

## Problem Statement
The current Split Lease search page is built on Bubble (no-code platform), which limits customization, performance optimization, and integration with modern development workflows. The search functionality needs to be rebuilt in code using a modern architecture that:
- Provides better performance with Islands Architecture
- Enables full developer control over filter logic and UI
- Supports integration with Supabase database and Google Maps
- Maintains the existing filter UX that users are familiar with
- Uses React components for interactive elements while keeping the page lightweight

## Solution Statement
Build a new search page using Islands Architecture where:
1. Static HTML provides the page structure and SEO-friendly content
2. React component islands handle interactive filter widgets
3. The Search Schedule Selector from the external repository is adapted to the Islands pattern
4. Filter components mirror the original Bubble implementation (borough, price tier, week pattern, sort, neighborhoods)
5. Placeholder structures are created for future Supabase and Google Maps integration
6. Components are built as UMD bundles and mounted at specific DOM locations
7. The page follows the existing Split Lease component patterns and styling

## Relevant Files

### Existing Files to Reference
- `app/split-lease/components/src/SearchScheduleSelector/` - Existing schedule selector component to be integrated
- `app/split-lease/components/src/index.ts` - Component export registry (line 1-10)
- `app/split-lease/components/vite.config.ts` - Build configuration for UMD bundles
- `app/split-lease/components/package.json` - Component library dependencies
- `app/split-lease/pages/home/README.md` - Home page structure reference
- `README.md` - Project overview and Islands Architecture documentation

### Context Files
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md` - Data type definitions
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md` - Filter option configurations
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\New\SEARCH_FILTER_ANALYSIS_REPORT.md` - Detailed workflow analysis of original search filters
- `C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png` - Visual reference of filter section

### New Files

#### Page Files
- `app/split-lease/pages/search/index.html` - Main search page with Islands
- `app/split-lease/pages/search/css/search.css` - Search page styles
- `app/split-lease/pages/search/js/search-islands.js` - Island mounting logic

#### Component Files
- `app/split-lease/components/src/SearchFilters/SearchFilters.tsx` - Main filter container component
- `app/split-lease/components/src/SearchFilters/SearchFilters.styles.ts` - Filter styles
- `app/split-lease/components/src/SearchFilters/types.ts` - Filter type definitions
- `app/split-lease/components/src/SearchFilters/index.ts` - Filter exports

- `app/split-lease/components/src/BoroughFilter/BoroughFilter.tsx` - Borough dropdown component
- `app/split-lease/components/src/BoroughFilter/BoroughFilter.styles.ts` - Borough filter styles
- `app/split-lease/components/src/BoroughFilter/types.ts` - Borough types
- `app/split-lease/components/src/BoroughFilter/index.ts` - Borough exports

- `app/split-lease/components/src/PriceTierFilter/PriceTierFilter.tsx` - Price tier dropdown
- `app/split-lease/components/src/PriceTierFilter/PriceTierFilter.styles.ts` - Price styles
- `app/split-lease/components/src/PriceTierFilter/types.ts` - Price types
- `app/split-lease/components/src/PriceTierFilter/index.ts` - Price exports

- `app/split-lease/components/src/WeekPatternFilter/WeekPatternFilter.tsx` - Week pattern selector
- `app/split-lease/components/src/WeekPatternFilter/WeekPatternFilter.styles.ts` - Week pattern styles
- `app/split-lease/components/src/WeekPatternFilter/types.ts` - Week pattern types
- `app/split-lease/components/src/WeekPatternFilter/index.ts` - Week pattern exports

- `app/split-lease/components/src/SortFilter/SortFilter.tsx` - Sort by dropdown
- `app/split-lease/components/src/SortFilter/SortFilter.styles.ts` - Sort styles
- `app/split-lease/components/src/SortFilter/types.ts` - Sort types
- `app/split-lease/components/src/SortFilter/index.ts` - Sort exports

- `app/split-lease/components/src/MapPlaceholder/MapPlaceholder.tsx` - Google Maps placeholder
- `app/split-lease/components/src/MapPlaceholder/MapPlaceholder.styles.ts` - Map styles
- `app/split-lease/components/src/MapPlaceholder/types.ts` - Map types
- `app/split-lease/components/src/MapPlaceholder/index.ts` - Map exports

- `app/split-lease/components/src/ListingsGrid/ListingsGrid.tsx` - Listings display grid
- `app/split-lease/components/src/ListingsGrid/ListingsGrid.styles.ts` - Grid styles
- `app/split-lease/components/src/ListingsGrid/types.ts` - Grid types
- `app/split-lease/components/src/ListingsGrid/index.ts` - Grid exports

## Implementation Plan

### Phase 1: Foundation
Set up the search page directory structure, create the base HTML page, and establish the component library structure. This includes creating the search page directory, setting up CSS and JavaScript files, and preparing the component source directories.

### Phase 2: Core Implementation
Build the individual filter components (Borough, Price Tier, Week Pattern, Sort) as React islands. Integrate the existing Search Schedule Selector component. Create placeholder components for Google Maps and listings grid. Implement the filter container that orchestrates all filters.

### Phase 3: Integration
Mount all React islands in the HTML page, build the component UMD bundle, connect filters to URL parameters, and create the skeletal Supabase and Google Maps integration points. Validate the page against the original design through visual comparison.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Set Up Search Page Directory Structure
- Create `app/split-lease/pages/search/` directory
- Create `app/split-lease/pages/search/css/` subdirectory
- Create `app/split-lease/pages/search/js/` subdirectory
- Create `app/split-lease/pages/search/images/` subdirectory (if needed for assets)

### 2. Clone and Review Search Schedule Selector Repository
- Clone the external repository: `git clone https://github.com/splitleasesharath/search-schedule-selector.git` to a temporary location
- Review the component structure and identify files to adapt
- Document any dependencies that need to be added to the component library

### 3. Create Base Search Page HTML
- Create `app/split-lease/pages/search/index.html`
- Set up HTML structure with:
  - Meta tags and CDN references (React 18 CDN)
  - Header/navigation section
  - Two-column layout: filter sidebar (left) and results/map area (right)
  - Filter section container with ID mounts for React islands
  - Map placeholder container
  - Listings grid placeholder container
  - Footer section
  - Script tags for component UMD bundle and island mounting

### 4. Create Search Page CSS
- Create `app/split-lease/pages/search/css/search.css`
- Define layout styles:
  - Two-column grid layout (sidebar + main content)
  - Responsive breakpoints matching the original design
  - Filter sidebar styles
  - Container styles for map and listings
- Import and reference shared styles from `pages/shared/` if available

### 5. Create Filter Type Definitions
- Create `app/split-lease/components/src/SearchFilters/types.ts`
- Define TypeScript interfaces based on context files:
  - `BoroughOption` - Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, Essex County NJ, Hudson County NJ
  - `PriceTierOption` - < $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices
  - `WeekPatternOption` - Every week, One week on/one week off, Two weeks on/two weeks off, One week on/three weeks off
  - `SortOption` - Our Recommendations, Price-Lowest to Highest, Most viewed, Recently Added
  - `FilterState` - Combined state interface for all filters
  - `FilterChangeHandler` - Callback type for filter changes

### 6. Build Borough Filter Component
- Create `app/split-lease/components/src/BoroughFilter/BoroughFilter.tsx`
- Implement dropdown with borough options from Option Sets context
- Create `app/split-lease/components/src/BoroughFilter/BoroughFilter.styles.ts` with styled-components
- Create `app/split-lease/components/src/BoroughFilter/types.ts` with props interface
- Create `app/split-lease/components/src/BoroughFilter/index.ts` for exports
- Add onChange handler that updates URL parameters (skeletal - just logs for now)
- Style to match original design from screenshot

### 7. Build Price Tier Filter Component
- Create `app/split-lease/components/src/PriceTierFilter/PriceTierFilter.tsx`
- Implement dropdown with price tier options from Option Sets context
- Create `app/split-lease/components/src/PriceTierFilter/PriceTierFilter.styles.ts`
- Create `app/split-lease/components/src/PriceTierFilter/types.ts`
- Create `app/split-lease/components/src/PriceTierFilter/index.ts`
- Add onChange handler for price tier changes
- Include price range metadata (min/max values from context)

### 8. Build Week Pattern Filter Component
- Create `app/split-lease/components/src/WeekPatternFilter/WeekPatternFilter.tsx`
- Implement dropdown with weekly selection options from Option Sets context
- Create `app/split-lease/components/src/WeekPatternFilter/WeekPatternFilter.styles.ts`
- Create `app/split-lease/components/src/WeekPatternFilter/types.ts`
- Create `app/split-lease/components/src/WeekPatternFilter/index.ts`
- Add onChange handler for week pattern changes
- Include period and week count metadata from context

### 9. Build Sort Filter Component
- Create `app/split-lease/components/src/SortFilter/SortFilter.tsx`
- Implement dropdown with sort options from Option Sets context
- Create `app/split-lease/components/src/SortFilter/SortFilter.styles.ts`
- Create `app/split-lease/components/src/SortFilter/types.ts`
- Create `app/split-lease/components/src/SortFilter/index.ts`
- Add onChange handler for sort changes
- Include field name and sort direction metadata

### 10. Adapt Search Schedule Selector Component
- Copy the Search Schedule Selector component from the cloned repository
- Integrate it into `app/split-lease/components/src/SearchScheduleSelector/` (may already exist)
- Modify to work with Islands Architecture (ensure it can be mounted via createRoot)
- Update imports to use the project's dependencies
- Ensure it exports correctly for UMD bundle
- Verify it matches the green rectangle design from the screenshot

### 11. Build Search Filters Container Component
- Create `app/split-lease/components/src/SearchFilters/SearchFilters.tsx`
- Compose all individual filter components (Borough, Price, Week Pattern, Sort)
- Add the Search Schedule Selector component
- Implement state management for all filters (use React.useState)
- Create layout matching the original filter sidebar design
- Add filter change handlers that log to console (skeletal implementation)
- Create `app/split-lease/components/src/SearchFilters/SearchFilters.styles.ts`
- Create `app/split-lease/components/src/SearchFilters/index.ts`

### 12. Create Map Placeholder Component
- Create `app/split-lease/components/src/MapPlaceholder/MapPlaceholder.tsx`
- Display a styled div with "Google Maps Integration - Coming Soon" message
- Add container styling to match the map area from screenshot
- Create `app/split-lease/components/src/MapPlaceholder/MapPlaceholder.styles.ts`
- Create `app/split-lease/components/src/MapPlaceholder/types.ts`
- Create `app/split-lease/components/src/MapPlaceholder/index.ts`
- Add props for future map configuration (center, zoom, markers)

### 13. Create Listings Grid Placeholder Component
- Create `app/split-lease/components/src/ListingsGrid/ListingsGrid.tsx`
- Display a grid layout with placeholder listing cards
- Use mock data to show 3-4 example listings
- Create `app/split-lease/components/src/ListingsGrid/ListingsGrid.styles.ts` with grid layout
- Create `app/split-lease/components/src/ListingsGrid/types.ts` with Listing interface
- Create `app/split-lease/components/src/ListingsGrid/index.ts`
- Add props for listings array and loading states

### 14. Update Component Library Exports
- Update `app/split-lease/components/src/index.ts` to export all new components:
  - SearchFilters
  - BoroughFilter
  - PriceTierFilter
  - WeekPatternFilter
  - SortFilter
  - MapPlaceholder
  - ListingsGrid
  - SearchScheduleSelector (if not already exported)

### 15. Build Component UMD Bundle
- Navigate to `app/split-lease/components/`
- Run `npm install` to ensure dependencies are current
- Run `npm run build` to generate UMD bundle
- Verify `dist/split-lease-components.umd.cjs` and `dist/style.css` are created
- Check that all new components are accessible in the bundle

### 16. Create Island Mounting Script
- Create `app/split-lease/pages/search/js/search-islands.js`
- Implement mounting logic for each React island:
  - SearchFilters island
  - MapPlaceholder island
  - ListingsGrid island
- Use `ReactDOM.createRoot()` for each mount point
- Add error handling for missing components
- Add URL parameter reading logic (skeletal)

### 17. Integrate Islands in Search Page HTML
- Update `app/split-lease/pages/search/index.html`
- Add div containers with IDs for each island:
  - `<div id="search-filters"></div>`
  - `<div id="map-container"></div>`
  - `<div id="listings-grid"></div>`
- Include the component UMD bundle script tag
- Include the search-islands.js script
- Add component CSS link tag

### 18. Create Supabase Integration Skeleton
- Create `app/split-lease/pages/search/js/supabase-client.js`
- Add comments documenting the planned Supabase schema:
  - Listings table
  - Users table
  - Saved searches table
  - Data types from context files
- Export placeholder functions:
  - `searchListings(filters)` - returns empty array with TODO comment
  - `saveSearch(userId, filters)` - logs to console with TODO comment
  - `getListingsByBorough(borough)` - placeholder
- Document the data types from the context files in comments

### 19. Create Google Maps Integration Skeleton
- Create `app/split-lease/pages/search/js/maps-client.js`
- Add placeholder Google Maps initialization:
  - `initMap(containerId, options)` - logs "Maps to be initialized"
  - `addMarkers(map, listings)` - placeholder function
  - `centerMapOnBorough(map, borough)` - placeholder with borough coordinates
- Document required Google Maps API key setup
- Add comments for future implementation steps

### 20. Implement URL Parameter Management
- Update `app/split-lease/pages/search/js/search-islands.js`
- Add `getFilterParamsFromURL()` function to parse URL parameters:
  - `borough`
  - `pricetier`
  - `weekly-frequency`
  - `sort`
- Add `updateURLParams(filters)` function to update URL without reload
- Use URLSearchParams API
- Pass initial filter values from URL to SearchFilters component on mount

### 21. Style Components to Match Original Design
- Review screenshot `Screenshot 2025-11-02 154712.png`
- Update component styles to match:
  - Filter sidebar width and spacing
  - Dropdown component styling
  - Color scheme and typography
  - Schedule selector styling (green rectangle)
  - Map and listings grid layout
- Ensure responsive design works on mobile

### 22. Test Search Page Locally
- Open `app/split-lease/pages/search/index.html` in browser
- Verify all filter islands render correctly
- Test each filter dropdown interaction
- Verify Search Schedule Selector renders and is interactive
- Check that map and listings placeholders display
- Test URL parameter updates on filter changes
- Verify no console errors (except expected TODOs)

### 23. Compare with Original Search Page Using Playwright
- Use Playwright MCP to navigate to `https://app.split.lease/search`
- Take screenshots of the original filter section
- Compare with new search page screenshots
- Document any visual differences
- Create a comparison report
- Make style adjustments based on comparison

### 24. Second Comparison Pass
- After making adjustments from step 23, do another Playwright comparison
- Navigate to both original and new search pages
- Take side-by-side screenshots
- Verify filter section matches the orange rectangle area from original screenshot
- Ensure Search Schedule Selector matches the green rectangle area
- Document final differences and create acceptance checklist

### 25. Create Search Page Documentation
- Create `app/split-lease/pages/search/README.md`
- Document:
  - Page structure and components
  - Filter options and their data sources
  - Islands mounting process
  - Placeholder integrations (Supabase, Google Maps)
  - Future implementation TODOs
  - Testing instructions
  - Visual comparison results

### 26. Run Component Type Checking
- Navigate to `app/split-lease/components/`
- Run `npm run typecheck` to verify TypeScript types
- Fix any type errors
- Ensure all components have proper prop types

### 27. Update Project README
- Update `README.md` to document the search page
- Add search page to the Pages Overview section
- Document new components in the component list
- Add notes about Supabase and Google Maps placeholders

### 28. Final Validation
- Rebuild component bundle: `cd app/split-lease/components && npm run build`
- Open search page in multiple browsers (Chrome, Firefox, Safari if available)
- Test responsive design at different viewport sizes
- Verify all islands mount successfully
- Test filter interactions
- Verify URL parameters update correctly
- Check console for errors

## Testing Strategy

### Unit Tests
- **BoroughFilter Component:**
  - Renders all borough options correctly
  - Calls onChange handler with correct value
  - Displays selected borough

- **PriceTierFilter Component:**
  - Renders all price tier options with price ranges
  - Handles selection changes
  - Displays selected tier

- **WeekPatternFilter Component:**
  - Renders all week pattern options
  - Updates selection correctly
  - Passes period metadata

- **SortFilter Component:**
  - Renders all sort options
  - Handles sort changes
  - Includes field name and direction

- **SearchFilters Container:**
  - Composes all child filters correctly
  - Manages filter state
  - Integrates Search Schedule Selector
  - Logs filter changes to console

- **MapPlaceholder Component:**
  - Renders placeholder message
  - Accepts configuration props

- **ListingsGrid Component:**
  - Renders placeholder listings
  - Displays grid layout correctly

### Integration Tests
- **Island Mounting:**
  - All islands mount at correct DOM locations
  - Components receive props from mounting script
  - No React hydration errors

- **URL Parameter Integration:**
  - URL parameters are read on page load
  - Filters initialize with URL values
  - Filter changes update URL
  - Browser back/forward works correctly

### Visual Comparison Tests
- **Playwright Comparisons:**
  - Original search page screenshots captured
  - New search page screenshots captured
  - Filter section layout matches
  - Search Schedule Selector matches green rectangle
  - Overall page structure matches orange rectangle area

### Edge Cases
- No URL parameters (filters use defaults)
- Invalid URL parameter values (filters use defaults)
- Components fail to load (graceful error handling)
- Missing React CDN (fallback error message)
- Browser without ES2020 support (compatibility message)
- Viewport sizes from 320px to 2560px width
- Filter combinations that yield no results (placeholder message)

## Acceptance Criteria

1. **Search page exists at `app/split-lease/pages/search/index.html`** and loads without errors
2. **Filter sidebar renders** with all filter components visible
3. **Borough filter displays** all 7 borough options (Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, Essex County NJ, Hudson County NJ)
4. **Price tier filter displays** all 5 price options with correct price ranges
5. **Week pattern filter displays** all 4 weekly schedule options
6. **Sort filter displays** all 4 sort options
7. **Search Schedule Selector** renders and matches the green rectangle design from screenshot
8. **Map placeholder** displays in correct location with "Coming Soon" message
9. **Listings grid placeholder** displays with mock listing cards
10. **All filters trigger onChange handlers** that log to console
11. **URL parameters update** when filters change
12. **Initial filter state loads** from URL parameters
13. **Component UMD bundle builds** successfully without errors
14. **TypeScript type checking passes** with no errors
15. **Page is responsive** and works on mobile, tablet, and desktop viewports
16. **Visual comparison with original** shows matching filter layout (orange rectangle area)
17. **Search Schedule Selector visual match** with green rectangle from original
18. **Supabase skeleton file exists** with documented data types and placeholder functions
19. **Google Maps skeleton file exists** with documented integration points
20. **All components follow Islands Architecture** pattern (can be server-rendered and client-mounted)
21. **No React errors in console** during normal operation
22. **Documentation exists** for search page in README.md

## Validation Commands

Execute these commands to validate the feature is complete:

- `cd app/split-lease/components && npm install` - Install component dependencies
- `cd app/split-lease/components && npm run typecheck` - Verify TypeScript types are correct (should pass with no errors)
- `cd app/split-lease/components && npm run build` - Build UMD bundle (should complete without errors)
- `ls -la app/split-lease/components/dist/split-lease-components.umd.cjs` - Verify bundle exists
- `ls -la app/split-lease/components/dist/style.css` - Verify styles exist
- `ls -la app/split-lease/pages/search/index.html` - Verify search page exists
- `ls -la app/split-lease/pages/search/css/search.css` - Verify search CSS exists
- `ls -la app/split-lease/pages/search/js/search-islands.js` - Verify island mounting script exists
- `ls -la app/split-lease/pages/search/js/supabase-client.js` - Verify Supabase skeleton exists
- `ls -la app/split-lease/pages/search/js/maps-client.js` - Verify Maps skeleton exists
- `find app/split-lease/components/src -name "*Filter*" -type f` - List all filter components created
- `grep -r "export.*SearchFilters" app/split-lease/components/src/index.ts` - Verify SearchFilters is exported
- `grep -r "export.*MapPlaceholder" app/split-lease/components/src/index.ts` - Verify MapPlaceholder is exported
- `grep -r "export.*ListingsGrid" app/split-lease/components/src/index.ts` - Verify ListingsGrid is exported

### Manual Validation (Open in Browser)
- Open `app/split-lease/pages/search/index.html` in browser
- Verify all filter sections render without console errors
- Test each filter dropdown (borough, price, week pattern, sort)
- Verify Search Schedule Selector renders and day selection works
- Verify URL updates when filters change (check address bar)
- Reload page with URL parameters and verify filters initialize correctly
- Test on mobile viewport (320px width)
- Test on tablet viewport (768px width)
- Test on desktop viewport (1440px+ width)

### Playwright Visual Comparison (if MCP available)
- Navigate to `https://app.split.lease/search` and capture screenshot
- Navigate to local `app/split-lease/pages/search/index.html` and capture screenshot
- Compare filter section layouts side-by-side
- Document any visual differences in `app/split-lease/pages/search/README.md`

## Notes

### Dependencies
All required dependencies should already be in the component library:
- React 18 (loaded via CDN in HTML)
- ReactDOM 18 (loaded via CDN in HTML)
- styled-components (existing)
- framer-motion (existing, used by SearchScheduleSelector)
- TypeScript (dev dependency)
- Vite (dev dependency for building)

If the Search Schedule Selector requires additional dependencies from the external repository, add them using:
```bash
cd app/split-lease/components
npm install <package-name>
```

### Supabase Integration Notes
The Supabase integration is skeletal for this phase. Future implementation will include:
- Connection to Supabase project with environment variables
- Real-time listing queries based on filter state
- Saved search functionality
- User authentication integration
- RLS (Row Level Security) policies

Data types to be implemented (from context files):
- User, Listing, Listing-Photo, Proposal, pricing_list
- ZAT-Geo-Borough-Top Level, ZAT-Geo-Hood-Medium Level, ZAT-Location
- ZAT-Features (Space, Amenity, Listing Type, Parking, Storage, House Rules, Cancellation Policy)
- Saved Search, Notification Settings, Data Collection-Search Logging
- Days, Nights Available

### Google Maps Integration Notes
The Google Maps integration is skeletal for this phase. Future implementation will include:
- Google Maps JavaScript API key setup
- Dynamic marker placement based on listing locations
- Map centering based on borough selection
- Marker clustering for dense areas
- Custom map styling to match brand
- Info windows for listing previews on marker click

### Search Schedule Selector Repository
Repository: https://github.com/splitleasesharath/search-schedule-selector.git

This component needs to be adapted to:
- Work with the UMD bundle build system
- Use the project's existing dependencies
- Match the styling from the green rectangle in the screenshot
- Integrate with the SearchFilters component state

### Visual Reference
The screenshot at `C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png` shows:
- **Orange rectangle**: The entire filter section to be replicated
- **Green rectangle**: The Search Schedule Selector component specifically

### Future Enhancements (Out of Scope for This Phase)
- Full Supabase integration with real listings data
- Google Maps API integration with actual listing markers
- Filter logic implementation (currently just logs to console)
- Search results rendering from database queries
- User authentication and saved searches
- Neighborhood refinement filter (shown in original but not prioritized)
- Amenity filters and advanced filters
- Mobile filter drawer/modal for better mobile UX
- Loading states and error handling
- Accessibility improvements (ARIA labels, keyboard navigation)
- Analytics tracking for filter usage

### Code Style and Patterns
Follow existing patterns from the codebase:
- Use styled-components for all component styling
- Use TypeScript with strict typing
- Export components with named exports
- Create separate files for styles, types, and components
- Use React hooks (useState, useEffect, useCallback)
- Follow the Islands Architecture pattern
- Keep components small and focused
- Document complex logic with comments

### Testing Notes
Component tests should be created after initial implementation is validated. Test files should follow the pattern:
- `ComponentName.test.tsx` for unit tests
- Use Vitest (already configured in the project)
- Test component rendering, props, and user interactions
- Mock external dependencies (Supabase, Google Maps)
