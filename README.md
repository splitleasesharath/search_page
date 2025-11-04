# Split Lease Search Page Replica

A fully responsive replica of the Split Lease search page built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ **Fully Responsive Design**
  - Desktop layout (1024px+): Split view with listings and map
  - Tablet layout (768px-1023px): Single column with hidden map
  - Mobile layout (<768px): Optimized single column with collapsible filters

- ✅ **Complete Listing Data**
  - 10 real listings from Split Lease website
  - Accurate pricing (starting and full prices)
  - Host information with verification badges
  - Property details and amenities

- ✅ **Interactive Features**
  - Filter by borough, price, and week patterns
  - Sort by recommendations, price, views, or recency
  - Image carousel for each listing
  - Favorite/heart functionality
  - Mobile-friendly filter and map toggles

- ✅ **Google Maps Integration**
  - Custom price markers
  - Info windows with listing details
  - Clustering for nearby listings
  - Street/Satellite view toggle

## Setup Instructions

### 1. Quick Start (No Map)

Simply open the `index.html` file in your web browser:

```bash
cd split-lease-replica
open index.html  # macOS
# OR
start index.html  # Windows
# OR
xdg-open index.html  # Linux
```

### 2. With Google Maps

To enable the interactive map, you need a Google Maps API key:

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API
3. Replace `YOUR_API_KEY` in `index.html` (line ~247):
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
   ```

### 3. Using a Local Server (Recommended)

For the best experience, use a local server:

#### Option A: Python (if installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Node.js (if installed)
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option C: VS Code Live Server
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

Then navigate to `http://localhost:8000` in your browser.

## File Structure

```
split-lease-replica/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Desktop styles
│   └── responsive.css  # Mobile/tablet styles
├── js/
│   ├── data.js         # Listing data (10 properties)
│   └── app.js          # Main application logic
├── images/            # Placeholder images
└── README.md          # This file
```

## Testing Responsive Design

### Desktop View
- Resize browser window to 1024px or wider
- Features: Split view with listings grid and map side-by-side

### Tablet View
- Resize to 768px - 1023px
- Features: 2-column listing grid, hidden map (accessible via button)

### Mobile View
- Resize to less than 768px
- Features: Single column, collapsible filters, bottom navigation

### Browser DevTools
1. Open Chrome/Firefox DevTools (F12)
2. Click the device toolbar icon
3. Select a device preset or custom size
4. Test different viewports

## Features Breakdown

### Filters
- **Borough**: 7 options (Manhattan, Brooklyn, Queens, etc.)
- **Neighborhoods**: 29 Manhattan neighborhoods with search
- **Week Pattern**: 4 scheduling options
- **Price Tiers**: 5 ranges (<$200 to $500+/night)
- **Sort**: Recommendations, Price, Views, Recent

### Listing Cards
- Image carousel with navigation
- "New Listing" badges
- Host profiles with verification
- Dual pricing display
- Message buttons
- Property details (bedrooms, bathrooms, kitchen)

### Mobile Optimizations
- Touch-friendly buttons (minimum 44px)
- Swipeable image galleries
- Collapsible filter panel
- Full-screen map view
- Sticky navigation bars

## Customization

### Adding New Listings
Edit `js/data.js` and add to the `listingsData` array:

```javascript
{
    id: 11,
    title: "Your Property Title",
    location: "Neighborhood, Borough",
    price: { starting: 250, full: 350 },
    // ... other properties
}
```

### Styling Changes
- Main styles: `css/styles.css`
- Responsive breakpoints: `css/responsive.css`
- Colors and fonts can be customized using CSS variables

### Filter Logic
Modify `js/app.js` function `applyFilters()` to change filtering behavior.

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Known Limitations
- Map requires API key to function
- Images are placeholders (replace with actual property photos)
- Filter persistence not implemented (refreshes reset filters)
- No backend integration (static data only)

---

## Supabase Database Setup

This application now supports **Supabase** as a production database with **134 active listings**! Supabase provides a PostgreSQL database with real-time updates, advanced filtering, and secure API access.

### Quick Setup (5 minutes)

1. **Get Your Supabase Anon Key**
   - Go to https://supabase.com/dashboard
   - Open your project (qcfifybkaddcoimjroca)
   - Navigate to **Settings** → **API**
   - Copy the **anon public** key (starts with `eyJhbGci...`)

2. **Create Configuration File**
   - Create `js/config.local.js` in your project
   - Add your anon key:
     ```javascript
     window.ENV = window.ENV || {};
     window.ENV.SUPABASE_ANON_KEY = 'your_actual_anon_key_here';
     ```

3. **Test the Connection**
   - Open `tests/test-supabase-api.html` in your browser
   - Click "Run All Tests"
   - All 18 tests should pass

**Important:** The `config.local.js` file is git-ignored and should NEVER be committed to version control.

### Features

- **134 Active Listings**: Real production data from PostgreSQL database
- **Smart Caching**: 5-minute cache reduces API calls by ~80%
- **Advanced Filtering**: Borough, neighborhood, price range, bedrooms, space type
- **Automatic Fallback**: Gracefully falls back to static data if Supabase unavailable
- **Secure**: Uses Row-Level Security (RLS) policies for data protection

### Documentation

For complete Supabase setup instructions, see:
- [**SUPABASE_SETUP.md**](docs/SUPABASE_SETUP.md) - Comprehensive setup guide
- [**tests/README.md**](tests/README.md) - Test suite documentation

---

## Test Suite

