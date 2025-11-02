# Feature: Build Search Page with Filters

## Metadata
adw_id: `9`
prompt: `Build out a skeletal search page with ESM + React Islands architecture, focusing on search filters and integration of the Search Schedule Selector component from the external repository.`

## Feature Description
This feature implements a comprehensive search page for Split Lease, a rental marketplace platform that enables guests to find repeat rentals based on specific weekly schedules. The page follows an Islands Architecture pattern combining static HTML with interactive React component islands. The implementation focuses on rebuilding the existing Bubble.io search page (https://app.split.lease/search) in code, with particular emphasis on the search filter section.

The search page enables users to:
- Search for rental listings by borough/neighborhood in the Greater New York area
- Filter by price ranges (< $200/night up to $500+/night)
- Select weekly patterns (Every week, 1 week on/off, 2 weeks on/off, etc.)
- Choose check-in/check-out days using an interactive schedule selector
- Sort results by recommendations, price, views, or recency
- View results on both a listing grid and interactive map
- Refine searches by specific neighborhoods

## User Story
As a guest looking for repeat rentals
I want to search and filter rental listings by location, price, and weekly schedule
So that I can find properties that match my specific rental needs and preferred stay patterns

## Problem Statement
Split Lease currently has a search page built on Bubble.io (no-code platform), which limits customization, performance, and code ownership. The platform needs a rebuilt search experience in code that:
1. Matches or exceeds the current Bubble implementation's functionality
2. Provides better performance through Islands Architecture
3. Enables full control over the UI/UX and future enhancements
4. Integrates the existing Search Schedule Selector component
5. Maintains all filter workflows and search logic from the original

The current Bubble page has complex filter workflows with 4-step processes for each filter change (input event → state update → user preference save → page navigation), which must be replicated.

## Solution Statement
Implement a modern search page using ESM + React Islands architecture where:
- The base HTML page loads quickly with static content and SEO optimization
- Interactive React components (filters, schedule selector, map, results grid) are mounted as "islands" at specific DOM nodes
- Components are bundled as UMD modules and exposed via `window.SplitLeaseComponents`
- React is loaded from CDN for zero build complexity on the page side
- All filter logic, state management, and API integration happens client-side
- The Search Schedule Selector is adapted from the external repository and integrated as an island
- Filters update URL parameters and trigger search API calls to Supabase backend
- Results are displayed in both grid and map views with real-time updates

## Relevant Files
Use these files to implement the feature:

### Existing Project Structure
- `README.md` - Project overview and Islands Architecture documentation
- `app/split-lease/components/` - React components library (UMD bundle)
  - `src/index.ts` - Component exports barrel file
  - `vite.config.ts` - Vite configuration for UMD build
  - `package.json` - Component library dependencies
- `app/split-lease/api/` - API client for Supabase backend
  - `client.ts` - Base API client configuration
  - `listings.ts` - Listing search and retrieval methods
  - `index.ts` - API exports
- `app/split-lease/types/` - TypeScript type definitions
  - `models.ts` - Data models (Listing, User, etc.)
  - `api.ts` - API request/response types
- `app/split-lease/islands/` - Island wrapper components
  - `header.tsx` - Example island for header
  - `schedule-selector.tsx` - Example island for schedule selector
  - `popular-listings.tsx` - Example island for listings

### Context Files (External Reference)
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md` - Data type specifications
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md` - Filter option sets (Days, Price Tiers, Sort options, Weekly patterns)
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\New\SEARCH_FILTER_ANALYSIS_REPORT.md` - Detailed filter workflow analysis from Bubble page

### External Repository
- `https://github.com/splitleasesharath/search-schedule-selector.git` - Original Search Schedule Selector component (to be adapted)

### New Files

#### Component Files
- `app/split-lease/components/src/SearchFilters/SearchFilters.tsx` - Main filter panel component
- `app/split-lease/components/src/SearchFilters/SearchFilters.styles.ts` - Styled components for filters
- `app/split-lease/components/src/SearchFilters/types.ts` - Filter types and interfaces
- `app/split-lease/components/src/SearchFilters/index.ts` - Filter exports

- `app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.tsx` - Adapted schedule selector
- `app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.styles.ts` - Schedule selector styles
- `app/split-lease/components/src/SearchScheduleSelector/types.ts` - Schedule selector types
- `app/split-lease/components/src/SearchScheduleSelector/index.ts` - Schedule selector exports

- `app/split-lease/components/src/SearchResults/SearchResults.tsx` - Results grid component
- `app/split-lease/components/src/SearchResults/SearchResults.styles.ts` - Results grid styles
- `app/split-lease/components/src/SearchResults/types.ts` - Results types
- `app/split-lease/components/src/SearchResults/index.ts` - Results exports

- `app/split-lease/components/src/SearchMap/SearchMap.tsx` - Google Maps integration component
- `app/split-lease/components/src/SearchMap/SearchMap.styles.ts` - Map styles
- `app/split-lease/components/src/SearchMap/types.ts` - Map types
- `app/split-lease/components/src/SearchMap/index.ts` - Map exports

#### Page Files
- `app/split-lease/pages/search/index.html` - Main search page (static HTML with island mounts)
- `app/split-lease/pages/search/css/search.css` - Page-specific styles
- `app/split-lease/pages/search/js/search.js` - Page initialization and island mounting

#### Island Wrappers
- `app/split-lease/islands/search-filters.tsx` - Island wrapper for filters
- `app/split-lease/islands/search-schedule-selector.tsx` - Island wrapper for schedule selector
- `app/split-lease/islands/search-results.tsx` - Island wrapper for results grid
- `app/split-lease/islands/search-map.tsx` - Island wrapper for map

#### API Integration
- `app/split-lease/api/search.ts` - Search API methods (filter application, result fetching)

#### Types
- `app/split-lease/types/search.ts` - Search-specific types (filters, results, map data)

## Implementation Plan

### Phase 1: Foundation
Set up the search page infrastructure, adapt the Search Schedule Selector component, and establish the Islands Architecture mounting pattern. This phase ensures all base components and patterns are in place before building specific filter functionality.

### Phase 2: Core Implementation
Build out all search filter components (borough, price, weekly pattern, sort, neighborhood refinement), implement the filter state management and URL parameter handling, and integrate with Supabase API for live search results.

### Phase 3: Integration
Connect all islands together with shared state management, implement the Google Maps integration for location visualization, ensure filter workflows match the original Bubble implementation, and add comprehensive testing across all filter combinations.

## Step by Step Tasks

### 1. Repository and Component Analysis
- Clone the search-schedule-selector repository from https://github.com/splitleasesharath/search-schedule-selector.git
- Analyze the component structure, props, and behavior
- Document the component's dependencies and integration requirements
- Identify necessary modifications to adapt for ESM + React Islands structure

### 2. Adapt Search Schedule Selector Component
- Create `app/split-lease/components/src/SearchScheduleSelector/` directory
- Port the schedule selector component to the project structure
- Modify component to fit Islands Architecture (remove any routing/global state dependencies)
- Create styled-components for styling (convert from original CSS if needed)
- Define TypeScript interfaces in `types.ts` for props and state
- Export component in `index.ts`
- Update `app/split-lease/components/src/index.ts` to export SearchScheduleSelector

### 3. Create Search Filter Components
- Create `app/split-lease/components/src/SearchFilters/` directory
- Implement `SearchFilters.tsx` with:
  - Borough/Location dropdown (Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, etc.)
  - Price tier dropdown (< $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices)
  - Weekly pattern dropdown (Every week, 1 week on/off, 2 weeks on/off, 1 week on/3 off)
  - Sort by dropdown (Our Recommendations, Price-Lowest to Highest, Most Viewed, Recently Added)
  - Neighborhood refinement search input
- Create styled-components matching the original Bubble design
- Define filter types and option sets based on context files
- Implement filter state management and change handlers
- Export all filter components

### 4. Create Search Results Component
- Create `app/split-lease/components/src/SearchResults/` directory
- Implement `SearchResults.tsx` with:
  - Listing grid layout (responsive)
  - ListingCard integration (reuse existing molecule component)
  - Loading states and empty states
  - Result count display
  - Pagination or infinite scroll
- Style components to match original design
- Handle result updates based on filter changes
- Export SearchResults component

### 5. Create Search Map Component
- Create `app/split-lease/components/src/SearchMap/` directory
- Implement `SearchMap.tsx` with:
  - Google Maps integration (using Google Maps JavaScript API)
  - Map markers for listings
  - Map center updates based on borough selection
  - Info windows for listing previews on marker click
  - Map/list view toggle
- Create map-specific types and interfaces
- Handle map state synchronization with filters
- Export SearchMap component

### 6. Build Component Library
- Update `app/split-lease/components/package.json` with any new dependencies
- Run `npm install` in components directory
- Build UMD bundle with `npm run build`
- Verify all components are exported in `window.SplitLeaseComponents`
- Test component imports in browser console

### 7. Create Search API Integration
- Create `app/split-lease/api/search.ts`
- Implement search methods:
  - `searchListings(filters)` - Main search with all filters
  - `getNeighborhoods(borough)` - Get neighborhoods for borough
  - `getBoroughs()` - Get available boroughs
- Integrate with Supabase client
- Build SQL queries matching filter logic from analysis report
- Handle price ranges, location filtering, day availability
- Add error handling and loading states
- Export search API functions

### 8. Define Search Types
- Create `app/split-lease/types/search.ts`
- Define interfaces for:
  - `SearchFilters` - All filter values
  - `FilterOptions` - Available options for each filter
  - `SearchResults` - Search result structure
  - `MapMarker` - Map marker data
  - `Borough`, `PriceTier`, `WeeklyPattern`, `SortOption` - Option set types
- Export all search types
- Update `app/split-lease/types/index.ts` to re-export

### 9. Create Island Wrapper Components
- Create island wrappers for each interactive component:
  - `app/split-lease/islands/search-filters.tsx`
  - `app/split-lease/islands/search-schedule-selector.tsx`
  - `app/split-lease/islands/search-results.tsx`
  - `app/split-lease/islands/search-map.tsx`
- Each wrapper should handle:
  - React 18 createRoot mounting
  - Props from window/data attributes
  - Event handlers for parent communication
  - Cleanup on unmount
- Follow existing island patterns from `header.tsx`

### 10. Create Search Page HTML
- Create `app/split-lease/pages/search/` directory
- Implement `index.html` with:
  - SEO meta tags (title, description, OG tags)
  - Static header and footer structure
  - Filter panel container with mount point (id="search-filters-island")
  - Schedule selector container (id="schedule-selector-island")
  - Results grid container (id="search-results-island")
  - Map container (id="search-map-island")
  - React CDN scripts (react, react-dom)
  - Component bundle script (../../components/dist/split-lease-components.umd.js)
  - Component styles (../../components/dist/style.css)
  - Google Maps API script
  - Page initialization script (./js/search.js)
- Use semantic HTML for accessibility
- Add ARIA labels and roles

### 11. Create Page Styles
- Create `app/split-lease/pages/search/css/search.css`
- Implement layout styles:
  - Two-column layout (filters sidebar + results/map)
  - Responsive breakpoints (mobile, tablet, desktop)
  - Filter panel positioning and scrolling
  - Map/results split view
- Style non-component elements (header, footer, containers)
- Ensure styles don't conflict with component styles

### 12. Create Page Initialization Script
- Create `app/split-lease/pages/search/js/search.js`
- Implement island mounting logic:
  - Mount SearchFilters island
  - Mount SearchScheduleSelector island
  - Mount SearchResults island
  - Mount SearchMap island
- Set up cross-island communication (shared state or event bus)
- Handle URL parameter reading on page load
- Initialize filters from URL parameters
- Trigger initial search based on URL/default filters
- Handle browser back/forward navigation

### 13. Implement Filter Workflows
- In `SearchFilters.tsx`, implement filter change workflows:
  - Borough change: Update map center, save user preference, update URL, trigger search
  - Price tier change: Save user preference, update URL, trigger search, show toast (version-test only)
  - Weekly pattern change: Save user preference, update URL, trigger search, update schedule selector
  - Sort change: Update URL, re-sort results
  - Neighborhood change: Update URL, filter results
- Match 4-step workflow pattern from Bubble analysis
- Implement URL parameter management (add/update query params without page reload)
- Add user preference persistence (localStorage or API)

### 14. Implement Schedule Selector Integration
- Mount SearchScheduleSelector as island
- Connect to Weekly Pattern filter
- Handle day selection changes
- Update check-in/check-out display
- Validate contiguous day requirements
- Trigger search on selection change
- Show match counts (exact and partial matches)

### 15. Implement Search Results Display
- In `SearchResults.tsx`, implement:
  - Listing cards grid using existing ListingCard component
  - Loading skeleton while fetching
  - Empty state with helpful message
  - Result count display
  - Sort order application
- Handle result updates from filter changes
- Implement smooth transitions between result sets
- Add error handling for failed searches

### 16. Implement Google Maps Integration
- In `SearchMap.tsx`, implement:
  - Google Maps initialization with API key
  - Map center updates based on borough filter
  - Listing markers with custom icons
  - Info windows showing listing preview on marker click
  - Map bounds adjustment to fit all markers
  - Marker clustering for better performance
- Synchronize map with results (highlight markers on card hover)
- Handle map/list view toggle

### 17. Connect Islands with Shared State
- Implement state management across islands:
  - Option 1: Custom event bus for cross-island communication
  - Option 2: Shared state object on window
  - Option 3: URL as single source of truth
- Ensure filter changes update all islands
- Keep map, results, and schedule selector in sync
- Handle race conditions and concurrent updates

### 18. Add Neighborhood Refinement
- Implement neighborhood search/filter input
- Fetch neighborhoods based on selected borough
- Show neighborhood chips/tags for multi-select
- Filter results by selected neighborhoods
- Update map to show only selected neighborhoods

### 19. Test Search Page with Playwright
- Create `app/split-lease/tests/search-page.spec.ts`
- Test scenarios:
  - Page loads with default filters
  - Borough filter changes update results and map
  - Price filter narrows results
  - Weekly pattern filter updates schedule selector
  - Schedule selector updates search results
  - Sort changes re-order results
  - Multiple filters work together correctly
  - URL parameters initialize filters correctly
  - Browser back/forward navigation works
- Test on desktop and mobile viewports
- Verify accessibility with screen reader testing

### 20. Compare with Original Bubble Page
- Use Playwright to access https://app.split.lease/search
- Document visual differences
- Compare filter behavior and workflows
- Test edge cases from original page
- Ensure feature parity
- Make adjustments to match original as closely as possible

### 21. Performance Optimization
- Implement debouncing for search API calls
- Add request cancellation for rapid filter changes
- Lazy load map only when map view is active
- Optimize component re-renders (React.memo, useMemo)
- Minimize UMD bundle size
- Add loading indicators for better perceived performance

### 22. Accessibility Improvements
- Ensure all filters are keyboard navigable
- Add ARIA labels to all interactive elements
- Implement focus management for modals/dropdowns
- Test with screen readers (NVDA, JAWS)
- Ensure color contrast meets WCAG AA standards
- Add skip links for keyboard users

### 23. Mobile Responsiveness
- Test on mobile viewports (320px, 375px, 414px)
- Implement mobile-specific filter drawer
- Adjust map/results layout for mobile
- Ensure touch targets are at least 44x44px
- Test on actual mobile devices (iOS Safari, Android Chrome)

### 24. Documentation
- Update README.md with search page documentation
- Document filter workflows and state management
- Add code comments for complex logic
- Create component usage examples
- Document API integration and search queries

## Testing Strategy

### Unit Tests
- Test each filter component in isolation
- Test search API methods with mock Supabase client
- Test SearchScheduleSelector day selection logic
- Test filter state management and URL parameter handling
- Test SearchResults rendering with various result sets
- Test SearchMap marker placement and info windows
- Mock external dependencies (Google Maps API, Supabase)

### Integration Tests
- Test filter changes trigger correct API calls
- Test cross-island state synchronization
- Test URL parameter persistence across navigation
- Test map updates when filters change
- Test results update when schedule selector changes
- Test error handling for failed API calls

### End-to-End Tests (Playwright)
- Full user journey: land on page → apply filters → view results → click listing
- Filter combination testing (all filters applied together)
- Map interaction testing (click markers, pan/zoom)
- Mobile viewport testing
- Browser back/forward navigation
- Deep link testing (sharing URLs with filter parameters)

### Visual Regression Tests
- Compare screenshots with original Bubble page
- Ensure consistent styling across browsers
- Test responsive breakpoints
- Verify filter panel layout matches original

### Edge Cases
- Empty search results (no listings match filters)
- API errors (timeout, 500 error, network failure)
- Invalid URL parameters (malformed, non-existent borough)
- Rapid filter changes (debouncing and request cancellation)
- Very large result sets (100+ listings)
- Zero listings in a borough
- Missing map API key (graceful degradation)
- Browser without JavaScript (progressive enhancement)
- Slow network conditions (loading states)

### Performance Tests
- Measure page load time (target: < 3s on 3G)
- Measure time to interactive (target: < 5s on 3G)
- Measure UMD bundle size (target: < 200KB gzipped)
- Test search API response time (target: < 500ms)
- Test map rendering performance with 50+ markers
- Monitor memory usage during filter changes

## Acceptance Criteria
1. Search page loads with default filters (Manhattan, $200-$350/night, Every week, Our Recommendations)
2. All filter dropdowns function correctly and update search results
3. Borough filter changes map center and updates neighborhood options
4. Price filter narrows results to matching listings
5. Weekly pattern filter updates schedule selector display
6. Schedule selector allows day selection and triggers search
7. Sort dropdown re-orders results without re-fetching
8. Neighborhood refinement filters results by selected neighborhoods
9. Search results display in grid format with listing cards
10. Google Maps shows listing markers with correct locations
11. Clicking map markers shows listing info windows
12. Filter changes update URL parameters
13. URL parameters initialize filters on page load
14. Browser back/forward navigation maintains filter state
15. Page is fully responsive (mobile, tablet, desktop)
16. All interactive elements are keyboard accessible
17. Page meets WCAG AA accessibility standards
18. Search API queries Supabase correctly with all filters
19. Error states display helpful messages
20. Loading states show while fetching results
21. Empty result state displays when no listings match
22. Page matches original Bubble design visually
23. Filter workflows match original Bubble behavior (4-step process)
24. All existing Bubble features are implemented
25. Playwright tests pass with >90% coverage
26. Page loads in < 3 seconds on 3G connection
27. UMD bundle is < 200KB gzipped

## Validation Commands
Execute these commands to validate the feature is complete:

### Build Validation
- `cd app/split-lease/components && npm run build` - Build component library UMD bundle
- `cd app/split-lease/components && npm run typecheck` - Verify TypeScript types compile

### Test Validation
- `cd app/split-lease/components && npm test` - Run component unit tests
- `cd app/split-lease && npm run test:e2e` - Run Playwright end-to-end tests
- `cd app/split-lease && npm run test:e2e -- --grep "search page"` - Run search page specific tests

### Code Quality
- `cd app/split-lease/components && npm run lint` - Check code style (if linter configured)
- `cd app/split-lease && npm run typecheck` - Verify all TypeScript files compile

### Manual Testing
- Open `app/split-lease/pages/search/index.html` in browser
- Verify all filters function correctly
- Test on Chrome, Firefox, Safari
- Test on mobile viewport (DevTools responsive mode)
- Compare side-by-side with https://app.split.lease/search
- Run Lighthouse audit (target: >90 performance, >90 accessibility)

### Bundle Size Check
- `cd app/split-lease/components/dist && ls -lh split-lease-components.umd.js` - Check UMD bundle size
- `cd app/split-lease/components/dist && gzip -c split-lease-components.umd.js | wc -c` - Check gzipped size (Windows: use 7-zip or similar)

### Supabase Integration
- Test search API calls in browser console
- Verify filter combinations return correct results
- Check API response times in Network tab
- Validate search query performance in Supabase dashboard

## Notes

### Dependencies
All dependencies should be added to `app/split-lease/components/package.json`:
- React 18 (peer dependency, loaded from CDN)
- styled-components (for component styling)
- framer-motion (for animations, if used in schedule selector)
- Google Maps JavaScript API (loaded from CDN with API key)

### Supabase Integration
- Use existing `app/split-lease/api/client.ts` for Supabase connection
- Search queries should filter on:
  - `Location - Borough` (text field)
  - `Location - Hood` or `Location - Hoods (new)` (jsonb field)
  - Price calculated from listing pricing data
  - `Days Available (List of Days)` (jsonb field) matching selected schedule
  - `Active = true` and `Approved = true`
- Use `.Search Ranking` field for "Our Recommendations" sort
- Implement pagination or limit results to 50 per query

### Google Maps API
- API key should be configured in environment or page HTML
- Use Marker Clusterer for better performance with many markers
- Info windows should show: listing image, title, price, neighborhood
- Map center coordinates for boroughs (reference from Bubble analysis):
  - Brooklyn: 365 Stockholm St, Brooklyn, NY 11237, USA

### Filter Workflow Pattern (from Bubble Analysis)
Each filter change follows a 4-step workflow:
1. Input element value change event
2. State update (map center if location, user preference save)
3. Optional: Trigger alert/toast (version-test environment only)
4. Navigate to search page with updated URL parameters

This workflow should be replicated in the new implementation using:
- onChange handlers for filter inputs
- localStorage for user preference persistence (or API call)
- URL parameter updates using History API (pushState)
- Search API call with new filter values

### Schedule Selector Integration
The Search Schedule Selector from the external repository should be:
- Adapted to work as a standalone React island
- Mounted in the green rectangle area (as shown in screenshot)
- Connected to the Weekly Pattern filter
- Able to trigger search when day selection changes
- Display check-in/check-out days based on selection

Reference repository: https://github.com/splitleasesharath/search-schedule-selector.git
- Clone and analyze before adapting
- Maintain core functionality (drag selection, validation, animations)
- Modify to fit Islands Architecture (remove any routing dependencies)

### Design Reference
Use the annotated screenshot `C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png` to guide implementation:
- Orange rectangle: Search filters section (borough, price, weekly pattern, sort, neighborhood)
- Green rectangle: Search Schedule Selector component
- Right side: Results grid and map view
- Match visual design, spacing, colors, fonts

### Future Enhancements
Not in scope for this iteration but documented for future reference:
- Advanced filters (amenities, bedrooms, bathrooms)
- Saved searches and email alerts
- Favorite listings
- Comparison tool for multiple listings
- Enhanced map interactions (draw search area, distance radius)
- Real-time availability updates via Supabase Realtime
- Server-side rendering for better SEO
- Filter analytics and tracking

### Browser Support
Target browsers:
- Chrome 90+ (desktop and mobile)
- Firefox 88+
- Safari 14+ (desktop and iOS)
- Edge 90+
Graceful degradation for older browsers (show message to upgrade)

### Performance Considerations
- UMD bundle should be code-split if it exceeds 200KB
- Consider lazy loading SearchMap component (only load when map view active)
- Debounce search API calls (300ms delay)
- Cancel pending API requests when filters change rapidly
- Use React.memo for expensive re-renders
- Optimize images in listing cards (lazy loading, srcset)

### Accessibility Requirements
- All filters must be keyboard navigable (Tab, Enter, Arrow keys)
- ARIA roles and labels for all interactive elements
- Focus management for dropdowns and modals
- Color contrast ratio ≥ 4.5:1 for text
- Alt text for all images
- Skip links for keyboard users
- Screen reader tested (NVDA on Windows, VoiceOver on Mac)
