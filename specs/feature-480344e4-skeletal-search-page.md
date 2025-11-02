# Feature: Build Skeletal Search Page with Filter Section

## Metadata
adw_id: `480344e4`
prompt: `Build out a skeletal search page following ESM + React islands structure with HTML page. Create the search page with focus on the filter section, including a Search Schedule Selector component adapted from the existing repository. Build skeletal structures for Supabase database and Google Maps implementations.`

## Feature Description
This feature implements a skeletal search page for the Split Lease marketplace following the Islands Architecture pattern. The page will display rental listings with an interactive filter sidebar on the left, a results grid in the center, and a map preview on the right. The primary focus is on building the filter section with fully functional UI components (non-functional logic), including:

1. **Search Schedule Selector** - Interactive day-of-week picker (rebuilt from existing repo)
2. **Borough Selector** - Dropdown for geographic filtering
3. **Week Pattern Selector** - Recurring schedule options
4. **Price Tier Selector** - Price range filtering
5. **Sort By Selector** - Result ordering options
6. **Neighborhood Refinement** - Multi-select with search

The filter section will be built to match the visual design and structure of the original Bubble-based search page at https://app.split.lease/search, but implemented as clean, maintainable code using React islands architecture.

## User Story
As a guest looking for split-lease rental properties
I want to use an intuitive search page with filters to narrow down listings
So that I can find rental properties that match my schedule, location, and budget preferences

## Problem Statement
Split Lease currently has a search page built on Bubble.io, which limits customization, performance, and maintainability. The platform needs a code-based search page that:
- Provides the same filtering capabilities as the original
- Follows modern web development best practices
- Uses the Islands Architecture pattern for optimal performance
- Maintains visual consistency with the original design
- Allows for future enhancements and integrations (Supabase, Google Maps)

## Solution Statement
Create a skeletal search page using the ESM + React islands structure with static HTML as the foundation. Build out the filter section as interactive React components that mount as islands, while leaving placeholder structures for the results grid, map integration, and database connectivity. The Search Schedule Selector will be rebuilt from the existing repository and adapted to fit the islands architecture. All filter components will have visual UI and state management, but without backend integration in this phase.

## Relevant Files

