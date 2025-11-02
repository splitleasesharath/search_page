# Feature: Skeletal Search Page with Filter Section

## Metadata
adw_id: `04def9d6`
prompt: `Build out a skeletal search page following ESM + React islands Structure. Create the search page with focus on the Filter section (Search Schedule Selector, Borough filter, Week Pattern filter, Price Tier filter, Sort By filter, and Neighborhood refinement). The Search Schedule Selector should be adapted from https://github.com/splitleasesharath/search-schedule-selector.git to fit the React island structure. Build skeletal structures for Google Maps and search results grid (without functionality). Compare with live page at https://app.split.lease/search to ensure visual accuracy.`

## Feature Description
Create a skeletal search page for the Split Lease marketplace following the Islands Architecture pattern. The page will feature:
- Static HTML structure with mount points for React component islands
- Fully functional filter sidebar with Search Schedule Selector, Borough, Week Pattern, Price Tier, Sort By, and Neighborhood refinement filters
- Empty skeletal placeholders for Google Maps integration and search results grid
- Component structure adapted from the existing search-schedule-selector repository
- Visual design matching the original Bubble.io page at app.split.lease/search

The focus is on building out the complete filter section as a functional React island, while leaving the map and results sections as empty skeletal structures to be implemented later with Supabase and Google Maps integration.

## User Story
As a **guest user searching for rental properties**
I want to **filter listings by location, schedule, price, and other criteria**
So that **I can find properties that match my specific needs and schedule preferences**

## Problem Statement
The current Split Lease search page is built on Bubble.io (no-code platform), which limits customization, performance, and scalability. The search functionality needs to be rebuilt in code using a modern React architecture while maintaining the existing user experience. The filter section is the most critical component for users to narrow down their search results, but the backend integration with Supabase and Google Maps requires additional context that will be provided later.

## Solution Statement
Build a skeletal search page using the Islands Architecture pattern where:
1. **Static HTML** provides the page structure and SEO benefits
2. **React Islands** provide interactive filter functionality
3. **Filter Section** is fully functional with all dropdowns and the Search Schedule Selector working
4. **Map and Results** are skeletal placeholders ready for future implementation
5. **Component Library** is extended with new filter components following atomic design principles
6. **Search Schedule Selector** is adapted from the existing repository to fit the ESM + React island structure

This approach allows for progressive enhancement, where the filter UI works immediately while backend integration can be added incrementally.

## Relevant Files

### Existing Files to Reference

- **README.md** - Project overview and Islands Architecture documentation
- **app/split-lease/components/src/index.ts** - Component library barrel exports
- **app/split-lease/components/src/Footer/Footer.tsx** - Example organism component
- **app/split-lease/components/src/Header/Header.tsx** - Example header component
- **app/split-lease/pages/home/README.md** - Homepage Islands Architecture implementation guide
- **app/split-lease/components/package.json** - Component library dependencies
- **app/split-lease/components/vite.config.ts** - Vite build configuration for UMD bundles
- **app/split-lease/components/tsconfig.json** - TypeScript configuration

### External Repository to Adapt

- **https://github.com/splitleasesharath/search-schedule-selector** - Source for the Search Schedule Selector component that needs to be adapted for the islands structure

### Context Files (Local)

- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md** - Complete list of data types for the search page
- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md** - Complete specification of filter options (Days, Price Tiers, Sort By, Weekly Selection)
- **C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\New\SEARCH_FILTER_ANALYSIS_REPORT.md** - Comprehensive workflow analysis of filter logic from live page
- **C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png** - Desktop screenshot showing filter section (orange rectangle) and Search Schedule Selector (green rectangle)

### New Files

