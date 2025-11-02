# Feature: Build ESM + React Island + HTML Search Page

## Metadata
adw_id: `11`
prompt: `Build in ESM + React Island + HTML format, this search page. Create in the app directory, a search page (rebuild using reference from https://github.com/splitleasesharath/search_lite.git). This needs to follow the ESM + React islands Structure with an HTML page. Split Lease is a marketplace for listings for guests looking for repeat rentals. We're rebuilding the search page from scratch with code (the original was built on Bubble). Reference the original at https://app.split.lease/search.`

## Feature Description
Build a complete rental property search page for Split Lease using Islands Architecture - a modern web architecture pattern that combines static HTML with interactive React component "islands". The page will allow guests to search for rental properties by schedule (specific days of the week), price range, location (boroughs and neighborhoods in NYC), property features, and amenities. The search functionality is unique because it matches based on weekly rental patterns (e.g., weeknights only, weekends only, every week, one week on/one week off).

The implementation must closely replicate the visual design and functionality of the original Bubble-built page at https://app.split.lease/search while following modern web development best practices and the established ESM + React Island architecture pattern.

## User Story
As a guest looking for a rental property
I want to search and filter listings based on my specific weekly schedule, budget, location preferences, and property requirements
So that I can find properties that match my unique rental needs (e.g., weeknight-only rentals near work) and book recurring stays

## Problem Statement
Split Lease offers a unique marketplace for split-week rentals where guests can rent properties for specific days of the week on a recurring basis. The current search page was built on Bubble (a no-code platform), which has limitations in performance, customization, and maintainability. The business needs a performant, maintainable, and scalable search experience built with modern web technologies that:

1. Provides fast initial page load with static HTML
2. Enhances with interactive React components only where needed
3. Handles complex schedule-based filtering (day-of-week patterns)
4. Integrates with Google Maps for location visualization
5. Connects to Supabase backend for real-time listing data
6. Maintains visual consistency with the original design
7. Supports responsive design for mobile and desktop

## Solution Statement
We will implement a search page using Islands Architecture, where:

1. **Static HTML Foundation**: The base page structure, header, footer, and SEO content will be static HTML for fast initial load and optimal SEO
2. **React Component Islands**: Interactive components (schedule selector, filters, listing cards, map) will be built as React components bundled as ESM/UMD modules
3. **Progressive Enhancement**: The page works with basic functionality in static HTML and enhances with JavaScript
4. **Component Library**: All React components will be built in a shared library (`app/split-lease/components/`) and bundled with Vite
5. **API Integration**: Components will fetch data from Supabase via a clean API client layer
6. **Modern Tooling**: TypeScript for type safety, Styled Components for styling, Framer Motion for animations

The architecture follows the established pattern in the project README, ensuring consistency and maintainability.

## Relevant Files