This project includes a comprehensive test suite with **43 tests** covering all major components:

### Test Files

1. **tests/test-supabase-api.html** (18 tests)
   - API initialization and connection
   - Data fetching and transformation
   - Filtering (borough, neighborhood, price, bedrooms)
   - Pagination and sorting
   - Error handling

2. **tests/test-logger.html** (15 tests)
   - Logging system validation
   - Performance timers
   - Log history and export
   - Log level management

3. **tests/test-integration.html** (10 tests)
   - End-to-end data flow
   - UI component validation
   - Filter combinations
   - Performance tracking

### Running Tests

Simply open any test HTML file in your browser:
```bash
open tests/test-supabase-api.html
open tests/test-logger.html
open tests/test-integration.html
```

Or run automated validation:
```bash
node tests/run-validation.js
```

**Test Coverage:** ~60% (43 tests, 57 validation checks, 100% pass rate)

For detailed test documentation, see [tests/README.md](tests/README.md)

---

## Security Best Practices

### Configuration Security

1. **Never commit API keys**
   - Use `js/config.local.js` for all API keys
   - This file is git-ignored automatically
   - Check with: `git status` (should not show config.local.js)

2. **Use environment-based configuration**
   ```javascript
   // Good: Environment variable with fallback
   const apiKey = window.ENV?.SUPABASE_ANON_KEY || 'fallback';

   // Bad: Hardcoded API key
   const apiKey = '05a7a0d1d2400a0b574acd99748e07a0';
   ```

3. **Review .gitignore regularly**
   - Database files (*.db, *.sqlite)
   - Log files (logs/*)
   - Environment configs (config.local.js)
   - 240 patterns protect sensitive files

### Data Security

- **RLS Policies**: Supabase uses Row-Level Security to protect data
- **Anon Key Only**: Use the anon key (safe for frontend), NEVER the service_role key
- **HTTPS Only**: Always use HTTPS in production
- **Input Validation**: Validate all user input before API calls

### Security Auditing

Run security review:
```bash
node tests/run-validation.js
# Check logs/security_review_*.log for findings
```

---

## Troubleshooting

### Supabase Connection Issues

**Problem:** "Supabase anon key not configured"

**Solution:**
1. Verify `js/config.local.js` exists
2. Check that `SUPABASE_ANON_KEY` is set
3. Ensure key doesn't contain 'PLACEHOLDER'
4. Run tests: `tests/test-supabase-api.html`

---

**Problem:** No listings displayed

**Solution:**
1. Open browser console (F12)
2. Check for error messages
3. Verify API connection: `await SupabaseAPI.init()`
4. Test fetch: `await SupabaseAPI.fetchListings()`
5. Check stats: `SupabaseAPI.getStats()`

---

**Problem:** Tests failing

**Solution:**
1. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
2. Verify internet connection
3. Check Supabase project status
4. Review console errors
5. See [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) troubleshooting section

---

### Performance Issues

**Problem:** Slow page loading

**Solution:**
1. Check cache stats: `SupabaseAPI.getStats()`
2. Use pagination: `fetchListings({ limit: 20 })`
3. Enable browser caching
4. Use local development server

---

### General Troubleshooting

For more detailed troubleshooting:
- [docs/SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md) - Database troubleshooting
- [docs/LOGS.md](docs/LOGS.md) - Logging system guide
- [tests/README.md](tests/README.md) - Test suite help
- Check `logs/` directory for error logs

---

## Project Documentation

Complete documentation is available in the `/docs` directory:

- **[STRUCTURE.md](docs/STRUCTURE.md)** - Project structure and organization
- **[SUPABASE_SETUP.md](docs/SUPABASE_SETUP.md)** - Supabase configuration guide
- **[LOGS.md](docs/LOGS.md)** - Logging system documentation
- **[HANDOFF.md](docs/HANDOFF.md)** - Project handoff guide
- **[FINAL_CHECKLIST.md](docs/FINAL_CHECKLIST.md)** - Pre-deployment checklist

### Additional Resources

- **[tests/README.md](tests/README.md)** - Test suite documentation
- **[changelog/2025-10-09_changes.md](changelog/2025-10-09_changes.md)** - Recent changes
- **[context/2025-10-09_initial_analysis.md](context/2025-10-09_initial_analysis.md)** - Technical analysis

---

## Development

### Prerequisites

- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Local development server (optional but recommended)
- Supabase anon key (for production database)
- Git (for version control)

### Project Structure

```
search_lite/
├── docs/           # Documentation
├── tests/          # Test suite (43 tests)
├── js/             # JavaScript modules
├── css/            # Stylesheets
├── logs/           # Runtime logs (git-ignored)
├── changelog/      # Change history
├── context/        # Session analysis
├── scripts/        # Utility scripts
└── index.html      # Main application
```

See [docs/STRUCTURE.md](docs/STRUCTURE.md) for complete structure documentation.

### Logging System

The application includes a professional logging system (`js/logger.js`):

```javascript
// Log at different levels
Logger.info('Application started');
Logger.debug('Detailed diagnostics', { data });
Logger.warn('Non-critical warning');
Logger.error('Critical error', { error });

// Performance tracking
Logger.startTimer('operation');
// ... do work
Logger.endTimer('operation');  // Logs duration

// Export logs
Logger.exportLogs('json');  // Download logs as JSON
```

See [docs/LOGS.md](docs/LOGS.md) for complete logging documentation.

---

## License
This is a demonstration replica for educational purposes.