#### Components
- **app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.tsx** - Main schedule selector component (adapted from external repo)
- **app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.styles.ts** - Styled components for schedule selector
- **app/split-lease/components/src/SearchScheduleSelector/types.ts** - TypeScript types for schedule selector
- **app/split-lease/components/src/SearchScheduleSelector/index.ts** - Barrel export
- **app/split-lease/components/src/atoms/Dropdown/Dropdown.tsx** - Reusable dropdown component
- **app/split-lease/components/src/atoms/Dropdown/Dropdown.styles.ts** - Dropdown styles
- **app/split-lease/components/src/atoms/Dropdown/types.ts** - Dropdown types
- **app/split-lease/components/src/atoms/Dropdown/index.ts** - Barrel export
- **app/split-lease/components/src/atoms/TextInput/TextInput.tsx** - Text input for neighborhood refinement
- **app/split-lease/components/src/atoms/TextInput/TextInput.styles.ts** - Text input styles
- **app/split-lease/components/src/atoms/TextInput/types.ts** - Text input types
- **app/split-lease/components/src/atoms/TextInput/index.ts** - Barrel export
- **app/split-lease/components/src/organisms/SearchFilters/SearchFilters.tsx** - Main filter sidebar organism
- **app/split-lease/components/src/organisms/SearchFilters/SearchFilters.styles.ts** - Filter sidebar styles
- **app/split-lease/components/src/organisms/SearchFilters/types.ts** - Filter types
- **app/split-lease/components/src/organisms/SearchFilters/index.ts** - Barrel export

