# Split Lease - Search Page

A rental property search interface using Islands Architecture - combining a static HTML page with interactive React component islands for filtering and displaying search results.

## Overview

This is the search page for Split Lease, a rental platform that enables users to find and rent properties for specific days of the week (e.g., weeknights, weekends, or custom schedules). The page uses an Islands Architecture pattern where a static HTML page is enhanced with interactive React components loaded as ESM/UMD bundles.

## Features

- 🏝️ **Islands Architecture**: Static HTML with React component islands
- 📅 **Interactive Schedule Selector**: Visual day-of-week picker with drag selection
- 🔍 **Search Filters**: Price range, bedrooms, amenities, and more
- 🗺️ **Map Integration**: Interactive map view for listing locations
- 🎨 **Styled Components**: Fully styled with styled-components and Framer Motion animations
- ⚡ **Fast Loading**: Minimal JavaScript, CDN-based React, progressive enhancement
- 📱 **Responsive Design**: Mobile-first design with responsive layouts
- 🔧 **ESM/UMD Bundle**: Components exposed as `window.SplitLeaseComponents`

## Prerequisites

- Node.js 18.20.0+ (LTS versions 18.x or 20.x recommended)
- npm 9.0.0+
- Modern web browser (ES2020 support)

## Project Structure

```
app/split-lease/
├── components/              # React components library (ESM/UMD bundle)
│   ├── src/
│   │   ├── SearchScheduleSelector/
│   │   │   ├── SearchScheduleSelector.tsx
│   │   │   ├── SearchScheduleSelector.styles.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── ... (other search-related components)
│   ├── dist/               # Built UMD bundle (generated)
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── pages/
│   └── search/             # Search page
│       ├── index.html      # Main search page
│       ├── css/
│       └── js/
│
├── api/                    # API client for backend integration
│   ├── client.ts
│   ├── listings.ts
│   └── index.ts
│
└── types/                  # TypeScript type definitions
    ├── models.ts
    ├── api.ts
    └── index.ts
```

## Setup and Installation

### 1. Install Component Dependencies

```bash
cd app/split-lease/components
npm install
```

### 2. Build Component Library

```bash
cd app/split-lease/components
npm run build
```

This generates:
- `dist/split-lease-components.umd.js` - UMD bundle
- `dist/style.css` - Component styles

### 3. View Search Page

Open the search page in your browser:
- Search page: `app/split-lease/pages/search/index.html`

No build step required for the page - it loads React via CDN and includes the UMD bundle.

## Component Development

### Building the Components Library

```bash
cd components
npm run build        # Build UMD bundle
npm run typecheck    # Type check without emitting
npm run test         # Run unit tests
```

### SearchScheduleSelector Component

The main interactive component for selecting weekly rental schedules on the search page.

#### Props

```typescript
interface SearchScheduleSelectorProps {
  listing?: Listing;                    // Optional listing data
  onSelectionChange?: (selectedDays: Day[]) => void;  // Selection callback
  onError?: (error: string) => void;    // Error callback
  className?: string;                    // CSS class name
  minDays?: number;                      // Minimum nights (default: 2)
  maxDays?: number;                      // Maximum nights (default: 5)
  requireContiguous?: boolean;           // Require consecutive days (default: true)
  initialSelection?: number[];           // Initial selected day indices
}
```

#### Features

- **Drag Selection**: Click and drag to select multiple days
- **Click Toggle**: Single click to toggle individual days
- **Validation**: Real-time validation with error messages
- **Contiguous Days**: Optional enforcement of consecutive day selection
- **Animations**: Smooth transitions using Framer Motion
- **Match Counts**: Shows exact and partial listing matches

### Using Components in the Search Page

Components are mounted as islands using React's `createRoot`:

