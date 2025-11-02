# Feature: Build Skeletal Search Page with Filter Section

## Metadata
adw_id: `4`
tree_id: `13316f54`
prompt: `Create in the app directory, a search page. I have all the necessary Context locally available and added in here as paths. This needs to follow the ESM + React islands Structure with an HTML page. Splitlease is a marketplace for listings for guests who're looking for repeat rentals, provided by hosts, who'll list their spaces on our site. We're building the skeletal structure of the search page, that we're rebuilding with code (the original search page was built on bubble). For right now, I want you to strictly observe the filter section and prioritize just the Filter section as is in the original. For this step, Do not fret about the functionality or logic of the search filters. Build them as empty skeletal structures including the Search Schedule Selector component from the repository: https://github.com/splitleasesharath/search-schedule-selector.git.`

## Feature Description
Build a comprehensive skeletal search page for the Split Lease marketplace following the Islands Architecture pattern. The page will feature a prominent filter section on the left side that includes:
- Borough/Location selector dropdown
- Week Pattern selector (Every week, One week on/off, etc.)
- Price Tier dropdown filter
- Sort By dropdown
- Search Schedule Selector component (migrated from external repo)
- Neighborhood refinement filter
- Additional filter options (Amenities, Space Type, etc.)

The page will also include placeholder sections for:
- Google Maps integration area (right side, top)
- Listing results grid (right side, bottom)

This is a skeletal implementation focused on UI structure and layout, not functionality. All components will be built as React islands mounted into a static HTML page.

## User Story
As a guest searching for rental properties
I want to see a well-organized search interface with comprehensive filter options
So that I can refine my search criteria and find properties that match my specific needs for periodic tenancy rentals

## Problem Statement
The current search page is built on Bubble (a no-code platform), which limits customization, performance, and maintainability. We need to rebuild the search page using modern web technologies (ESM + React Islands) to:
1. Improve page performance and load times
2. Enable better code maintainability and version control
3. Provide a foundation for future feature enhancements
4. Maintain the existing user experience and filter layout

## Solution Statement
Create a new search page using the Islands Architecture pattern where:
1. The main page is a static HTML file (`pages/search/index.html`)
2. Interactive filter components are built as React islands using the existing component library
3. The Search Schedule Selector component is migrated from the external repository and adapted to the islands structure
4. All filter components are mounted as independent islands with proper styling matching the original design
5. Placeholder sections are created for Google Maps and listing results (to be implemented in future phases)

## Relevant Files

### Existing Files for Reference
- **README.md** - Project overview explaining Islands Architecture pattern, component structure, and development workflow
- **app/split-lease/components/src/index.ts** - Component barrel export file showing current component structure
- **app/split-lease/components/vite.config.ts** - Vite configuration for building UMD bundles
- **app/split-lease/components/package.json** - Component library dependencies
- **app/split-lease/islands/README.md** - Islands mounting documentation and patterns
- **app/split-lease/types/models.ts** - Type definitions for data models
- **app/split-lease/types/api.ts** - API type definitions
- **Context Files:**
  - `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md` - Data type specifications
  - `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md` - Option set specifications (DAYS, FILTER-PRICEONSEARCH, SORTBYPROPERTIESSEARCH, WEEKLY SELECTION OPTIONS)
  - `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\New\SEARCH_FILTER_ANALYSIS_REPORT.md` - Comprehensive analysis of filter workflows and behaviors

### New Files to Create

#### HTML Pages
- **app/split-lease/pages/search/index.html** - Main search page HTML with island mount points

#### CSS Files
- **app/split-lease/pages/search/css/search.css** - Search page specific styles
- **app/split-lease/pages/search/css/filters.css** - Filter section styles

#### JavaScript Files
- **app/split-lease/pages/search/js/search-islands.js** - Island mounting logic for search page