#### Pages
- **app/split-lease/pages/search/index.html** - Static HTML page with island mount points
- **app/split-lease/pages/search/css/search.css** - Page-specific styles
- **app/split-lease/pages/search/js/** - Directory for island bundles (generated by build)

#### Tests
- **app/split-lease/components/src/SearchScheduleSelector/SearchScheduleSelector.test.tsx** - Unit tests for schedule selector
- **app/split-lease/components/src/atoms/Dropdown/Dropdown.test.tsx** - Unit tests for dropdown
- **app/split-lease/components/src/organisms/SearchFilters/SearchFilters.test.tsx** - Unit tests for filter sidebar

## Implementation Plan

### Phase 1: Foundation (Component Library Setup)
Set up the component library infrastructure and adapt the Search Schedule Selector from the external repository to fit the islands structure. This phase focuses on creating reusable atomic components and adapting the existing schedule selector.

**Key Activities:**
- Clone and analyze the search-schedule-selector repository
- Adapt the SearchScheduleSelector component for the islands structure
- Create reusable atomic components (Dropdown, TextInput)
- Set up proper TypeScript types and exports

### Phase 2: Core Implementation (Filter Components)
Build out all filter components and assemble them into the SearchFilters organism. This phase focuses on creating the interactive filter sidebar with all dropdowns and controls working properly.

**Key Activities:**
- Build the SearchFilters organism component
- Integrate all filter controls (Borough, Week Pattern, Price Tier, Sort By, Neighborhood)
- Implement proper state management for filter values
- Add validation and error handling

### Phase 3: Integration (Page Assembly)
Create the static HTML page and mount the React islands. Build skeletal placeholders for the map and results sections. Ensure the page matches the visual design of the original Bubble.io page.

**Key Activities:**
- Create the search page HTML structure
- Add mount points for React islands
- Create skeletal map and results placeholders
- Style the page to match the original design
- Build the component library and verify UMD bundle creation
- Test the page in browser with multiple passes to compare with original

## Step by Step Tasks

### 1. Set Up Search Schedule Selector Component
- Copy SearchScheduleSelector files from cloned repository to `app/split-lease/components/src/SearchScheduleSelector/`
- Adapt the component to remove any standalone build artifacts (vite.config.ts, package.json, etc.)
- Update imports to use relative paths for styled-components and framer-motion
- Ensure types.ts, SearchScheduleSelector.tsx, SearchScheduleSelector.styles.ts are properly organized
- Create index.ts barrel export following existing patterns
- Update component to accept island-friendly props (onSelectionChange callback)
- Add JSDoc documentation to all exported functions and components

### 2. Create Atomic Dropdown Component
- Create `app/split-lease/components/src/atoms/Dropdown/` directory
- Build Dropdown.tsx with support for option sets (Borough, Week Pattern, Price Tier, Sort By)
- Implement Dropdown.styles.ts with styled-components matching original page design
- Create types.ts with DropdownProps interface (options, value, onChange, placeholder, label)
- Add Dropdown.test.tsx with basic rendering and interaction tests
- Create index.ts barrel export
- Export from main components index.ts

### 3. Create Atomic TextInput Component
- Create `app/split-lease/components/src/atoms/TextInput/` directory
- Build TextInput.tsx for neighborhood refinement search
- Implement TextInput.styles.ts with styled-components
- Create types.ts with TextInputProps interface
- Add TextInput.test.tsx
- Create index.ts barrel export
- Export from main components index.ts

### 4. Build SearchFilters Organism Component
- Create `app/split-lease/components/src/organisms/SearchFilters/` directory
- Build SearchFilters.tsx that composes:
  - SearchScheduleSelector (from step 1)
  - Borough Dropdown (from step 2)
  - Week Pattern Dropdown (from step 2)
  - Price Tier Dropdown (from step 2)
  - Sort By Dropdown (from step 2)
  - Neighborhood TextInput (from step 3)
- Implement SearchFilters.styles.ts with layout matching original page (vertical sidebar)
- Create types.ts with SearchFiltersProps interface including all filter callbacks
- Add proper TypeScript types for option sets from context files
- Create index.ts barrel export
- Export from main components index.ts
- Add SearchFilters.test.tsx with integration tests

### 5. Create Static Search Page HTML
- Create `app/split-lease/pages/search/index.html`
- Include semantic HTML structure with proper meta tags and title
- Add Header component mount point (reuse existing Header)
- Add SearchFilters island mount point with id="search-filters"
- Create skeletal map section with placeholder div and id="search-map"
- Create skeletal results section with placeholder div and id="search-results"
- Add Footer component mount point (reuse existing Footer)
- Include React CDN links (React 18 UMD)
- Include ReactDOM CDN links
- Add link to component bundle: `../components/dist/split-lease-components.umd.cjs`
- Add link to page-specific CSS

### 6. Create Search Page Styles
- Create `app/split-lease/pages/search/css/search.css`
- Style the page layout (2-column grid: filters sidebar + main content area)
- Style skeletal map placeholder (fixed height, border, background color, "Map Coming Soon" text)
- Style skeletal results placeholder (grid layout, "Results Coming Soon" text)
- Ensure responsive design for mobile/tablet/desktop
- Match colors, fonts, and spacing from original page screenshot
- Add loading states and transitions

### 7. Mount React Islands in HTML
- Add script section to index.html to mount Header island
- Add script section to mount SearchFilters island with proper props
- Add script section to mount Footer island
- Pass default filter values from option sets as props
- Implement island hydration logic (document.readyState check)
- Add error boundaries for island mounting failures
- Add console logging for debugging island mounting

### 8. Build Component Library
- Run `npm run build` in components directory
- Verify UMD bundle creation in `components/dist/split-lease-components.umd.cjs`
- Verify style.css generation
- Check that all new components are exported in bundle
- Test bundle can be loaded in browser
- Fix any build errors or warnings

### 9. Test Page in Browser (First Pass)
- Open `app/split-lease/pages/search/index.html` in browser
- Verify Header renders correctly
- Verify SearchFilters sidebar renders with all dropdowns
- Verify SearchScheduleSelector renders and is interactive
- Test all dropdown interactions (Borough, Week Pattern, Price Tier, Sort By)
- Test neighborhood text input
- Verify skeletal map and results placeholders display
- Verify Footer renders correctly
- Take screenshots for comparison

### 10. Access Live Page (First Pass)
- Navigate to https://app.split.lease/search using Playwright
- Take full page screenshot
- Take screenshot of filter section specifically
- Document any visual differences from new implementation
- Note any missing UI elements or styling issues

### 11. Iterate and Fix Visual Differences
- Compare screenshots from steps 9 and 10
- Update SearchFilters.styles.ts to match original design
- Update search.css to match original layout
- Adjust dropdown styling to match original
- Adjust SearchScheduleSelector styling if needed
- Fix any spacing, color, or font differences
- Rebuild components and refresh browser

### 12. Test Page in Browser (Second Pass)
- Open page in browser again after fixes
- Verify all visual changes were applied correctly
- Test all interactions again
- Verify mobile responsive design
- Take final screenshots
- Document any remaining differences

### 13. Access Live Page (Second Pass)
- Navigate to https://app.split.lease/search using Playwright again
- Take another full page screenshot for final comparison
- Verify the new implementation matches the original
- Document completion of visual parity

### 14. Add Option Set Data as Constants
- Create `app/split-lease/components/src/SearchScheduleSelector/constants.ts`
- Add DAYS_OF_WEEK constant (already exists in SearchScheduleSelector.tsx)
- Create `app/split-lease/components/src/organisms/SearchFilters/constants.ts`
- Add BOROUGH_OPTIONS based on Search Page Option Sets.md
- Add WEEKLY_PATTERN_OPTIONS based on Search Page Option Sets.md
- Add PRICE_TIER_OPTIONS based on Search Page Option Sets.md
- Add SORT_BY_OPTIONS based on Search Page Option Sets.md
- Export constants and use in SearchFilters component

### 15. Add Placeholder Props and Callbacks
- Update SearchFilters to accept onFilterChange callback
- Update SearchScheduleSelector to call parent callback on selection change
- Add console.log statements in callbacks to demonstrate interactivity
- Document that actual filtering logic will be implemented with Supabase integration
- Add TODO comments for future backend integration points

### 16. Write Component Documentation
- Add JSDoc comments to all components with usage examples
- Update main README.md with search page information
- Create `app/split-lease/pages/search/README.md` documenting the page structure
- Document the island mounting process
- Document the filter state management approach
- Add notes about future Supabase and Google Maps integration

### 17. Create Component Tests
- Write unit tests for SearchScheduleSelector (adapt from original repo if available)
- Write unit tests for Dropdown component
- Write unit tests for TextInput component
- Write integration tests for SearchFilters organism
- Ensure all tests pass with `npm run test` in components directory
- Aim for >80% code coverage on new components

## Testing Strategy

### Unit Tests
- **SearchScheduleSelector Component**
  - Day selection via click
  - Day selection via drag
  - Validation rules (2-5 days, contiguous)
  - Error popup display
  - Reset functionality
  - Callback invocation on selection change

- **Dropdown Component**
  - Renders with options
  - Displays selected value
  - Calls onChange when selection changes
  - Handles empty options array
  - Displays placeholder when no selection

- **TextInput Component**
  - Renders with label
  - Displays value
  - Calls onChange on input
  - Handles empty value

- **SearchFilters Organism**
  - Renders all child components
  - Passes props correctly to children
  - Manages filter state
  - Calls callbacks on filter changes

### Integration Tests
- **Filter Interaction Flow**
  - Selecting borough updates filter state
  - Selecting week pattern updates filter state
  - Selecting price tier updates filter state
  - Selecting sort by updates filter state
  - Typing in neighborhood input updates filter state
  - Multiple filter changes maintain independent state

### Browser Testing
- **Visual Regression**
  - Compare screenshots with original page
  - Verify layout matches on desktop (1920x1080)
  - Verify layout matches on tablet (768x1024)
  - Verify layout matches on mobile (375x667)

- **Interaction Testing**
  - All dropdowns open and close properly
  - Search Schedule Selector day selection works
  - Neighborhood input accepts text
  - Skeletal placeholders display correctly

### Edge Cases
- **Empty States**
  - No filters selected shows default state
  - Empty neighborhood search input

- **Browser Compatibility**
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest)
  - Edge (latest)

- **Accessibility**
  - Keyboard navigation through all filters
  - Screen reader compatibility
  - ARIA labels on interactive elements
  - Focus indicators visible

## Acceptance Criteria

### Functional Requirements
- [ ] Search page loads successfully at `app/split-lease/pages/search/index.html`
- [ ] Header component renders at top of page
- [ ] Footer component renders at bottom of page
- [ ] SearchFilters sidebar renders on left side of page
- [ ] Search Schedule Selector displays 7 day cells (S M T W T F S)
- [ ] Day cells are clickable and toggle selection
- [ ] Day cells support drag selection
- [ ] Schedule selector validates 2-5 contiguous days
- [ ] Schedule selector shows error popup for invalid selections
- [ ] Borough dropdown displays with options: Manhattan, Brooklyn, Bronx, Queens, Bergen County NJ, Essex County NJ, Hudson County NJ
- [ ] Week Pattern dropdown displays with options: Every week, One week on/one week off, Two weeks on/two weeks off, One week on/three weeks off
- [ ] Price Tier dropdown displays with options: < $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices
- [ ] Sort By dropdown displays with options: Our Recommendations, Price-Lowest to Highest, Most Viewed, Recently Added
- [ ] Neighborhood text input accepts user input
- [ ] All dropdowns can be opened and closed
- [ ] All filter changes trigger appropriate callbacks (logged to console)
- [ ] Skeletal map section displays with "Map Coming Soon" placeholder
- [ ] Skeletal results section displays with "Results Coming Soon" placeholder

### Visual Requirements
- [ ] Page layout matches original design from screenshot
- [ ] Filter sidebar width and height match original
- [ ] Filter spacing and padding match original
- [ ] Dropdown styling (borders, colors, fonts) matches original
- [ ] Search Schedule Selector styling matches green rectangle from screenshot
- [ ] Skeletal placeholders have appropriate borders and backgrounds
- [ ] Page is responsive on mobile, tablet, and desktop
- [ ] All text is readable and properly sized
- [ ] Colors match original page color scheme

### Technical Requirements
- [ ] Component library builds successfully without errors
- [ ] UMD bundle is generated in `components/dist/`
- [ ] All components are exported from `components/src/index.ts`
- [ ] All TypeScript files compile without errors
- [ ] Page uses Islands Architecture with proper mount points
- [ ] React islands hydrate successfully on page load
- [ ] No console errors when page loads
- [ ] Components follow atomic design principles
- [ ] All components have TypeScript types
- [ ] All components have JSDoc documentation

### Testing Requirements
- [ ] Unit tests pass for all components
- [ ] Integration tests pass for SearchFilters organism
- [ ] Test coverage is >80% for new components
- [ ] Browser testing confirms visual parity with original
- [ ] Playwright automation accesses live page successfully (2+ times)
- [ ] Screenshots confirm matching design

### Documentation Requirements
- [ ] Search page README.md created with implementation details
- [ ] Component JSDoc comments added
- [ ] Main README.md updated with search page information
- [ ] Filter state management documented
- [ ] Future integration points documented (Supabase, Google Maps)

## Validation Commands

Execute these commands to validate the feature is complete:

### Build Commands
```bash
# Navigate to components directory
cd app/split-lease/components

# Install dependencies (if not already done)
npm install

# Build component library
npm run build

# Verify UMD bundle exists
ls -la dist/split-lease-components.umd.cjs

# Verify styles exist
ls -la dist/style.css
```

### Test Commands
```bash
# Run unit tests
cd app/split-lease/components
npm run test

# Run type checking
npm run typecheck

# Check for linting errors
npm run lint
```

### Browser Validation
```bash
# Open the page in browser (Windows)
start app/split-lease/pages/search/index.html

# Or use Python HTTP server for proper CORS handling
cd app/split-lease/pages
python -m http.server 8000
# Then open http://localhost:8000/search/index.html
```

### File Existence Validation
```bash
# Verify all new component files exist
ls app/split-lease/components/src/SearchScheduleSelector/
ls app/split-lease/components/src/atoms/Dropdown/
ls app/split-lease/components/src/atoms/TextInput/
ls app/split-lease/components/src/organisms/SearchFilters/

# Verify page files exist
ls app/split-lease/pages/search/index.html
ls app/split-lease/pages/search/css/search.css

# Verify component exports
cat app/split-lease/components/src/index.ts | grep -E "(SearchScheduleSelector|Dropdown|TextInput|SearchFilters)"
```

### Playwright Validation (Automated Comparison)
```bash
# Using Playwright MCP to access live page
# This will be done during implementation (steps 10 and 13)
# Should capture screenshots and compare with new implementation
```

## Notes

### Search Schedule Selector Adaptation
The Search Schedule Selector from https://github.com/splitleasesharath/search-schedule-selector.git needs to be adapted to fit the islands structure:
- Remove standalone build configuration (vite.config.ts, package.json)
- Ensure it's exported as a pure React component for inclusion in the UMD bundle
- Keep all existing functionality (click, drag, validation, error handling)
- Maintain the visual design with styled-components and Framer Motion
- The component already uses TypeScript and follows good practices

### Filter Option Sets
Based on the context files, the filter options are:
- **Borough**: Manhattan, Brooklyn, Bronx, Queens, Bergen County NJ, Essex County NJ, Hudson County NJ (from live page analysis)
- **Week Pattern**: Every week, One week on/one week off, Two weeks on/two weeks off, One week on/three weeks off
- **Price Tier**: < $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices
- **Sort By**: Our Recommendations, Price-Lowest to Highest, Most Viewed, Recently Added

### Future Integration Points
The following features require additional context and will be implemented in future phases:
- **Supabase Integration**: Filter logic that queries the database based on selected filters
- **Google Maps Integration**: Interactive map showing listing locations
- **Search Results Grid**: Dynamic listing cards populated from database
- **URL Parameter State Management**: Persist filter state in URL for sharing and bookmarking
- **Neighborhood Suggestions**: Autocomplete for neighborhood input based on borough selection

### Dependencies to Install
The following dependencies are already in the component library and will be used:
- `react` (^18.0.0) - Already installed
- `react-dom` (^18.0.0) - Already installed
- `styled-components` (^6.0.0) - Already installed
- `framer-motion` (^11.0.0) - Already installed
- `typescript` (^5.0.0) - Already installed

No additional dependencies need to be added for this skeletal implementation.

### Comparison Process
The implementation requires multiple passes comparing with the live page:
1. **First Pass**: Build initial implementation based on screenshot and context files
2. **First Comparison**: Use Playwright to access live page and take screenshots
3. **Iteration**: Fix any visual differences identified
4. **Second Pass**: Rebuild and retest in browser
5. **Second Comparison**: Use Playwright again to verify final visual parity

### Islands Architecture Benefits for This Feature
- **Progressive Enhancement**: Filter UI works immediately without backend
- **Performance**: Only the filter section loads JavaScript
- **SEO**: Static HTML content is immediately available to search engines
- **Flexibility**: Easy to add backend integration later without changing UI
- **Maintainability**: Components are reusable and testable independently

### Testing with Real Data
For the skeletal implementation, use mock data for the listing count in SearchScheduleSelector:
- The component already has placeholder logic for "exact matches" and "partial matches"
- This will be replaced with actual Supabase queries in the next phase
- For now, the counts can remain as random placeholders or be set to 0

### Mobile Responsive Considerations
Based on the original page analysis:
- Filter sidebar should collapse to top section on mobile
- Dropdowns should be mobile-friendly with proper touch targets
- Search Schedule Selector should adapt to smaller screens
- Map and results should stack vertically on mobile
