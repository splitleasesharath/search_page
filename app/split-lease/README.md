# Split Lease Search Page

ESM + React Islands implementation of the Split Lease search page.

## Project Structure

```
app/split-lease/
├── components/           # React component library
│   ├── src/
│   │   ├── SearchScheduleSelector/
│   │   ├── FiltersPanel/
│   │   ├── ListingCard/
│   │   ├── ListingsGrid/
│   │   ├── MapView/
│   │   └── index.ts
│   ├── dist/            # Built UMD bundle
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
├── pages/               # Static HTML pages
│   └── search/
│       ├── index.html
│       ├── css/
│       │   ├── base.css
│       │   ├── layout.css
│       │   └── responsive.css
│       └── js/
│           ├── islands.js
│           ├── search-state.js
│           └── url-params.js
├── api/                 # API client layer
│   ├── client.ts
│   ├── listings.ts
│   ├── filters.ts
│   └── types.ts
└── types/               # TypeScript types
    ├── models.ts
    ├── filters.ts
    ├── schedule.ts
    └── index.ts
```

## Architecture

This implementation follows the **Islands Architecture** pattern:

1. **Static HTML Foundation**: Fast initial page load with semantic HTML
2. **React Component Islands**: Interactive components loaded as needed
3. **Progressive Enhancement**: Works without JavaScript, enhanced with it
4. **UMD Bundle**: Components bundled as a single UMD module
5. **State Management**: Centralized search state with pub/sub pattern
6. **URL Parameters**: Shareable search URLs with filter state

## Components

### SearchScheduleSelector
Interactive day-of-week selector with drag and click interactions. Allows users to select rental days (S M T W T F S) and shows check-in/check-out dates.

### FiltersPanel
Complete filtering interface including:
- Weekly pattern selector
- Price range selector
- Bedrooms/bathrooms inputs
- Sort options

### ListingCard
Individual listing display with:
- Photo
- Title and location
- Price per night
- Property features
- View button

### ListingsGrid
Grid container for listing cards with:
- Responsive layout (1-3 columns)
- Loading states
- Empty states
- Result count

### MapView
Placeholder for Google Maps integration (to be implemented in future phase).

## Development

### Install Dependencies

```bash
cd app/split-lease/components
npm install
```

### Build Components

```bash
cd app/split-lease/components
npm run build
```

This creates `dist/split-lease-components.umd.js` (179KB, 62KB gzipped).

### Development Mode

```bash
cd app/split-lease/components
npm run dev
```

Watches for changes and rebuilds automatically.

### Type Checking

```bash
cd app/split-lease/components
npm run typecheck
```

## Viewing the Page

Open `app/split-lease/pages/search/index.html` in a web browser.

The page loads:
1. Static HTML structure
2. React and ReactDOM from CDN
3. Component bundle
4. State management and island mounting scripts

## Search Flow

1. User selects days in schedule selector
2. User applies filters in filters panel
3. Filters update centralized search state
4. URL parameters update (shareable link)
5. Search is triggered (debounced 300ms)
6. Results display in listings grid
7. Map updates with listing locations

## State Management

`SearchState` (in `search-state.js`) manages:
- Current filters
- Search results
- Loading state
- Error state

Components subscribe to state changes for reactive updates.

## URL Parameters

Filters encode/decode to URL parameters:
- `schedule`: Comma-separated day numbers (0-6)
- `pattern`: Weekly pattern (every_week, 1_on_1_off, etc.)
- `price_min`, `price_max`: Price range
- `boroughs`, `neighborhoods`: Location filters
- `bedrooms`, `bathrooms`: Property filters
- `amenities`: Comma-separated amenities
- `sort`: Sort option

Example: `/search?schedule=1,2,3,4,5&price_max=300&boroughs=Brooklyn,Manhattan`

## API Integration

The API layer (`app/split-lease/api/`) provides:
- `searchListings(filters)`: Search with filters
- `getListingById(id)`: Get single listing
- `getBoroughs()`: Get available boroughs
- `getNeighborhoods(borough)`: Get neighborhoods
- `getAmenities()`: Get available amenities

Currently uses mock data. To connect to Supabase:
1. Set environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY`
2. Update `api/client.ts` initialization
3. Remove mock data from `search-state.js`

## Customization

### Colors & Styling
Edit CSS variables in `pages/search/css/base.css`:
- `--color-primary`: Primary brand color
- `--font-family-base`: Base font
- `--spacing-unit`: Base spacing (8px)

### Component Styling
Components use styled-components. Edit styles in each component's `.styles.ts` file.

### Filter Options
Update option sets in `types/filters.ts`:
- `PRICE_RANGE_OPTIONS`
- `SORT_OPTIONS`
- `WEEK_PATTERN_OPTIONS`

## Next Steps

1. **Google Maps Integration**: Implement full MapView component
2. **Real API Connection**: Connect to Supabase backend
3. **Advanced Filters**: Add location multi-select, amenities checkboxes
4. **Pagination**: Add infinite scroll or pagination
5. **Saved Searches**: Allow users to save filter combinations
6. **Testing**: Add unit and integration tests
7. **Performance**: Optimize bundle size, add code splitting
8. **Accessibility**: Complete ARIA labels and keyboard navigation

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Proprietary - Split Lease © 2025