#### React Components (in components/src/)
- **app/split-lease/components/src/SearchScheduleSelector/** - Migrated schedule selector component
  - `SearchScheduleSelector.tsx` - Main component
  - `SearchScheduleSelector.styles.ts` - Styled components
  - `types.ts` - TypeScript interfaces
  - `index.ts` - Barrel export

- **app/split-lease/components/src/filters/** - Filter components directory
  - **BoroughFilter/** - Borough/location selector
  - **WeekPatternFilter/** - Weekly frequency selector
  - **PriceTierFilter/** - Price range selector
  - **SortByFilter/** - Sort options selector
  - **NeighborhoodFilter/** - Neighborhood refinement search
  - **FilterSidebar/** - Container component for all filters

#### Island Mount Files
- **app/split-lease/islands/search-schedule-selector.tsx** - Island mount for schedule selector
- **app/split-lease/islands/search-filters.tsx** - Island mount for filter sidebar

#### Type Definitions
- **app/split-lease/types/search.ts** - Search-specific type definitions
- **app/split-lease/types/filters.ts** - Filter-specific type definitions

## Implementation Plan

### Phase 1: Foundation & Setup
1. Create the search page directory structure
2. Set up base HTML file with proper CDN links and structure
3. Clone and analyze the external Search Schedule Selector repository
4. Define TypeScript types for search and filter data based on context files
5. Create base CSS files for search page styling

### Phase 2: Core Implementation
1. Migrate Search Schedule Selector component to the islands structure
2. Build individual filter components (Borough, WeekPattern, PriceTier, SortBy, Neighborhood)
3. Create FilterSidebar container component
4. Implement placeholder sections (Map area, Results grid)
5. Style all components to match the original design from the screenshot
6. Update component barrel exports

### Phase 3: Integration
1. Build the UMD component bundle
2. Create island mounting scripts for the search page
3. Wire up all filter components in the HTML page
4. Test visual layout and component rendering
5. Use Playwright to compare with original page and iterate
6. Document component usage and structure

## Step by Step Tasks

### 1. Create Search Page Directory Structure
- Create `app/split-lease/pages/search/` directory
- Create subdirectories: `css/`, `js/`, `images/`
- Create placeholder `index.html` file

### 2. Define Type Definitions
- Create `app/split-lease/types/search.ts` with data types from context files
- Create `app/split-lease/types/filters.ts` with filter option types
- Include types for: Listing, User, ZAT-Geo-Borough, ZAT-Features, Days, Nights, PriceTier, WeeklyPattern, SortBy

### 3. Clone and Analyze Search Schedule Selector Repository
- Clone `https://github.com/splitleasesharath/search-schedule-selector.git` to temporary location
- Analyze component structure and dependencies
- Document migration requirements and necessary adaptations

### 4. Migrate Search Schedule Selector Component
- Create `app/split-lease/components/src/SearchScheduleSelector/` directory
- Migrate component files and adapt to islands structure
- Update imports and dependencies to match project structure
- Create proper TypeScript interfaces in `types.ts`
- Implement styled-components in `SearchScheduleSelector.styles.ts`
- Export component from `index.ts`

### 5. Build Borough Filter Component
- Create `app/split-lease/components/src/filters/BoroughFilter/` directory
- Implement dropdown component with options: Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, Essex County NJ, Hudson County NJ
- Style to match original design
- Add proper TypeScript types
- Export from `index.ts`

### 6. Build Week Pattern Filter Component
- Create `app/split-lease/components/src/filters/WeekPatternFilter/` directory
- Implement dropdown with weekly selection options from context files
- Options: "Every week", "One week on, one week off", "Two weeks on, two weeks off", "One week on, three weeks off"
- Style to match original design
- Export from `index.ts`

### 7. Build Price Tier Filter Component
- Create `app/split-lease/components/src/filters/PriceTierFilter/` directory
- Implement dropdown with price range options from context files
- Options: "< $200/night", "$200-$350/night", "$350-$500/night", "$500+/night", "All Prices"
- Style to match original design
- Export from `index.ts`

### 8. Build Sort By Filter Component
- Create `app/split-lease/components/src/filters/SortByFilter/` directory
- Implement dropdown with sort options from context files
- Options: "Our Recommendations", "Price-Lowest to Highest", "Most viewed", "Recently Added"
- Style to match original design
- Export from `index.ts`

### 9. Build Neighborhood Filter Component
- Create `app/split-lease/components/src/filters/NeighborhoodFilter/` directory
- Implement search/filter input for neighborhood refinement
- Style to match original design (likely a searchable dropdown or autocomplete)
- Export from `index.ts`

### 10. Build Filter Sidebar Container Component
- Create `app/split-lease/components/src/filters/FilterSidebar/` directory
- Create container component that composes all filter components
- Implement proper layout and spacing matching original design
- Include the Search Schedule Selector at the appropriate position (marked in green rectangle in screenshot)
- Style the sidebar container
- Export from `index.ts`

### 11. Update Component Barrel Exports
- Update `app/split-lease/components/src/index.ts` to export all new filter components
- Export SearchScheduleSelector component
- Export FilterSidebar component
- Ensure proper TypeScript type exports

### 12. Create Search Page HTML Structure
- Create complete `app/split-lease/pages/search/index.html` with:
  - Proper DOCTYPE and HTML5 structure
  - Meta tags for responsive design
  - CDN links for React 18 and ReactDOM
  - Link to component UMD bundle
  - Link to search page CSS files
  - Header section (using existing Header component)
  - Main content area with two-column layout:
    - Left column: Filter sidebar mount point (`<div id="filter-sidebar">`)
    - Right column:
      - Map placeholder mount point (`<div id="map-container">`)
      - Results grid placeholder mount point (`<div id="results-grid">`)
  - Footer section (using existing Footer component)

### 13. Create Search Page CSS Files
- Create `app/split-lease/pages/search/css/search.css` with:
  - Page layout styles (two-column grid)
  - Responsive breakpoints
  - Container styles for map and results areas
  - Typography and color scheme matching brand
- Create `app/split-lease/pages/search/css/filters.css` with:
  - Filter sidebar styling
  - Dropdown component styles
  - Input field styles
  - Spacing and alignment matching original design

### 14. Create Island Mounting Scripts
- Create `app/split-lease/islands/search-filters.tsx` with mount logic for FilterSidebar
- Create island mounting code in `app/split-lease/pages/search/js/search-islands.js`:
  - Mount FilterSidebar component at `#filter-sidebar`
  - Mount Header component at header location
  - Mount Footer component at footer location
  - Add placeholder components for Map and Results (simple React components with "Coming Soon" messaging)

### 15. Build Component Bundle
- Run `npm run build` in `app/split-lease/components/` directory
- Verify UMD bundle is created successfully
- Verify all new components are included in the bundle

### 16. Test Search Page Rendering
- Open `app/split-lease/pages/search/index.html` in browser
- Verify all filter components render correctly
- Verify layout matches the original design from screenshot
- Check responsive behavior
- Verify no console errors

### 17. Use Playwright to Compare with Original (Pass 1)
- Navigate to `https://app.split.lease/search` using Playwright
- Take screenshots of the original page
- Take screenshots of the new page
- Document visual differences
- Identify areas requiring adjustment

### 18. Iterate on Design Adjustments (Pass 1)
- Adjust CSS styles to better match original
- Refine component layouts and spacing
- Update filter component styling
- Adjust colors, fonts, and visual elements

### 19. Use Playwright to Compare with Original (Pass 2)
- Re-compare both pages after adjustments
- Document remaining differences
- Verify filter section layout matches original
- Verify Search Schedule Selector placement and styling

### 20. Final Design Refinements (Pass 2)
- Make final CSS adjustments
- Ensure pixel-perfect alignment where critical
- Verify responsive behavior matches original
- Test across different viewport sizes

### 21. Document Component Usage
- Add README.md in `app/split-lease/pages/search/` directory
- Document how to mount filter components
- Document component props and types
- Add examples of usage

### 22. Create Validation Tests
- Create basic Playwright test to verify page loads
- Test that all filter components mount successfully
- Verify no console errors or warnings

## Testing Strategy

### Unit Tests
- **SearchScheduleSelector Component**: Test day selection, drag functionality, validation logic
- **BoroughFilter Component**: Test dropdown rendering, option selection
- **WeekPatternFilter Component**: Test dropdown rendering, option selection
- **PriceTierFilter Component**: Test dropdown rendering, option selection
- **SortByFilter Component**: Test dropdown rendering, option selection
- **NeighborhoodFilter Component**: Test search/filter functionality
- **FilterSidebar Component**: Test composition of all filter components, layout rendering

### Integration Tests
- **Island Mounting**: Verify all components mount correctly in the HTML page
- **Component Communication**: Verify components can be accessed via `window.SplitLeaseComponents`
- **UMD Bundle**: Verify bundle builds successfully and includes all components
- **Page Layout**: Verify two-column layout renders correctly

### Visual Regression Tests (Using Playwright)
- Compare new search page filter section with original at `https://app.split.lease/search`
- Test responsive layout at various breakpoints (mobile, tablet, desktop)
- Verify filter positioning matches screenshot reference

### Edge Cases
- Test with no JavaScript enabled (progressive enhancement)
- Test with very long neighborhood names
- Test with missing CDN resources (graceful degradation)
- Test responsive behavior at edge breakpoints (899px, 900px for desktop vs mobile)
- Test component rendering when mount point doesn't exist

## Acceptance Criteria

### Visual Design
- [ ] Filter sidebar layout matches the original search page design
- [ ] Search Schedule Selector (green rectangle in screenshot) is positioned correctly within the filter section
- [ ] All filter dropdowns match the original styling
- [ ] Two-column layout (filters left, map/results right) is implemented
- [ ] Page is responsive and matches original responsive behavior

### Component Structure
- [ ] All filter components are built as separate React islands
- [ ] SearchScheduleSelector is successfully migrated and adapted to islands structure
- [ ] Components are exported from component library barrel file
- [ ] Components are accessible via `window.SplitLeaseComponents`

### Technical Requirements
- [ ] Page uses Islands Architecture pattern (static HTML + React islands)
- [ ] UMD bundle builds successfully and includes all new components
- [ ] TypeScript types are defined for all components and data structures
- [ ] No console errors when page loads
- [ ] All components mount successfully in their designated mount points

### Code Quality
- [ ] Code follows existing project patterns and conventions
- [ ] Components use styled-components for styling
- [ ] TypeScript is used with proper type definitions
- [ ] Component files follow the established structure (Component.tsx, Component.styles.ts, types.ts, index.ts)
- [ ] Proper barrel exports are created

### Documentation
- [ ] Component usage is documented in README
- [ ] Type definitions are properly documented
- [ ] Island mounting patterns are documented

### Comparison with Original
- [ ] Playwright comparison completed (minimum 2 passes)
- [ ] Visual differences documented
- [ ] Filter section matches original design from screenshot
- [ ] Layout adjustments made based on comparison

## Validation Commands

Execute these commands to validate the feature is complete:

### 1. Build Component Library
```bash
cd app/split-lease/components
npm install
npm run build
```
Expected: UMD bundle created at `dist/split-lease-components.umd.cjs` with no errors

### 2. Verify Component Exports
```bash
cd app/split-lease/components
npm run typecheck
```
Expected: TypeScript compilation succeeds with no errors

### 3. Verify Page Structure
```bash
ls -la app/split-lease/pages/search/
ls -la app/split-lease/pages/search/css/
ls -la app/split-lease/pages/search/js/
```
Expected: All directories and files exist as specified

### 4. Verify Component Files
```bash
ls -la app/split-lease/components/src/SearchScheduleSelector/
ls -la app/split-lease/components/src/filters/BoroughFilter/
ls -la app/split-lease/components/src/filters/WeekPatternFilter/
ls -la app/split-lease/components/src/filters/PriceTierFilter/
ls -la app/split-lease/components/src/filters/SortByFilter/
ls -la app/split-lease/components/src/filters/NeighborhoodFilter/
ls -la app/split-lease/components/src/filters/FilterSidebar/
```
Expected: All component directories exist with proper file structure

### 5. Test Page Load in Browser
```bash
# Open in default browser (Windows)
start app/split-lease/pages/search/index.html
```
Expected: Page loads without errors, all components render, layout matches design

### 6. Run Playwright Visual Comparison
```bash
cd app/split-lease
npx playwright test --grep "search-page-visual"
```
Expected: Visual comparison test passes or documents expected differences

## Notes

### Design Reference
The primary design reference is the screenshot at:
`C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png`

Key observations from screenshot:
- **Orange Rectangle**: Marks the entire filter section (our primary focus)
- **Green Rectangle**: Marks the Search Schedule Selector component placement within filters

### External Repository
The Search Schedule Selector must be cloned from:
`https://github.com/splitleasesharath/search-schedule-selector.git`

This component needs to be adapted to work with our Islands Architecture. Key adaptations:
1. Convert to TypeScript if not already
2. Adapt imports to match project structure
3. Ensure styled-components compatibility
4. Export properly for UMD bundle inclusion

### Data Types (from context files)
Core data types to implement:
- **User**: Current user information, authentication, profile data
- **Listing**: Property listings displayed in search results
- **ZAT-Geo-Borough-Top Level**: Borough selection (Manhattan, Brooklyn, Queens, Bronx, NJ counties)
- **ZAT-Geo-Hood-Medium Level**: Neighborhood data
- **Days**: Day-of-week data for schedule selector
- **Nights Available**: Available nights for bookings
- **ZAT-Features-***: Various feature types (Amenity, Space Type, etc.)

### Option Sets (from context files)
Key option sets to implement:
- **DAYS**: Sunday through Saturday with attributes (Bubble Number, First 3 letters, Single Letter, etc.)
- **FILTER-PRICEONSEARCH**: Price ranges with min/max values
- **SORTBYPROPERTIESSEARCH**: Sort options with field names and sort direction
- **WEEKLY SELECTION OPTIONS**: Weekly frequency patterns with display names and period calculations

### Future Enhancements (Out of Scope)
The following are explicitly **NOT** included in this skeletal implementation:
- ❌ Filter functionality and logic (onChange handlers, state management)
- ❌ API integration for fetching listings
- ❌ Google Maps integration (placeholder only)
- ❌ Listing results rendering (placeholder only)
- ❌ User authentication
- ❌ Saved searches functionality
- ❌ URL parameter management
- ❌ Supabase database integration

These will be implemented in subsequent phases after the skeletal structure is complete.

### Dependencies to Add
If not already present, these dependencies may need to be added:
```bash
cd app/split-lease/components
npm install styled-components framer-motion
npm install -D @types/styled-components
```

### Browser Compatibility
Target browsers (per project README):
- Modern browsers with ES2020 support
- React 18 compatible
- CSS Grid and Flexbox support required

### Performance Considerations
- Use Islands Architecture to minimize JavaScript payload
- Load React via CDN for caching benefits
- Ensure filter components are lightweight and fast to mount
- Consider lazy loading for future enhancements

### Accessibility Considerations
- Ensure all dropdowns are keyboard accessible
- Add proper ARIA labels to filter components
- Ensure proper focus management
- Test with screen readers in future phases