```html
<!-- Include React CDN -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include component styles -->
<link rel="stylesheet" href="../../components/dist/style.css">

<!-- Include components bundle -->
<script src="../../components/dist/split-lease-components.umd.js"></script>

<!-- Mount island -->
<div id="schedule-selector-island"></div>
<script>
  const { SearchScheduleSelector } = window.SplitLeaseComponents || {};
  if (SearchScheduleSelector) {
    ReactDOM.createRoot(document.getElementById('schedule-selector-island'))
      .render(React.createElement(SearchScheduleSelector, {
        minDays: 2,
        maxDays: 5,
        requireContiguous: true,
        onSelectionChange: (selectedDays) => {
          console.log('Selected days:', selectedDays);
          // Update search results, map, filters, etc.
        }
      }));
  }
</script>
```

## Architecture Pattern

### Islands Architecture Benefits

1. **Performance**: Only interactive parts load JavaScript
2. **SEO**: Static HTML content is immediately available
3. **Progressive Enhancement**: Works without JavaScript, enhanced with it
4. **Flexibility**: Mix static and dynamic content easily
5. **Simplicity**: No complex build process for pages

### How It Works

1. Static HTML page defines the structure and content
2. React components are built as a UMD bundle
3. Page includes React via CDN and the components bundle
4. Islands are mounted at specific DOM nodes using `ReactDOM.createRoot`
5. Components are fully isolated and self-contained

## Development Workflow

### For Component Changes

1. Edit component files in `components/src/`
2. Run `npm run build` in `components/`
3. Refresh the browser to see changes
4. Run `npm run typecheck` to verify TypeScript types

### For Page Changes

1. Edit HTML, CSS, or JS files in `pages/search/`
2. Refresh the browser (no build step needed)

## Technology Stack

- **React 18**: UI components with hooks
- **TypeScript**: Type-safe component development
- **Styled Components**: CSS-in-JS styling
- **Framer Motion**: Smooth animations and transitions
- **Vite**: Fast build tool for UMD bundle
- **Islands Architecture**: Performance-optimized page architecture

## Browser Support

- Modern browsers with ES2020 support
- React 18 compatible
- CSS Grid and Flexbox support required

## Search Page Features

### Interactive Components (Islands)

- **Schedule Selector**: Day-of-week picker for rental schedules
- **Filters Panel**: Price range, bedrooms, bathrooms, amenities
- **Results Grid**: Listing cards with images and details
- **Map View**: Interactive map showing listing locations
- **Sort Controls**: Sort by price, relevance, distance

### Static Content

- Header with navigation
- Search bar
- Footer with links
- SEO meta tags and structured data

## Testing

### Component Testing

```bash
cd components
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### Visual Testing

Open the test harness preview:
- `app/test-harness/previews/search-schedule-selector-preview.html`

This provides an interactive testing environment with:
- Live component configuration
- Console output monitoring
- Manual test instructions
- Visual feedback

### End-to-End Testing

```bash
cd app/split-lease
npm run test:e2e         # Run Playwright tests
```

## API Integration

The search page integrates with the backend API through the `api/` directory:

```typescript
import { searchListings } from './api/listings';

// Search for listings matching the selected schedule
const results = await searchListings({
  schedule: selectedDays,
  priceRange: [min, max],
  bedrooms: 2,
  // ... other filters
});
```

See `app/split-lease/api/README.md` for API documentation.

## Future Enhancements

- Additional filter components (amenities, property type)
- Saved searches and favorites
- Real-time availability updates
- Enhanced map interactions with clustering
- Comparison tool for multiple listings
- Advanced sorting options

## Troubleshooting

### Components Not Building

Make sure you run npm install in the correct directory:
```bash
cd app/split-lease/components
npm install
npm run build
```

### Components Not Loading in Browser

1. Check that the UMD bundle was built: `components/dist/split-lease-components.umd.js`
2. Check browser console for errors
3. Verify the script paths in the HTML are correct
4. Ensure React CDN scripts are loaded before the component bundle

### Styles Not Applying

1. Verify `components/dist/style.css` exists
2. Check that the CSS is loaded before the component renders
3. Inspect the browser to see if styles are being overridden

### Node Version Issues

Ensure you're using the correct Node.js and npm versions:
```bash
node --version  # Should be 18.20.0+ or 20.x.x
npm --version   # Should be 9.0.0+
```

Use nvm to switch versions:
```bash
nvm use  # Uses the version specified in .nvmrc
```