### Existing Context Files
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Data Types.md` - Complete list of 23 data types used including Listing, User, Location, Features, and Option Sets
- `C:\Users\igor\My Drive (splitleaseteam@gmail.com)\!Agent Context and Tools\SL1\TAC\Context\Search\Search Page Option Sets.md` - Four critical option sets: Days, Filter-PriceOnSearch, SortByPropertiesSearch, Weekly Selection Options
- `C:\Users\igor\OneDrive\Pictures\Screenshots\Screenshot 2025-11-02 154712.png` - Desktop screenshot showing search filters and layout
- `README.md` - Project architecture documentation and setup instructions

### Reference Implementation
- https://github.com/splitleasesharath/search_lite.git - Visual reference (messy implementation)
- https://github.com/splitleasesharath/search-schedule-selector.git - Original Search Schedule Selector component (needs adaptation)
- https://app.split.lease/search - Live production page for functional reference

### Supabase Database Tables
- `listing` - Main listings table (106 columns including location, features, pricing, availability)
- `listing_photo` - Photos associated with listings
- `proposal` - Guest proposals for bookings
- `users` - User accounts

### New Files

#### Component Library (`app/split-lease/components/`)
- `src/SearchScheduleSelector/SearchScheduleSelector.tsx` - Week schedule selector with drag/click interactions
- `src/SearchScheduleSelector/SearchScheduleSelector.styles.ts` - Styled components for schedule selector
- `src/SearchScheduleSelector/types.ts` - TypeScript types
- `src/SearchScheduleSelector/index.ts` - Barrel export

- `src/FiltersPanel/FiltersPanel.tsx` - Main filters container
- `src/FiltersPanel/WeekPatternSelector.tsx` - Weekly pattern dropdown (Every week, 1 on/1 off, etc.)
- `src/FiltersPanel/PriceRangeSelector.tsx` - Price tier dropdown
- `src/FiltersPanel/LocationSelector.tsx` - Borough and neighborhood multi-select
- `src/FiltersPanel/PropertyFilters.tsx` - Bedrooms, bathrooms, type of space filters
- `src/FiltersPanel/AmenityFilters.tsx` - Amenities checkboxes
- `src/FiltersPanel/SortSelector.tsx` - Sort by dropdown
- `src/FiltersPanel/types.ts` - Filter types
- `src/FiltersPanel/index.ts` - Barrel export

- `src/ListingCard/ListingCard.tsx` - Individual listing card component
- `src/ListingCard/ListingCard.styles.ts` - Card styling
- `src/ListingCard/types.ts` - Listing card prop types
- `src/ListingCard/index.ts` - Barrel export

- `src/ListingsGrid/ListingsGrid.tsx` - Grid container for listing cards
- `src/ListingsGrid/ListingsGrid.styles.ts` - Grid styling
- `src/ListingsGrid/types.ts` - Grid types
- `src/ListingsGrid/index.ts` - Barrel export

- `src/MapView/MapView.tsx` - Google Maps integration component
- `src/MapView/MapView.styles.ts` - Map container styling
- `src/MapView/types.ts` - Map types
- `src/MapView/index.ts` - Barrel export

- `src/index.ts` - Main entry point exporting all components to window.SplitLeaseComponents
- `package.json` - Dependencies (React, Styled Components, Framer Motion, etc.)
- `vite.config.ts` - Vite configuration for UMD bundle
- `tsconfig.json` - TypeScript configuration

#### API Layer (`app/split-lease/api/`)
- `client.ts` - Supabase client initialization and configuration
- `listings.ts` - Listing search and retrieval functions
- `filters.ts` - Filter option fetching (boroughs, neighborhoods, amenities)
- `types.ts` - API request/response types
- `index.ts` - API barrel export

#### Types Layer (`app/split-lease/types/`)
- `models.ts` - Core domain models (Listing, User, Photo, Location, etc.)
- `filters.ts` - Filter and search parameter types
- `schedule.ts` - Schedule and day-of-week types
- `index.ts` - Types barrel export

#### Search Page (`app/split-lease/pages/search/`)
- `index.html` - Main search page with island mount points
- `css/base.css` - Base styles for static HTML elements
- `css/layout.css` - Layout and grid styles
- `css/responsive.css` - Mobile responsive styles
- `js/islands.js` - Island mounting logic and inter-island communication
- `js/search-state.js` - Client-side search state management
- `js/url-params.js` - URL parameter parsing and updating

#### Configuration & Build
- `app/split-lease/components/.nvmrc` - Node version specification (18.20.0)
- `app/split-lease/components/.gitignore` - Ignore dist, node_modules

## Implementation Plan

### Phase 1: Foundation & Setup
Set up the project structure, install dependencies, and configure build tools. Create the basic directory structure following the Islands Architecture pattern. This phase establishes the development environment and ensures all tools are properly configured.

**Key Activities:**
- Create directory structure for components, pages, API layer, and types
- Initialize npm project in components directory
- Install dependencies (React, TypeScript, Vite, Styled Components, Framer Motion)
- Configure Vite for UMD bundle output
- Set up TypeScript with strict type checking
- Create base type definitions from Supabase schema

### Phase 2: Core Type System & API Client
Build the TypeScript type system based on the Supabase database schema and the documented data types. Implement the API client layer for fetching listings and filter options. This provides the foundation for type-safe component development.

**Key Activities:**
- Define core domain models (Listing, User, Photo, Location, Features)
- Create schedule and day-of-week types based on the Days option set
- Define filter types (PriceRange, WeeklyPattern, Borough, Neighborhood, Amenities)
- Implement Supabase client initialization
- Create listing search functions with proper filtering
- Implement filter options fetching
- Add proper error handling and loading states

### Phase 3: React Component Islands
Build all React components as independent islands. Each component should be fully self-contained with its own styles, types, and logic. Components will be exported via a UMD bundle that exposes them on `window.SplitLeaseComponents`.

**Key Activities:**
- Build SearchScheduleSelector (adapt from reference repository)
  - Day-of-week visual selector with S M T W T F S buttons
  - Drag selection and click toggle functionality
  - Validation for min/max nights and contiguous days
  - Display check-in/check-out based on selection
- Build FiltersPanel components
  - Week pattern dropdown (Every week, 1 on/1 off, etc.)
  - Price range selector matching the option set
  - Location multi-select (boroughs and neighborhoods)
  - Property filters (bedrooms, bathrooms, type of space)
  - Amenity checkboxes
  - Sort selector dropdown
- Build ListingCard component
  - Photo carousel
  - Title, location, host info
  - Schedule match indicators
  - Price display (per night based on schedule)
  - "View Listing" button
- Build ListingsGrid component
  - Responsive grid layout
  - Loading states
  - Empty state messaging
  - Pagination or infinite scroll
- Build MapView component
  - Google Maps integration
  - Listing markers with prices
  - Marker clustering
  - Map-list synchronization

### Phase 4: Static HTML Page & Island Integration
Create the static HTML page structure and implement the island mounting logic. This phase connects all the React components to the static page and sets up inter-island communication.

**Key Activities:**
- Create semantic HTML structure for search page
- Add SEO meta tags and structured data
- Implement header and navigation
- Create island mount points (divs with specific IDs)
- Build island mounting JavaScript
  - Load React from CDN
  - Load component bundle
  - Mount each island with proper props
  - Set up state management for inter-island communication
- Implement URL parameter handling
  - Parse search params on load
  - Update URL when filters change
  - Support shareable search URLs
- Style static elements with CSS
  - Base typography and colors
  - Layout and spacing
  - Responsive breakpoints

### Phase 5: Search Functionality & Data Flow
Connect all components to the API layer and implement the complete search flow. Handle real-time filtering, sorting, and result updates.

**Key Activities:**
- Implement search state management
  - Centralized state for all filter values
  - Debounced search on filter changes
  - Loading and error states
- Connect filters to search API
  - Schedule-based filtering (match Days Available)
  - Price range filtering
  - Location filtering (borough, neighborhoods)
  - Property feature filtering
  - Amenity filtering
- Implement sorting logic
  - Our Recommendations (custom ranking)
  - Price (low to high)
  - Most Viewed
  - Recently Added
- Add result count and messaging
  - "X listings found"
  - "No results found" with fallback messaging
  - Nearby suggestions when no matches

### Phase 6: Polish, Testing & Optimization
Refine the UI/UX to match the original design, add animations, and optimize performance. Thoroughly test all functionality.

**Key Activities:**
- Visual refinement
  - Match colors, fonts, spacing from screenshot
  - Add hover states and transitions
  - Implement Framer Motion animations
  - Ensure responsive design across breakpoints
- Performance optimization
  - Lazy load images
  - Debounce search inputs
  - Optimize bundle size
  - Add loading skeletons
- Accessibility
  - Keyboard navigation
  - ARIA labels
  - Focus management
  - Screen reader testing
- Browser testing
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers (iOS Safari, Chrome Android)
  - Test on actual devices
- Error handling
  - API error states
  - Network failures
  - Invalid filter combinations

## Step by Step Tasks

### 1. Set Up Project Structure and Initialize Component Library
- Create `app/split-lease/` root directory
- Create subdirectories: `components/`, `pages/`, `api/`, `types/`
- Navigate to `components/` directory
- Run `npm init -y` to initialize package.json
- Install core dependencies: `npm install react@18 react-dom@18 typescript @types/react @types/react-dom`
- Install build tools: `npm install -D vite @vitejs/plugin-react`
- Install styling: `npm install styled-components framer-motion`
- Install types: `npm install -D @types/styled-components`
- Create `.nvmrc` file with content: `18.20.0`
- Create `.gitignore` file with: `node_modules/`, `dist/`, `.DS_Store`

### 2. Configure Vite for UMD Bundle Build
- Create `vite.config.ts` with UMD library configuration
  - Entry point: `src/index.ts`
  - Library name: `SplitLeaseComponents`
  - Globals: React as `React`, ReactDOM as `ReactDOM`
  - Output: `dist/split-lease-components.umd.js`
- Configure external dependencies (React, ReactDOM should not be bundled)
- Set up CSS extraction to `dist/style.css`
- Add build scripts to package.json:
  - `"build": "vite build"`
  - `"dev": "vite build --watch"`
  - `"typecheck": "tsc --noEmit"`

### 3. Set Up TypeScript Configuration
- Create `tsconfig.json` in components directory
  - Target: ES2020
  - Module: ESNext
  - JSX: react-jsx
  - Strict mode enabled
  - Module resolution: bundler
  - Include: src/**/*
- Set up path aliases if needed
- Configure declaration file generation for type exports

### 4. Define Core Type System from Supabase Schema
- Create `app/split-lease/types/models.ts`
  - Define `Listing` interface based on Supabase schema (106 fields)
  - Define `ListingPhoto` interface
  - Define `User` interface
  - Define `Proposal` interface
  - Define `Location` interface (Borough, Hood, City, State, Zip, Address)
  - Define `Features` interface (Amenities, HouseRules, TypeOfSpace, Bedrooms, Bathrooms, etc.)
  - Define `Pricing` interface (Nightly rates for 2-7 nights, Weekly, Monthly, Damage Deposit)
- Create `types/schedule.ts`
  - Define `Day` enum: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
  - Define `Night` enum corresponding to Days
  - Define `WeeklyPattern` enum: EveryWeek, OneOnOneOff, TwoOnTwoOff, OneOnThreeOff
  - Define `ScheduleSelection` interface (selectedDays, checkIn, checkOut)
- Create `types/filters.ts`
  - Define `PriceRange` interface (min, max, display)
  - Define `Borough` enum: Manhattan, Brooklyn, Queens, Bronx, StatenIsland
  - Define `Neighborhood` interface
  - Define `SortOption` enum: OurRecommendations, PriceLowToHigh, MostViewed, RecentlyAdded
  - Define `SearchFilters` interface (schedule, priceRange, location, features, amenities, sort)
- Create `types/index.ts` as barrel export

### 5. Implement Supabase API Client Layer
- Create `app/split-lease/api/client.ts`
  - Initialize Supabase client with environment variables (URL, anon key)
  - Export configured client instance
  - Add helper functions for error handling
- Create `api/listings.ts`
  - Implement `searchListings(filters: SearchFilters): Promise<Listing[]>`
    - Query listing table with filters
    - Filter by Days Available matching schedule selection
    - Filter by price range (Standarized Minimum Nightly Price)
    - Filter by Location - Borough and Location - Hood
    - Filter by Features (bedrooms, bathrooms, type of space)
    - Filter by Amenities (in-unit and in-building)
    - Apply sorting based on SortOption
    - Only return Active and Approved listings
  - Implement `getListingById(id: string): Promise<Listing>`
  - Implement `getListingPhotos(listingId: string): Promise<ListingPhoto[]>`
- Create `api/filters.ts`
  - Implement `getBoroughs(): Promise<Borough[]>`
  - Implement `getNeighborhoods(borough?: Borough): Promise<Neighborhood[]>`
  - Implement `getAmenities(): Promise<string[]>`
- Create `api/types.ts` for API-specific types (request/response shapes)
- Create `api/index.ts` as barrel export

### 6. Build SearchScheduleSelector Component (Adapt from Reference)
- Create `components/src/SearchScheduleSelector/` directory
- Create `types.ts` with component prop interfaces
  - `SearchScheduleSelectorProps` (onSelectionChange, minDays, maxDays, requireContiguous, initialSelection)
  - `DayState` interface (day, selected, disabled)
- Create `SearchScheduleSelector.tsx`
  - Implement day buttons (S M T W T F S) as clickable elements
  - Add drag selection functionality (mouseDown, mouseMove, mouseUp)
  - Add click toggle for individual days
  - Implement validation logic (min/max nights, contiguous days)
  - Display check-in/check-out days based on selection
  - Show error messages for invalid selections
  - Emit `onSelectionChange` callback with selected days array
- Create `SearchScheduleSelector.styles.ts`
  - Style day buttons (circular, hover states, selected state, disabled state)
  - Style check-in/check-out display
  - Style error messages
  - Add Framer Motion animations for selection feedback
- Create `index.ts` barrel export
- Test component in isolation

### 7. Build FiltersPanel Components
- Create `components/src/FiltersPanel/` directory
- Create `types.ts` with filter prop interfaces
- Create `WeekPatternSelector.tsx`
  - Dropdown component for weekly pattern selection
  - Options from WeeklyPattern enum
  - Display text from option set (display_mobile field)
  - Emit onChange with selected pattern
- Create `PriceRangeSelector.tsx`
  - Dropdown for price tier selection
  - Options from FILTER-PRICEONSEARCH option set
  - Display format: "< $200/night", "$200-$350/night", etc.
  - Emit onChange with { min, max } object
- Create `LocationSelector.tsx`
  - Multi-select dropdown for boroughs
  - Nested multi-select for neighborhoods within selected boroughs
  - Search/filter functionality for neighborhoods
  - Chip display for selected locations
  - Clear all functionality
- Create `PropertyFilters.tsx`
  - Number inputs/dropdowns for bedrooms (0-5+)
  - Number inputs/dropdowns for bathrooms (0-5+)
  - Dropdown for "Type of Space" (Bedroom, Entire Apartment, etc.)
  - Emit onChange with selected values
- Create `AmenityFilters.tsx`
  - Checkbox list for in-unit amenities
  - Checkbox list for in-building amenities
  - Grouped by category
  - Search/filter functionality
  - Emit onChange with selected amenities array
- Create `SortSelector.tsx`
  - Dropdown for sort options
  - Options from SortByPropertiesSearch option set
  - Display text: "Our Recommendations", "Price-Lowest to Highest", etc.
  - Emit onChange with selected sort option
- Create `FiltersPanel.tsx` (main container)
  - Compose all filter components
  - Manage local filter state
  - Debounce filter changes (300ms)
  - Emit consolidated filter updates
  - Add "Clear All Filters" button
  - Add collapsible sections for mobile
- Style all filter components with styled-components
- Create `index.ts` barrel export

### 8. Build ListingCard Component
- Create `components/src/ListingCard/` directory
- Create `types.ts` with prop interface
  - `ListingCardProps` (listing, onView, scheduleMatch)
- Create `ListingCard.tsx`
  - Display primary photo with fallback
  - Show listing name/title
  - Display location (neighborhood, borough)
  - Show host name and avatar
  - Display price (per night based on schedule)
  - Show schedule match indicator (exact match, partial match)
  - Display bedrooms, bathrooms, type of space
  - Show amenity icons (top 3-4)
  - "View Listing" button with onClick handler
  - Hover animation (lift effect)
- Create `ListingCard.styles.ts`
  - Card container with shadow
  - Image container with aspect ratio
  - Content layout (flex column)
  - Typography styles
  - Button styles
  - Hover effects with Framer Motion
- Create `index.ts` barrel export

### 9. Build ListingsGrid Component
- Create `components/src/ListingsGrid/` directory
- Create `types.ts` with prop interface
  - `ListingsGridProps` (listings, loading, error, onListingView)
- Create `ListingsGrid.tsx`
  - Render grid of ListingCard components
  - Show loading skeleton cards when loading
  - Display error message when error occurs
  - Show empty state when no listings found
    - Message: "We didn't find any results with your current filters"
    - Display nearby listings fallback
  - Show result count header
  - Handle responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Create `ListingsGrid.styles.ts`
  - Grid container with CSS Grid
  - Responsive breakpoints
  - Loading skeleton styles
  - Empty state styles
- Create `index.ts` barrel export

### 10. Build MapView Component
- Create `components/src/MapView/` directory
- Create `types.ts` with prop interface
  - `MapViewProps` (listings, center, zoom, onMarkerClick)
- Create `MapView.tsx`
  - Initialize Google Maps with API key
  - Display markers for each listing
  - Marker content: price in circle
  - Implement marker clustering for dense areas
  - Handle marker click to highlight corresponding listing
  - Sync map bounds with visible listings
  - Add map controls (zoom, full screen)
  - Handle loading and error states
- Create `MapView.styles.ts`
  - Map container styles (height, width)
  - Custom marker styles
  - Info window styles
- Create `index.ts` barrel export
- Note: Google Maps implementation details will be provided in next context

### 11. Create Main Component Entry Point and Build Bundle
- Create `components/src/index.ts`
  - Import all components
  - Export object with all components
  - Set up UMD export: `window.SplitLeaseComponents = { SearchScheduleSelector, FiltersPanel, ListingCard, ListingsGrid, MapView }`
- Run `npm run build` to generate UMD bundle
- Verify `dist/split-lease-components.umd.js` is created
- Verify `dist/style.css` is created
- Test bundle size (should be < 200KB)

### 12. Create Static HTML Page Structure
- Create `app/split-lease/pages/search/` directory
- Create `index.html`
  - DOCTYPE and HTML5 semantic structure
  - Head section:
    - Meta tags (charset, viewport, description)
    - Title: "Search Split Lease Rentals | Find Your Perfect Weekly Rental"
    - Open Graph meta tags for social sharing
    - Link to base.css, layout.css, responsive.css
    - Preload Google Maps API
    - Preload component bundle
  - Body structure:
    - Header with logo and navigation
    - Main search container:
      - Search hero section (optional)
      - Filters sidebar or top bar
      - Main content area with:
        - Results header (count, sort)
        - Grid/Map toggle
        - Results container
    - Footer with links
  - Island mount points:
    - `<div id="schedule-selector-island"></div>` in search area
    - `<div id="filters-panel-island"></div>` in sidebar
    - `<div id="listings-grid-island"></div>` in main content
    - `<div id="map-view-island"></div>` in map container
  - Script includes:
    - React CDN (production build)
    - ReactDOM CDN (production build)
    - Component bundle: `../../components/dist/split-lease-components.umd.js`
    - Island mounting script: `js/islands.js`
    - Search state script: `js/search-state.js`
    - URL params script: `js/url-params.js`

### 13. Style Static HTML Elements
- Create `pages/search/css/base.css`
  - CSS reset/normalize
  - Root variables (colors, fonts, spacing)
  - Typography styles (headings, body text)
  - Link styles
  - Button base styles
- Create `pages/search/css/layout.css`
  - Page layout (header, main, footer)
  - Grid system
  - Sidebar layout
  - Content area layout
  - Spacing utilities
- Create `pages/search/css/responsive.css`
  - Mobile breakpoint styles (< 768px)
  - Tablet breakpoint styles (768px - 1024px)
  - Desktop styles (> 1024px)
  - Hide/show elements per breakpoint

### 14. Implement Island Mounting Logic
- Create `pages/search/js/islands.js`
  - Wait for DOM content loaded
  - Check if React and SplitLeaseComponents are available
  - Mount SearchScheduleSelector island:
    - Get element by ID
    - Create root with ReactDOM.createRoot
    - Render component with props
    - Set up onSelectionChange callback
  - Mount FiltersPanel island:
    - Similar mount process
    - Set up onChange callback
  - Mount ListingsGrid island:
    - Mount with initial empty state
    - Set up onListingView callback
  - Mount MapView island:
    - Mount with initial center (NYC)
    - Set up onMarkerClick callback
  - Set up inter-island communication bus
    - Event-based system for filter changes
    - Broadcast search updates to all islands

### 15. Implement Search State Management
- Create `pages/search/js/search-state.js`
  - Create centralized state object:
    - filters (schedule, price, location, features, amenities)
    - results (listings array)
    - loading (boolean)
    - error (string | null)
  - Implement `updateFilters(newFilters)` function
    - Merge new filters with existing
    - Debounce search trigger (300ms)
    - Update URL parameters
  - Implement `performSearch()` function
    - Set loading state
    - Call API searchListings with current filters
    - Update results state
    - Handle errors
    - Clear loading state
  - Implement `getState()` and `setState()` functions
  - Set up event emitter for state changes
  - Subscribe islands to state updates

### 16. Implement URL Parameter Handling
- Create `pages/search/js/url-params.js`
  - Implement `parseUrlParams()` function
    - Get URLSearchParams from window.location.search
    - Parse schedule (days as comma-separated numbers)
    - Parse price range (min and max)
    - Parse location (borough and neighborhoods)
    - Parse features (bedrooms, bathrooms, type)
    - Parse amenities (array)
    - Parse sort option
    - Return filter object
  - Implement `updateUrlParams(filters)` function
    - Convert filters to URL parameters
    - Use history.pushState to update URL without reload
    - Keep URL in sync with current filters
  - Call parseUrlParams on page load to initialize filters

### 17. Connect Components to Search Flow
- Update islands.js to integrate search state:
  - Pass initial filter state to components
  - Connect component callbacks to updateFilters
  - Subscribe components to state changes for re-rendering
- Test complete search flow:
  - Change schedule → triggers search → updates results and map
  - Change price range → triggers search → updates results
  - Change location → triggers search → updates results and map
  - Change property filters → triggers search → updates results
  - Change amenities → triggers search → updates results
  - Change sort → re-sorts results without new search

### 18. Implement Schedule-Based Listing Matching
- In api/listings.ts, enhance searchListings function:
  - When schedule filter is provided (array of Day enums)
  - Query listings where "Days Available (List of Days)" contains ALL selected days
  - Use Supabase array contains operator
  - Account for weekly pattern (EveryWeek, OneOnOneOff, etc.)
  - Calculate if listing's "Weeks offered" matches pattern
  - Return only listings with compatible schedules
- Add schedule match indicator to results:
  - Exact match: listing available all selected days
  - Partial match: listing available some selected days
  - Pass match type to ListingCard component

### 19. Implement Price Calculation Based on Schedule
- In ListingCard component:
  - Calculate nightly rate based on number of selected nights
  - Use appropriate pricing field:
    - 2 nights: "💰Nightly Host Rate for 2 nights"
    - 3 nights: "💰Nightly Host Rate for 3 nights"
    - 4 nights: "💰Nightly Host Rate for 4 nights"
    - 5 nights: "💰Nightly Host Rate for 5 nights"
    - 7 nights: "💰Nightly Host Rate for 7 nights"
  - Fall back to weekly rate / 7 if specific rate not available
  - Display total per week and per night
  - Show weekly pattern discount if applicable

### 20. Implement Empty State and Fallback Behavior
- In ListingsGrid component:
  - When search returns 0 results:
  - Display message: "We didn't find any results with your current filters. Here are nearby listings in [Borough], and surrounding neighborhoods."
  - Perform fallback search:
    - Remove strictest filters (schedule, amenities)
    - Keep location and expand to nearby areas
    - Return up to 10 fallback listings
  - Display fallback listings with indicator
  - Show "Clear Filters" button prominently

### 21. Add Loading States and Skeletons
- Create skeleton components for loading states:
  - ListingCardSkeleton (gray boxes with shimmer animation)
  - Create 6-9 skeleton cards in grid
- Update ListingsGrid to show skeletons when loading
- Add loading spinner for filters panel
- Add loading overlay for map view
- Implement smooth transitions between loading and loaded states

### 22. Add Animations and Transitions
- Use Framer Motion for animations:
  - ListingCard hover lift effect
  - Filter panel slide in/out on mobile
  - Results fade in on search complete
  - Skeleton shimmer animation
  - Schedule selector day selection animation
  - Error message shake animation
- Keep animations subtle and performant (< 300ms)
- Respect prefers-reduced-motion media query

### 23. Implement Visual Design Matching Original
- Reference screenshot and live page:
  - Match color palette exactly
  - Match typography (font families, sizes, weights)
  - Match spacing and padding
  - Match border radius and shadows
  - Match button styles
  - Match dropdown styles
  - Match card layout
- Use CSS variables for consistent theming
- Ensure visual consistency across all components

### 24. Implement Responsive Design
- Test and refine mobile layout:
  - Stack filters vertically
  - Full-width listing cards
  - Bottom sheet for filters on mobile
  - Touch-friendly tap targets (min 44x44px)
  - Horizontal scroll for schedule selector if needed
- Test tablet layout:
  - 2-column grid
  - Collapsible sidebar
- Test desktop layout:
  - 3-column grid
  - Fixed sidebar
  - Side-by-side map view

### 25. Add Accessibility Features
- Add ARIA labels to all interactive elements
- Ensure keyboard navigation works:
  - Tab through all filters
  - Enter to select options
  - Escape to close dropdowns
- Add focus visible styles
- Ensure color contrast meets WCAG AA
- Add skip to content link
- Test with screen reader (NVDA or VoiceOver)

### 26. Implement Error Handling
- Add error boundaries in React components
- Display user-friendly error messages:
  - Network errors: "Unable to load listings. Please check your connection."
  - API errors: "Something went wrong. Please try again."
  - No results: Custom empty state
- Add retry functionality for failed requests
- Log errors to console for debugging

### 27. Optimize Performance
- Lazy load images in listing cards
  - Use intersection observer
  - Show placeholder until loaded
- Debounce search input (300ms)
- Throttle scroll events (if implementing infinite scroll)
- Minimize bundle size:
  - Tree shake unused code
  - Use production React build
  - Minify JavaScript and CSS
- Add compression for assets
- Implement caching strategy for API responses

### 28. Test Cross-Browser Compatibility
- Test in Chrome (Windows and Mac)
- Test in Firefox
- Test in Safari (Mac and iOS)
- Test in Edge
- Fix any browser-specific issues
- Test on physical mobile devices:
  - iOS Safari
  - Chrome Android
  - Various screen sizes

### 29. Write Component Documentation
- Add JSDoc comments to all components
- Document component props with examples
- Add usage examples in component files
- Document API functions
- Update README with:
  - Component descriptions
  - Props tables
  - Code examples
  - Common patterns

### 30. Manual Testing and QA
- Test complete user flows:
  - Search by schedule → view results → click listing
  - Apply multiple filters → view results → clear filters
  - Change sort order → verify results update
  - Test URL sharing → verify filters load correctly
- Test edge cases:
  - No results found
  - API errors
  - Slow network
  - Invalid filter combinations
- Test data scenarios:
  - Listings with missing photos
  - Listings with extreme prices
  - Listings with many amenities
  - Listings with no schedule match

## Testing Strategy

### Unit Tests
- Test SearchScheduleSelector component:
  - Day selection logic
  - Contiguous day validation
  - Min/max nights validation
  - Check-in/check-out calculation
  - Error message display
- Test filter components:
  - Option selection
  - Multi-select logic
  - Clear functionality
  - OnChange callbacks
- Test API functions:
  - Search query building
  - Filter application
  - Error handling
  - Response parsing
- Test utility functions:
  - URL parameter parsing
  - Schedule matching logic
  - Price calculation
  - Date formatting

### Integration Tests
- Test complete search flow:
  - User selects schedule
  - User applies filters
  - API is called with correct parameters
  - Results are displayed
  - URL is updated
- Test island communication:
  - Schedule change updates map
  - Filter change updates grid
  - Map interaction updates grid

### Visual Regression Tests
- Capture screenshots of:
  - Search page (desktop)
  - Search page (mobile)
  - Various filter states
  - Empty states
  - Error states
- Compare against baseline screenshots
- Flag any visual differences

### Edge Cases
- Schedule with non-contiguous days (if validation fails)
- Price range with min > max
- Location with no listings
- Very long listing names
- Listings with 0 photos
- Extremely high or low prices
- Empty amenities list
- Slow API response (> 3 seconds)
- Network timeout
- Invalid Supabase credentials
- Browser without JavaScript enabled (graceful degradation)

## Acceptance Criteria

1. **Visual Fidelity**: The search page closely matches the original Bubble design in the screenshot, including colors, typography, spacing, and layout
2. **Islands Architecture**: Static HTML loads instantly (< 1 second), React components mount as islands without blocking initial render
3. **Schedule Selector**: Users can select days of the week (S M T W T F S) by clicking or dragging, with real-time validation and check-in/check-out display
4. **Filtering**: All filters work correctly:
   - Schedule (days of week)
   - Weekly pattern (Every week, 1 on/1 off, etc.)
   - Price range (< $200, $200-$350, $350-$500, $500+)
   - Location (borough and neighborhood multi-select)
   - Bedrooms and bathrooms
   - Type of space
   - Amenities (in-unit and in-building)
5. **Search Results**: Listings display correctly with:
   - Photos (with fallback)
   - Title and location
   - Host information
   - Price based on selected schedule
   - Schedule match indicator
   - View button
6. **Sorting**: Users can sort by Our Recommendations, Price (Low to High), Most Viewed, and Recently Added
7. **Empty States**: When no results found, display helpful message and show nearby listings
8. **Map View**: Google Maps displays listing locations with price markers (details in next phase)
9. **Responsive**: Page works on mobile (320px+), tablet (768px+), and desktop (1024px+)
10. **Performance**:
    - Initial page load < 2 seconds
    - Search results update < 500ms after filter change
    - Bundle size < 200KB gzipped
11. **Accessibility**:
    - All interactive elements keyboard accessible
    - WCAG AA color contrast
    - Screen reader compatible
12. **URL Sharing**: Search filters encode in URL parameters, shareable links load correct filter state
13. **Error Handling**: Network errors and API failures display user-friendly messages with retry option
14. **Browser Support**: Works in Chrome, Firefox, Safari, and Edge (latest 2 versions)
15. **Data Integration**: Successfully fetches and displays real listings from Supabase database

## Validation Commands

Execute these commands to validate the feature is complete:

- `cd app/split-lease/components && npm run typecheck` - Verify TypeScript types compile without errors
- `cd app/split-lease/components && npm run build` - Build component bundle successfully
- `cd app/split-lease/components && ls -lh dist/` - Verify bundle files exist and check size (< 200KB)
- Open `app/split-lease/pages/search/index.html` in browser - Page loads without console errors
- Open browser DevTools Console - No React errors or warnings
- Open browser DevTools Network tab - All assets load successfully (200 status)
- Test schedule selection - Click/drag days, verify check-in/check-out updates
- Test filters - Apply each filter type, verify results update
- Test sorting - Change sort option, verify results reorder
- Test empty state - Apply impossible filter combination, verify fallback message
- Test URL params - Change filters, copy URL, paste in new tab, verify state loads
- Test mobile view - Resize browser to 375px width, verify layout adapts
- Test keyboard navigation - Tab through all interactive elements, verify focus visible
- Run Lighthouse audit - Verify Performance > 90, Accessibility > 90, Best Practices > 90

## Notes

### Google Maps Implementation
Google Maps integration will be provided in the next context/iteration. For now, create a placeholder MapView component that displays a static map image or "Map coming soon" message. The component structure should be ready to integrate the actual Google Maps API.

### Supabase Connection
The Supabase MCP is already connected to the production database with real data. Use the existing connection for development and testing. Credentials should be stored in environment variables (see .env.sample).

### Reference Repository Usage
The search_lite.git repository has good visual design but messy implementation. Use it ONLY for:
- Visual styling cues (colors, fonts, spacing)
- Layout inspiration
- Component visual design

Do NOT copy code structure or logic from search_lite - build clean, maintainable code following the Islands Architecture pattern.

### Search Schedule Selector Repository
The search-schedule-selector.git repository contains the original component. Adapt it to:
- Match the ESM + React Island structure
- Use styled-components instead of inline styles
- Add TypeScript types
- Integrate with the filter state management
- Match the visual design from the screenshot

### Weekly Pattern Logic
The "Weeks offered" field in listings combined with the WeeklyPattern option set creates complex matching logic:
- EveryWeek (period: 1): listing must be available every single week
- OneOnOneOff (period: 2): listing available alternating weeks
- TwoOnTwoOff (period: 4): listing available 2 weeks, off 2 weeks
- OneOnThreeOff (period: 4): listing available 1 week out of 4

This matching logic will need careful implementation in the API layer.

### Price Calculation Complexity
Listings have different nightly rates based on number of nights (2, 3, 4, 5, 7). The price displayed must dynamically calculate based on the user's selected schedule. If a specific rate is not available, fall back to weekly rate / 7 or monthly rate / 30.

### Future Enhancements
Not in scope for initial implementation but documented for future:
- Saved searches
- Favorite listings
- Real-time availability calendar
- Advanced map interactions (clustering, custom markers)
- Comparison tool for multiple listings
- Email alerts for new listings matching criteria
- A/B testing different sort algorithms
- Performance monitoring and analytics

### Development Dependencies
Using npm instead of uv for the component library because:
- React ecosystem is npm-native
- Better compatibility with Vite and other tooling
- Standard practice for React component libraries
- Easier to find documentation and support

The main project can still use uv for Python-based tools and scripts.

### Design Tokens
Extract colors, fonts, and spacing values from the screenshot and original page into CSS custom properties (variables) in base.css. This ensures consistency and makes theme changes easy:

```css
:root {
  --color-primary: #...;
  --color-secondary: #...;
  --font-family-base: ...;
  --spacing-unit: 8px;
  /* etc */
}
```

### Component Bundle Versioning
For production deployment, the UMD bundle should be versioned (e.g., split-lease-components.v1.0.0.umd.js) and potentially deployed to a CDN. For now, reference the local dist/ output.

### Performance Budget
Target metrics:
- Initial HTML load: < 500ms
- Time to Interactive: < 2 seconds
- Component bundle: < 200KB gzipped
- Total CSS: < 50KB
- API response time: < 300ms (dependent on Supabase)

If bundle exceeds 200KB, consider code splitting or lazy loading less critical components.