### Existing Files to Reference
- **app/split-lease/components/src/index.ts** - Component library barrel export, need to add new search filter components
- **app/split-lease/pages/home/README.md** - Islands architecture documentation and patterns to follow
- **app/split-lease/components/src/molecules/ListingCard/** - Existing listing card component for results display
- **README.md** - Project structure and build process documentation

### Context Files (Read-only Reference)
- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md** - Data type definitions
- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md** - Filter option definitions
- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\New\SEARCH_FILTER_ANALYSIS_REPORT.md** - Filter logic workflow analysis

### Screenshot References
- **C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png** - Original design reference
- **.playwright-mcp/original-search-page-full.png** - Full page screenshot captured during analysis
- **.playwright-mcp/search-filters-section.png** - Filter section close-up

### New Files to Create

#### HTML Pages
- **app/split-lease/pages/search/index.html** - Static HTML search page with island mount points
- **app/split-lease/pages/search/css/search.css** - Search page styles

#### React Components - Search Schedule Selector
- **app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.tsx** - Main component
- **app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.styles.ts** - Styled components
- **app/split-lease/components/src/SearchScheduleSelector/types.ts** - TypeScript interfaces
- **app/split-lease/components/src/SearchScheduleSelector/index.ts** - Component export

#### React Components - Filter Components
- **app/split-lease/components/src/molecules/BoroughSelector/BoroughSelector.tsx** - Borough dropdown
- **app/split-lease/components/src/molecules/BoroughSelector/BoroughSelector.styles.ts** - Styles
- **app/split-lease/components/src/molecules/BoroughSelector/types.ts** - Types
- **app/split-lease/components/src/molecules/BoroughSelector/index.ts** - Export

- **app/split-lease/components/src/molecules/WeekPatternSelector/WeekPatternSelector.tsx** - Week pattern dropdown
- **app/split-lease/components/src/molecules/WeekPatternSelector/WeekPatternSelector.styles.ts** - Styles
- **app/split-lease/components/src/molecules/WeekPatternSelector/types.ts** - Types
- **app/split-lease/components/src/molecules/WeekPatternSelector/index.ts** - Export

- **app/split-lease/components/src/molecules/PriceTierSelector/PriceTierSelector.tsx** - Price tier dropdown
- **app/split-lease/components/src/molecules/PriceTierSelector/PriceTierSelector.styles.ts** - Styles
- **app/split-lease/components/src/molecules/PriceTierSelector/types.ts** - Types
- **app/split-lease/components/src/molecules/PriceTierSelector/index.ts** - Export

- **app/split-lease/components/src/molecules/SortBySelector/SortBySelector.tsx** - Sort dropdown
- **app/split-lease/components/src/molecules/SortBySelector/SortBySelector.styles.ts** - Styles
- **app/split-lease/components/src/molecules/SortBySelector/types.ts** - Types
- **app/split-lease/components/src/molecules/SortBySelector/index.ts** - Export

- **app/split-lease/components/src/molecules/NeighborhoodSearch/NeighborhoodSearch.tsx** - Neighborhood search/filter
- **app/split-lease/components/src/molecules/NeighborhoodSearch/NeighborhoodSearch.styles.ts** - Styles
- **app/split-lease/components/src/molecules/NeighborhoodSearch/types.ts** - Types
- **app/split-lease/components/src/molecules/NeighborhoodSearch/index.ts** - Export

#### React Components - Search Filters Organism
- **app/split-lease/components/src/organisms/SearchFilters/SearchFilters.tsx** - Container for all filters
- **app/split-lease/components/src/organisms/SearchFilters/SearchFilters.styles.ts** - Container styles
- **app/split-lease/components/src/organisms/SearchFilters/types.ts** - Container types
- **app/split-lease/components/src/organisms/SearchFilters/index.ts** - Export

#### Placeholder Components
- **app/split-lease/components/src/organisms/SearchResults/SearchResults.tsx** - Results grid placeholder
- **app/split-lease/components/src/organisms/SearchResults/SearchResults.styles.ts** - Styles
- **app/split-lease/components/src/organisms/SearchResults/index.ts** - Export

- **app/split-lease/components/src/organisms/SearchMap/SearchMap.tsx** - Map placeholder
- **app/split-lease/components/src/organisms/SearchMap/SearchMap.styles.ts** - Styles
- **app/split-lease/components/src/organisms/SearchMap/index.ts** - Export

#### JavaScript Assets
- **app/split-lease/pages/search/js/mount-filters.js** - Island mounting script for filters

#### Documentation
- **app/split-lease/pages/search/README.md** - Search page documentation

## Implementation Plan

### Phase 1: Foundation & Structure
Set up the basic search page structure with HTML, CSS, and placeholder components. This phase establishes the page layout, responsive grid, and mount points for React islands.

**Key Activities:**
- Create search page directory structure
- Build static HTML page with semantic markup
- Implement CSS grid layout (filters left, results center, map right)
- Add responsive breakpoints for mobile/tablet/desktop
- Create placeholder sections for results and map

### Phase 2: Search Schedule Selector Component
Rebuild the SearchScheduleSelector from the external repository, adapting it for the Islands Architecture pattern and ensuring it matches the design in the screenshot.

**Key Activities:**
- Clone and study the search-schedule-selector repository structure
- Create component with TypeScript interfaces matching the original
- Implement styled-components for glassmorphism design
- Add Framer Motion animations for interactions
- Implement click and drag selection logic
- Add validation for contiguous day requirements
- Build props interface for configuration
- Ensure component is self-contained for island mounting

### Phase 3: Filter Components Development
Build individual filter components as reusable molecules, following atomic design principles and the patterns established in the existing codebase.

**Key Activities:**
- Create BoroughSelector with 7 options (Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, Essex County NJ, Hudson County NJ)
- Create WeekPatternSelector with 4 options (Every week, 1 on/1 off, 2 on/2 off, 1 on/3 off)
- Create PriceTierSelector with 5 options (< $200, $200-$350, $350-$500, $500+, All Prices)
- Create SortBySelector with 4 options (Our Recommendations, Price Low-High, Most Viewed, Recently Added)
- Create NeighborhoodSearch with multi-select and search functionality
- Implement consistent styling and interaction patterns across all selectors
- Add proper TypeScript types for all options and state

### Phase 4: SearchFilters Organism & Integration
Compose all filter components into a cohesive SearchFilters organism that manages state and coordinates between components.

**Key Activities:**
- Create SearchFilters container component
- Implement state management for all filter values
- Add URL parameter synchronization (optional for skeletal phase)
- Create callback props for filter changes
- Implement "listings found" counter display
- Build responsive layout for filter sidebar
- Add proper spacing and visual hierarchy
- Ensure accessibility with ARIA labels

### Phase 5: Results & Map Placeholders
Create placeholder components for the search results grid and map integration to complete the page structure.

**Key Activities:**
- Build SearchResults placeholder with loading states
- Add grid layout for listing cards
- Create SearchMap placeholder with map container
- Add "Integration coming soon" messaging
- Implement responsive layout for results + map sections
- Ensure proper integration points for future Supabase and Google Maps implementations

### Phase 6: Component Build & Island Mounting
Build the component library and create island mounting scripts to hydrate the interactive components on the static HTML page.

**Key Activities:**
- Build component library with Vite
- Create UMD bundle for components
- Write island mounting script for filter section
- Test component hydration on page load
- Verify all interactions work correctly
- Add error handling for missing elements
- Test responsive behavior across devices

### Phase 7: Testing & Refinement
Thoroughly test the search page against the original design, making multiple passes with Playwright to ensure visual and functional accuracy.

**Key Activities:**
- Compare new page to original using Playwright screenshots
- Verify all filter components render correctly
- Test all interactive elements (clicks, selections, typing)
- Verify responsive behavior on mobile/tablet/desktop
- Test keyboard navigation and accessibility
- Validate TypeScript types and build process
- Document any deviations from original design
- Make refinements based on comparison

## Step by Step Tasks

### 1. Setup Search Page Structure
- Create `app/split-lease/pages/search/` directory
- Create `app/split-lease/pages/search/css/` directory
- Create `app/split-lease/pages/search/js/` directory
- Create `app/split-lease/pages/search/images/` directory (if needed)

### 2. Create Static HTML Page
- Create `app/split-lease/pages/search/index.html` with semantic HTML structure
- Add CDN links for React 18 and ReactDOM
- Add mount point `<div id="search-filters"></div>` for filter island
- Add mount point `<div id="search-results"></div>` for results placeholder
- Add mount point `<div id="search-map"></div>` for map placeholder
- Add component library UMD bundle script tag
- Add island mounting script tag
- Include navigation header and footer references

### 3. Create Search Page CSS
- Create `app/split-lease/pages/search/css/search.css` with page layout
- Implement CSS Grid with 3-column layout (sidebar, content, map)
- Add responsive breakpoints (mobile: stack, tablet: 2-col, desktop: 3-col)
- Style base HTML elements (headings, containers, spacing)
- Add utility classes for common patterns
- Ensure visual consistency with homepage styles

### 4. Build SearchScheduleSelector Component
- Create `app/split-lease/components/src/SearchScheduleSelector/` directory
- Create `types.ts` with Day interface and component props
- Create `SearchScheduleSelector.tsx` with main component logic
  - Implement days array (Sunday-Saturday)
  - Add selection state management
  - Implement click to toggle individual days
  - Implement drag to select range
  - Add validation for min/max days (2-5 default)
  - Add contiguous day validation
  - Implement error message display
- Create `SearchScheduleSelector.styles.ts` with styled-components
  - Style day buttons with circular design
  - Add selected state styles (blue background)
  - Implement hover effects
  - Add responsive sizing
  - Style check-in/check-out display
- Create `index.ts` with component export
- Add export to `app/split-lease/components/src/index.ts`

### 5. Build BoroughSelector Component
- Create `app/split-lease/components/src/molecules/BoroughSelector/` directory
- Create `types.ts` with borough options type
- Create `BoroughSelector.tsx` with dropdown component
  - Add options: Bergen County NJ, Bronx, Brooklyn, Essex County NJ, Hudson County NJ, Manhattan, Queens
  - Implement controlled component pattern
  - Add onChange callback
  - Set default to Manhattan
- Create `BoroughSelector.styles.ts` with styled select element
  - Match visual design from screenshot
  - Add dropdown arrow icon
  - Style option elements
  - Add focus states
- Create `index.ts` with export
- Add export to component library index

### 6. Build WeekPatternSelector Component
- Create `app/split-lease/components/src/molecules/WeekPatternSelector/` directory
- Create `types.ts` with weekly selection options type
- Create `WeekPatternSelector.tsx` with dropdown component
  - Add options: Every week, One week on/one week off, Two weeks on/two weeks off, One week on/three weeks off
  - Implement controlled component pattern
  - Add onChange callback
  - Set default to "Every week"
- Create `WeekPatternSelector.styles.ts` with styled select
  - Match visual design from screenshot
  - Handle multiline option text
- Create `index.ts` with export
- Add export to component library index

### 7. Build PriceTierSelector Component
- Create `app/split-lease/components/src/molecules/PriceTierSelector/` directory
- Create `types.ts` with price tier options and range interface
- Create `PriceTierSelector.tsx` with dropdown component
  - Add options: < $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices
  - Implement controlled component pattern
  - Add onChange callback
  - Set default to "$200-$350/night"
  - Include min/max price values for each tier
- Create `PriceTierSelector.styles.ts` with styled select
  - Match visual design from screenshot
- Create `index.ts` with export
- Add export to component library index

### 8. Build SortBySelector Component
- Create `app/split-lease/components/src/molecules/SortBySelector/` directory
- Create `types.ts` with sort options type
- Create `SortBySelector.tsx` with dropdown component
  - Add options: Our Recommendations, Price-Lowest to Highest, Most Viewed, Recently Added
  - Implement controlled component pattern
  - Add onChange callback
  - Set default to "Our Recommendations"
  - Include field name and descending flag for each option
- Create `SortBySelector.styles.ts` with styled select
  - Match visual design from screenshot
- Create `index.ts` with export
- Add export to component library index

### 9. Build NeighborhoodSearch Component
- Create `app/split-lease/components/src/molecules/NeighborhoodSearch/` directory
- Create `types.ts` with neighborhood option type
- Create `NeighborhoodSearch.tsx` with search/filter component
  - Add search input for filtering neighborhoods
  - Implement multi-select listbox (initially empty/placeholder)
  - Add controlled input state
  - Handle neighborhood list based on selected borough (future integration)
  - Add placeholder text "Refine Neighborhood(s)"
- Create `NeighborhoodSearch.styles.ts` with styled input/listbox
  - Match visual design from screenshot
  - Style search input
  - Style listbox container
- Create `index.ts` with export
- Add export to component library index

### 10. Build SearchFilters Organism
- Create `app/split-lease/components/src/organisms/SearchFilters/` directory
- Create `types.ts` with SearchFiltersState interface and callback types
- Create `SearchFilters.tsx` container component
  - Import all filter components (SearchScheduleSelector, BoroughSelector, etc.)
  - Implement state management for all filter values
  - Add callback handlers for each filter change
  - Pass state and handlers to child components
  - Add "X listings found" counter display
  - Implement filter labels ("Select Borough", "Select Week Pattern", etc.)
  - Add proper component composition and layout
- Create `SearchFilters.styles.ts` with container styles
  - Create sidebar layout with proper spacing
  - Style section headings
  - Add dividers between filter groups
  - Style listings counter
  - Implement responsive adjustments
- Create `index.ts` with export
- Add export to component library index

### 11. Build SearchResults Placeholder
- Create `app/split-lease/components/src/organisms/SearchResults/` directory
- Create `SearchResults.tsx` placeholder component
  - Add placeholder grid layout
  - Display "Results coming soon - Supabase integration pending" message
  - Include sample layout structure (3 columns on desktop)
  - Add loading skeleton pattern (optional)
- Create `SearchResults.styles.ts` with grid styles
  - Implement responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
  - Add placeholder styling
- Create `index.ts` with export
- Add export to component library index

### 12. Build SearchMap Placeholder
- Create `app/split-lease/components/src/organisms/SearchMap/` directory
- Create `SearchMap.tsx` placeholder component
  - Add placeholder map container
  - Display "Map coming soon - Google Maps integration pending" message
  - Add fixed aspect ratio container (4:3 or similar)
  - Include mock map styling (gray background, borders)
- Create `SearchMap.styles.ts` with map container styles
  - Set fixed dimensions or responsive aspect ratio
  - Add placeholder styling to indicate map area
- Create `index.ts` with export
- Add export to component library index

### 13. Build Component Library
- Navigate to `app/split-lease/components/`
- Run `npm install` to ensure dependencies are installed
- Run `npm run build` to build UMD bundle
- Verify `dist/split-lease-components.umd.cjs` and `dist/style.css` are created
- Check for any TypeScript errors or build warnings
- Fix any issues that arise during build

### 14. Create Island Mounting Script
- Create `app/split-lease/pages/search/js/mount-filters.js`
- Write mounting logic for SearchFilters island:
  - Check if window.SplitLeaseComponents is available
  - Get mount point element by ID
  - Create root with ReactDOM.createRoot
  - Render SearchFilters component with initial props
  - Add error handling for missing dependencies
  - Add console logging for debugging
- Test mounting logic works correctly

### 15. Create Search Page Documentation
- Create `app/split-lease/pages/search/README.md`
- Document page structure and architecture
- List all components used on the page
- Describe island hydration process
- Document filter options and their sources
- Add notes about placeholder components
- Include build and deployment instructions
- Add future integration notes (Supabase, Google Maps)

### 16. Test Component Rendering
- Open `app/split-lease/pages/search/index.html` in browser
- Verify SearchFilters island mounts correctly
- Check that all filter components render
- Test that dropdowns open and close properly
- Verify SearchScheduleSelector displays days correctly
- Confirm placeholder components show expected messages
- Check console for any errors or warnings

### 17. Test Filter Interactions
- Test SearchScheduleSelector:
  - Click individual days to select/deselect
  - Drag across multiple days to select range
  - Verify check-in/check-out display updates
  - Test validation messages appear correctly
- Test BoroughSelector: change selection between boroughs
- Test WeekPatternSelector: change between week patterns
- Test PriceTierSelector: change between price ranges
- Test SortBySelector: change sort options
- Test NeighborhoodSearch: type in search input (UI only)
- Verify all onChange handlers fire correctly (console.log for debugging)

### 18. Test Responsive Behavior
- Test on desktop viewport (1920x1080)
  - Verify 3-column layout (filters, results, map)
  - Check filter sidebar width and spacing
  - Confirm all components render properly
- Test on tablet viewport (768x1024)
  - Verify layout adapts (2-column or stacked)
  - Check filter component sizes
  - Confirm touch interactions work
- Test on mobile viewport (375x667)
  - Verify single column stacked layout
  - Check filter components are usable
  - Confirm text is readable
  - Test dropdowns work on mobile

### 19. Compare with Original Using Playwright
- Use Playwright to navigate to https://app.split.lease/search
- Take screenshot of original filter section
- Navigate to new search page
- Take screenshot of new filter section
- Compare screenshots side-by-side
- Document visual differences
- Identify areas needing refinement

### 20. First Refinement Pass
- Based on Playwright comparison, adjust:
  - Filter component sizes and spacing
  - Typography (font sizes, weights, line heights)
  - Colors and borders
  - Dropdown styling and icons
  - SearchScheduleSelector day button sizes and colors
  - Overall layout proportions
- Rebuild component library if needed
- Re-test in browser

### 21. Second Playwright Comparison
- Take fresh screenshots of both pages
- Compare filter sections again
- Verify refinements match original more closely
- Check specific details:
  - Day selector button styling
  - Dropdown arrow icons
  - Label text formatting
  - Spacing between elements
  - Selected state styling
- Document remaining differences

### 22. Final Refinement Pass
- Make final adjustments based on second comparison
- Polish any remaining visual inconsistencies
- Ensure all interactive states work (hover, focus, active)
- Verify accessibility features (keyboard navigation, ARIA labels)
- Test performance (component load times, interaction responsiveness)
- Clean up any debug console logs
- Rebuild component library for production

### 23. Documentation and Code Review
- Update component JSDoc comments
- Ensure all TypeScript types are properly documented
- Review code for consistency with project patterns
- Check for any hard-coded values that should be configurable
- Verify all imports and exports are correct
- Update search page README with final implementation notes
- Add TODO comments for future Supabase and Google Maps integration

### 24. Final Testing Suite
- Run through complete test checklist:
  - All filter components render correctly
  - All interactions work as expected
  - Responsive design works on all viewports
  - No console errors or warnings
  - TypeScript compiles without errors
  - Component bundle builds successfully
  - Page loads quickly and smoothly
  - Accessibility features work (keyboard nav, screen readers)
  - Visual design matches original search page filters

## Testing Strategy

### Unit Tests
Each filter component should have unit tests covering:
- Component renders without crashing
- Props are properly typed and validated
- onChange callbacks fire with correct values
- Selected state displays correctly
- Default values are set properly
- Dropdown options render correctly
- Validation logic works (for SearchScheduleSelector)

SearchScheduleSelector specific tests:
- Individual day selection toggles correctly
- Drag selection selects range of days
- Validation enforces min/max days
- Contiguous day requirement works
- Error messages display correctly
- Check-in/check-out display updates

SearchFilters organism tests:
- All child components render
- State updates propagate correctly
- Listings counter updates
- Filter changes trigger callbacks

### Edge Cases
- SearchScheduleSelector:
  - Selecting fewer than minDays (should show error)
  - Selecting more than maxDays (should prevent)
  - Selecting non-contiguous days when required (should show error)
  - Dragging backwards across days
  - Rapid clicking/dragging
- Dropdowns:
  - Empty selection handling
  - Long option text overflow
  - Keyboard navigation (arrow keys, Enter, Escape)
- NeighborhoodSearch:
  - Empty search results
  - Special characters in search
  - Case-insensitive search
- Responsive:
  - Very narrow viewports (< 320px)
  - Very wide viewports (> 2560px)
  - Landscape mobile orientation

### Integration Tests
- Island hydration works correctly on page load
- Multiple islands can coexist on same page
- Component bundle loads without errors
- Style injection works correctly
- React/ReactDOM from CDN loads properly
- Mount script handles missing elements gracefully

### Visual Regression Tests
- Screenshot comparison with original search page
- Filter section layout matches original
- Day selector styling matches original
- Dropdown styling matches original
- Responsive breakpoints match expectations
- Interactive states (hover, focus, active) match design

### Accessibility Tests
- All interactive elements are keyboard accessible
- Dropdowns can be navigated with arrow keys
- Day selector can be navigated with arrow keys
- Screen reader announces selections correctly
- Color contrast meets WCAG 2.1 AA standards
- Focus indicators are visible
- ARIA labels are present and accurate

## Acceptance Criteria

1. **Search Page Structure**
   - Static HTML page exists at `app/split-lease/pages/search/index.html`
   - Page has 3-section layout: filters (left), results (center), map (right)
   - Page is responsive with appropriate breakpoints
   - All HTML is semantic and accessible

2. **SearchScheduleSelector Component**
   - Component renders 7 day buttons (S M T W T F S)
   - Days can be selected/deselected by clicking
   - Days can be selected by dragging
   - Selected days show visual indication (blue background)
   - Check-in and Check-out display updates based on selection
   - Validation enforces 2-5 contiguous days by default
   - Error messages display for invalid selections
   - Component is fully typed with TypeScript
   - Component matches visual design from original page

3. **Filter Components**
   - BoroughSelector dropdown with 7 boroughs
   - WeekPatternSelector dropdown with 4 patterns
   - PriceTierSelector dropdown with 5 price ranges
   - SortBySelector dropdown with 4 sort options
   - NeighborhoodSearch with search input
   - All components are controlled components with onChange callbacks
   - All components have proper TypeScript types
   - All components match visual design from original page

4. **SearchFilters Organism**
   - Composes all filter components in sidebar layout
   - Manages state for all filter values
   - Displays "X listings found" counter
   - Includes section labels for each filter
   - Proper spacing and visual hierarchy
   - Responsive layout works on all viewports

5. **Placeholder Components**
   - SearchResults placeholder with "coming soon" message
   - SearchMap placeholder with "coming soon" message
   - Both placeholders have appropriate styling
   - Clear indication of future integration points

6. **Component Library Build**
   - All components export from `src/index.ts`
   - TypeScript compiles without errors
   - Vite builds UMD bundle successfully
   - Bundle size is reasonable (< 250KB)
   - Styles are included in bundle

7. **Island Hydration**
   - SearchFilters island mounts on page load
   - Mount script handles errors gracefully
   - React/ReactDOM load from CDN correctly
   - Component bundle loads and initializes
   - No console errors on page load

8. **Visual Accuracy**
   - Filter section matches original design (validated via Playwright screenshots)
   - Day selector styling matches original
   - Dropdown styling matches original
   - Spacing and proportions match original
   - Colors and typography match original
   - Interactive states (hover, focus) work correctly

9. **Interactions**
   - All day selections work correctly
   - All dropdowns open and close properly
   - All selections update component state
   - onChange callbacks fire with correct values
   - Validation messages appear as expected
   - Keyboard navigation works throughout

10. **Responsive Design**
    - Desktop: 3-column layout with proper proportions
    - Tablet: 2-column or stacked layout
    - Mobile: Single column stacked layout
    - All components are usable at all viewport sizes
    - Touch interactions work on mobile/tablet

11. **Documentation**
    - Search page README documents structure and architecture
    - All components have JSDoc comments
    - TypeScript types are self-documenting
    - Build process is documented
    - Future integration points are noted

12. **Code Quality**
    - Follows existing project patterns and conventions
    - TypeScript strict mode enabled
    - No hard-coded values where configuration is appropriate
    - Consistent naming conventions
    - Clean, readable code structure

## Validation Commands

Execute these commands to validate the feature is complete:

### Build Validation
```bash
# Build component library
cd app/split-lease/components
npm install
npm run build
```
Expected: Build completes successfully with no errors, UMD bundle created in `dist/`

### TypeScript Validation
```bash
# Type check components
cd app/split-lease/components
npm run typecheck
```
Expected: No TypeScript errors reported

### File Structure Validation
```bash
# Verify all required files exist
ls app/split-lease/pages/search/index.html
ls app/split-lease/pages/search/css/search.css
ls app/split-lease/pages/search/js/mount-filters.js
ls app/split-lease/pages/search/README.md

# Verify component directories exist
ls -d app/split-lease/components/src/SearchScheduleSelector
ls -d app/split-lease/components/src/molecules/BoroughSelector
ls -d app/split-lease/components/src/molecules/WeekPatternSelector
ls -d app/split-lease/components/src/molecules/PriceTierSelector
ls -d app/split-lease/components/src/molecules/SortBySelector
ls -d app/split-lease/components/src/molecules/NeighborhoodSearch
ls -d app/split-lease/components/src/organisms/SearchFilters
ls -d app/split-lease/components/src/organisms/SearchResults
ls -d app/split-lease/components/src/organisms/SearchMap
```
Expected: All files and directories exist

### Component Export Validation
```bash
# Check that components are exported
grep -q "SearchScheduleSelector" app/split-lease/components/src/index.ts
grep -q "BoroughSelector" app/split-lease/components/src/index.ts
grep -q "SearchFilters" app/split-lease/components/src/index.ts
```
Expected: All exports found

### Manual Browser Testing
1. Open `app/split-lease/pages/search/index.html` in Chrome/Firefox/Safari
2. Open browser DevTools Console (should show no errors)
3. Verify SearchFilters island has mounted (check for "Mounted SearchFilters" console log if added)
4. Test SearchScheduleSelector:
   - Click days to select/deselect
   - Drag across multiple days
   - Verify check-in/check-out updates
   - Test validation by selecting 1 day or 6+ days
5. Test all dropdown filters (Borough, Week Pattern, Price Tier, Sort By)
6. Test responsive design at 375px, 768px, 1920px widths
7. Test keyboard navigation (Tab through all interactive elements)

Expected: All interactions work smoothly with no errors

### Visual Comparison with Playwright
```bash
# Take screenshots of both pages for comparison
# (Requires Playwright to be set up - use MCP playwright tool)
```
1. Navigate to https://app.split.lease/search
2. Take screenshot of filter section
3. Navigate to local search page
4. Take screenshot of filter section
5. Compare images side-by-side

Expected: Filter sections should look visually similar (colors, spacing, layout, typography)

## Notes

### External Repository Integration
The SearchScheduleSelector component is based on https://github.com/splitleasesharath/search-schedule-selector.git. This repository should be cloned and studied during Phase 2 to understand:
- Component structure and organization
- State management patterns
- Validation logic
- Styling approach with styled-components
- Animation implementation with Framer Motion

The component should be rebuilt (not directly imported) to ensure it fits the Islands Architecture and project conventions.

### Filter Logic - Not Implemented Yet
The filter analysis report (SEARCH_FILTER_ANALYSIS_REPORT.md) documents complex workflows that occur on the original Bubble page when filters change. These workflows include:
- Map recentering on borough change
- User preference persistence
- URL parameter updates
- Alert/toast notifications
- Search result re-fetching

**For this skeletal implementation, we are NOT implementing these workflows.** The focus is purely on:
- Visual UI matching the original
- Component structure and organization
- State management within components
- Interactive behaviors (selections, typing)

The backend logic will be implemented in a future phase when Supabase integration is added.

### Future Integration Points

**Supabase Database Integration:**
- Connect filter selections to database queries
- Fetch real listing data based on filters
- Implement search result pagination
- Add user preference persistence
- Store search history/saved searches

**Google Maps Integration:**
- Replace SearchMap placeholder with real Google Maps instance
- Add markers for listing locations
- Implement map clustering for dense areas
- Add map controls (zoom, pan, etc.)
- Sync map view with filter selections
- Implement click-to-view-listing on map markers

**Additional Enhancements:**
- URL parameter synchronization for shareable search links
- Filter change animations and transitions
- Advanced filters (amenities, house rules, parking, storage)
- Filter presets ("Weekend Getaway", "Weeknight Work", etc.)
- Save search functionality
- Weekly alert signup
- Results sorting and pagination
- Listing comparison feature

### Design System Considerations
This implementation should follow the existing design patterns from the home page:
- Consistent typography (font families, sizes, weights)
- Color palette (primary blues, grays, whites)
- Component spacing (margins, padding)
- Interactive states (hover, focus, active, disabled)
- Animation timing and easing
- Responsive breakpoints
- Accessibility standards

### Performance Considerations
- Component bundle should be < 250KB after gzip
- Islands should hydrate quickly (< 100ms on fast connection)
- No layout shift during island hydration
- Smooth 60fps animations for day selector
- Dropdown interactions should feel instant (< 16ms)
- Lazy load results and map sections if possible

### Browser Support
Target the same browsers as the home page:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

### Dependencies to Add
If not already present, the following may need to be added to `components/package.json`:
```bash
# Core dependencies
npm install react react-dom
npm install styled-components
npm install framer-motion

# Development dependencies
npm install -D @types/react @types/react-dom
npm install -D @types/styled-components
npm install -D typescript
npm install -D vite
```

### Styling Approach
Use styled-components for all component styling to:
- Encapsulate styles with components
- Support dynamic styling based on props
- Enable theme customization
- Avoid global CSS conflicts
- Leverage TypeScript for type-safe styling

Base CSS in `search.css` should only include:
- Page layout (grid structure)
- Reset/normalize styles
- Utility classes (if needed)
- Non-component-specific styles

### State Management
For this skeletal phase, use React's built-in state management (useState):
- SearchFilters organism holds state for all filters
- Child components receive state and callbacks as props
- No need for complex state management (Redux, Zustand, etc.)
- URL parameters can be added later for deep linking

When Supabase is integrated, consider:
- React Query for server state management
- URL parameters for shareable state
- Local storage for user preferences
- Debouncing filter changes to reduce API calls
