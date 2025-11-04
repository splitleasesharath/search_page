# Supabase Setup Guide

**Split Lease Search Lite - Complete Supabase Configuration**

## Overview

This guide walks you through setting up Supabase as the production database for the Split Lease Search Lite application. Supabase provides a PostgreSQL database with 134 active listings, accessible via a REST API.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Information](#database-information)
3. [Getting Your Anon Key](#getting-your-anon-key)
4. [Configuration](#configuration)
5. [Testing the Connection](#testing-the-connection)
6. [Field Mappings](#field-mappings)
7. [RLS Policy Requirements](#rls-policy-requirements)
8. [API Usage Examples](#api-usage-examples)
9. [Troubleshooting](#troubleshooting)
10. [Performance Optimization](#performance-optimization)

---

## Prerequisites

### Required

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Access to Supabase project dashboard
- Text editor for configuration files
- Basic understanding of JavaScript and JSON

### Optional

- Local development server (Python, Node.js, or VS Code Live Server)
- Git for version control

---

## Database Information

### Supabase Project Details

- **URL:** `https://qcfifybkaddcoimjroca.supabase.co`
- **Primary Table:** `listing`
- **Active Listings:** 134
- **API Type:** PostgREST (PostgreSQL REST API)
- **Authentication:** Row-Level Security (RLS) with anon key

### Database Schema

The `listing` table contains **106 fields** including:

- Location data (borough, neighborhood, coordinates)
- Pricing information (nightly rates, fees)
- Property features (bedrooms, bathrooms, amenities)
- Host information (name, photo, email)
- Photos and media (JSONB arrays)
- Availability calendar (JSONB arrays)
- Metadata (created date, modified date, status)

For complete field mappings, see [Field Mappings](#field-mappings) section below.

---

## Getting Your Anon Key

### Step 1: Access Supabase Dashboard

1. Go to https://supabase.com/dashboard
2. Sign in to your account
3. Select your project (qcfifybkaddcoimjroca)

### Step 2: Navigate to API Settings

1. In the left sidebar, click **Settings** (gear icon)
2. Click **API** under the Project Settings section
3. You should see the "API Settings" page

### Step 3: Locate the Anon Key

On the API Settings page, you'll find:

```
Project URL: https://qcfifybkaddcoimjroca.supabase.co

API Keys:
┌─────────────────────────────────────────────────────────┐
│ anon public                                              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXB... │
│ [Show] [Copy]                                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ service_role secret                                      │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXB... │
│ [Show] [Copy]                                           │
└─────────────────────────────────────────────────────────┘
```

### Step 4: Copy the Anon Key

1. Find the **anon public** key (NOT the service_role key)
2. Click **Show** to reveal the full key
3. Click **Copy** to copy it to your clipboard
4. The key should start with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**IMPORTANT:**
- Use the **anon public** key (safe for browser/frontend use)
- NEVER use the **service_role** key in frontend code (security risk)
- The anon key is designed for browser use and respects RLS policies

---

## Configuration

### Step 1: Create Configuration File

Create or edit the file `js/config.local.js` in your project:

```bash
# Navigate to your project directory
cd C:\Users\Split Lease\Documents\search_lite

# Create the configuration file (if it doesn't exist)
touch js/config.local.js
```

### Step 2: Add Your Anon Key

Open `js/config.local.js` in a text editor and add:

```javascript
/**
 * Local Environment Configuration
 *
 * This file is git-ignored and should contain your actual API keys.
 * DO NOT commit this file to version control.
 */

window.ENV = window.ENV || {};

// Supabase anon key (from dashboard)
window.ENV.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ACTUAL_KEY_HERE';

// Optional: Bubble.io API key (if using database-optimized.js)
// window.ENV.BUBBLE_API_KEY = 'your_bubble_api_key_here';
```

### Step 3: Replace Placeholder

Replace `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...YOUR_ACTUAL_KEY_HERE` with your actual anon key from Step 3 above.

**Example:**
```javascript
window.ENV.SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjZmlmeWJrYWRkY29pbWpyb2NhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU4NDk2MDAsImV4cCI6MjAxMTQyNTYwMH0.abcdefghijklmnopqrstuvwxyz1234567890';
```

### Step 4: Verify File is Git-Ignored

Check that `config.local.js` is in your `.gitignore`:

```bash
# Check .gitignore
cat .gitignore | grep config.local
```

You should see:
```
# Local environment config (NEVER commit!)
config.local.js
**/config.local.js
js/config.local.js
```

If not, add it to `.gitignore`:
```bash
echo "config.local.js" >> .gitignore
```

---

## Testing the Connection

### Method 1: Run Test Suite

The easiest way to verify your configuration:

1. Open `tests/test-supabase-api.html` in your browser
2. Click **"Run All Tests"**
3. All tests should pass (18 tests)

**Expected Output:**
```
✓ API initialization
✓ Connection test
✓ Fetch all listings (134 results)
✓ Fetch listing by ID
✓ Borough filter - Manhattan
...
Total: 18 | Passed: 18 | Failed: 0
```

### Method 2: Browser Console Test

1. Open `index.html` in your browser
2. Open browser console (F12)
3. Run this command:

```javascript
await SupabaseAPI.init();
```

**Expected Output:**
```
Initializing Supabase API...
Supabase connection test: SUCCESS
Successfully connected to Supabase
true
```

### Method 3: Fetch Listings Test

In the browser console:

```javascript
const listings = await SupabaseAPI.fetchListings();
console.log(`Fetched ${listings.length} listings`);
console.log('First listing:', listings[0]);
```

**Expected Output:**
```
Fetching listings from Supabase: https://...
Received 134 listings from Supabase
Fetched 134 listings
First listing: {
  id: "...",
  title: "Cozy Brooklyn Studio",
  Borough: "Brooklyn",
  priceStarting: 150,
  bedrooms: 1,
  ...
}
```

---

## Field Mappings

The Supabase API automatically transforms database fields to application format.

### Core Fields

| Supabase Field | Application Field | Type | Example |
|----------------|-------------------|------|---------|
| `_id` | `id`, `_id` | String | "1234567890abcdef" |
| `Title` | `title`, `name`, `listingName` | String | "Cozy Brooklyn Studio" |
| `Location - Borough` | `Borough`, `borough` | String | "Brooklyn" |
| `Location - Hood` | `Neighborhood`, `neighborhood` | String | "Williamsburg" |
| `Starting nightly price` | `price`, `priceStarting` | Number | 150 |
| `Features - Qty Bedrooms` | `bedrooms`, `Qty of bedrooms` | Number | 2 |
| `Features - Qty Bathrooms` | `bathrooms`, `Qty of bathrooms` | Number | 1 |
| `Features - Qty Guests` | `maxGuests`, `Qty of guests allowed` | Number | 4 |
| `Type of Space` | `typeOfSpace`, `Type of space` | String | "Entire place" |

### Location Fields (JSONB)

The `Location - Address` field is a JSONB object containing:

```javascript
{
  "address": "123 Main St, Brooklyn, NY 11211",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "city": "Brooklyn",
  "state": "NY",
  "zipCode": "11211"
}
```

**Transformed to:**
```javascript
{
  locationAddress: "123 Main St, Brooklyn, NY 11211",
  listing_address_latitude: 40.7128,
  listing_address_longitude: -74.0060,
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  }
}
```

### Photos (JSONB Array)

The `Features - Photos` field contains an array of photo IDs:

```javascript
["photo_id_1", "photo_id_2", "photo_id_3"]
```

To fetch actual photo URLs, use:
```javascript
const photos = await SupabaseAPI.fetchPhotos(listing.photos);
```

### Amenities (JSONB Arrays)

```javascript
{
  "Features - Amenities In-Unit": ["WiFi", "Kitchen", "Washer"],
  "Features - Amenities In-Building": ["Gym", "Doorman", "Elevator"]
}
```

**Transformed to:**
```javascript
{
  amenitiesInUnit: ["WiFi", "Kitchen", "Washer"],
  amenitiesInBuilding: ["Gym", "Doorman", "Elevator"]
}
```

### Days Available (JSONB Array)

```javascript
{
  "Days Available (List of Days)": [
    "2025-10-10",
    "2025-10-11",
    "2025-10-12"
  ]
}
```

**Transformed to:**
```javascript
{
  daysAvailable: ["2025-10-10", "2025-10-11", "2025-10-12"]
}
```

---

## RLS Policy Requirements

### Current RLS Policies

The `listing` table has Row-Level Security (RLS) enabled with the following policies:

#### 1. Public Read Access (anon role)

**Policy Name:** `anon_read_active_approved`

**Allows:** Read-only access to active and approved listings

**SQL:**
```sql
CREATE POLICY "anon_read_active_approved" ON listing
FOR SELECT
TO anon
USING (Active = true AND Approved = true);
```

**Effect:** Users with the anon key can only see listings where:
- `Active = true`
- `Approved = true`

### Verifying RLS Policies

To verify RLS policies in Supabase Dashboard:

1. Go to **Database** → **Tables**
2. Select the `listing` table
3. Click **Policies** tab
4. You should see the `anon_read_active_approved` policy

### Testing RLS

The API automatically filters for active and approved listings:

```javascript
// This is handled automatically by the API
const listings = await SupabaseAPI.fetchListings();
// Returns only listings where Active=true AND Approved=true
```

---

## API Usage Examples

### Basic Fetching

```javascript
// Fetch all active listings (up to 100)
const allListings = await SupabaseAPI.fetchListings();

// Fetch with custom limit
const first20 = await SupabaseAPI.fetchListings({ limit: 20 });

// Fetch with pagination
const page2 = await SupabaseAPI.fetchListings({
  limit: 20,
  offset: 20
});
```

### Filtering

```javascript
// Filter by borough
const manhattanListings = await SupabaseAPI.fetchListings({
  borough: 'Manhattan'
});

// Filter by neighborhood
const williamsburgListings = await SupabaseAPI.fetchListings({
  neighborhood: 'Williamsburg'
});

// Filter by price range
const affordableListings = await SupabaseAPI.fetchListings({
  priceMin: 0,
  priceMax: 200
});

// Filter by bedrooms
const twoBedrooms = await SupabaseAPI.fetchListings({
  minBedrooms: 2,
  maxBedrooms: 2
});

// Filter by space type
const entirePlaces = await SupabaseAPI.fetchListings({
  spaceType: 'Entire place'
});
```

### Combined Filters

```javascript
// Brooklyn, 2 bedrooms, under $300/night
const filtered = await SupabaseAPI.fetchListings({
  borough: 'Brooklyn',
  minBedrooms: 2,
  priceMax: 300
});
```

### Sorting

```javascript
// Sort by price (low to high)
const cheapest = await SupabaseAPI.fetchListings({
  sortBy: 'price-low'
});

// Sort by price (high to low)
const expensive = await SupabaseAPI.fetchListings({
  sortBy: 'price-high'
});

// Sort by recently updated
const recent = await SupabaseAPI.fetchListings({
  sortBy: 'recent'
});

// Sort by recommended (search ranking)
const recommended = await SupabaseAPI.fetchListings({
  sortBy: 'recommended'
});
```

### Fetch by ID

```javascript
// Get specific listing
const listing = await SupabaseAPI.fetchListingById('1234567890abcdef');

if (listing) {
  console.log(`Found: ${listing.title}`);
} else {
  console.log('Listing not found');
}
```

### Fetch Photos

```javascript
// Get listing with photos
const listing = await SupabaseAPI.fetchListingById('123...');
const photos = await SupabaseAPI.fetchPhotos(listing.photos);

photos.forEach(photo => {
  console.log(`Photo URL: ${photo.url}`);
  console.log(`Thumbnail: ${photo.thumbnail}`);
  console.log(`Caption: ${photo.caption}`);
});
```

### Cache Management

```javascript
// Clear cache to force fresh data
SupabaseAPI.clearCache();

// Check cache stats
const stats = SupabaseAPI.getStats();
console.log(`Cache hits: ${stats.cacheHits}`);
console.log(`API requests: ${stats.requestCount}`);
console.log(`Cache efficiency: ${(stats.cacheHits / stats.requestCount * 100).toFixed(1)}%`);
```

### Error Handling

```javascript
// API handles errors gracefully
const listings = await SupabaseAPI.fetchListings();

if (listings.length === 0) {
  const stats = SupabaseAPI.getStats();

  if (stats.errors > 0) {
    console.error('API Error:', stats.lastError);
    // Show user-friendly error message
  } else {
    console.log('No listings found (valid empty result)');
  }
}
```

---

## Troubleshooting

### Problem: "Supabase anon key not configured"

**Symptoms:**
- Console warning: `Supabase anon key not configured`
- Tests fail with "API not initialized"
- No listings displayed

**Solution:**
1. Verify `js/config.local.js` exists
2. Check that `SUPABASE_ANON_KEY` is set
3. Ensure key doesn't contain 'PLACEHOLDER' or 'your_'
4. Refresh browser and check console

---

### Problem: "Failed to connect to Supabase"

**Symptoms:**
- Console error: `Supabase connection test failed: 401 Unauthorized`
- Tests fail on connection test
- Empty listings array

**Solution:**

**Check 1: Verify Anon Key**
```javascript
console.log(window.ENV.SUPABASE_ANON_KEY);
// Should show: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Check 2: Test Connection Directly**
```javascript
const response = await fetch(
  'https://qcfifybkaddcoimjroca.supabase.co/rest/v1/listing?limit=1',
  {
    headers: {
      'apikey': window.ENV.SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${window.ENV.SUPABASE_ANON_KEY}`
    }
  }
);
console.log('Status:', response.status);
```

**Check 3: Verify Key Validity**
1. Go back to Supabase Dashboard
2. API Settings → Anon Key
3. Click "Regenerate" if needed
4. Copy new key to config.local.js

---

### Problem: No listings returned (empty array)

**Symptoms:**
- API connects successfully
- `fetchListings()` returns `[]`
- No console errors

**Possible Causes:**

**Cause 1: All listings inactive/unapproved**
```javascript
// Check database directly (use service_role key in dashboard SQL editor)
SELECT COUNT(*) FROM listing WHERE Active = true AND Approved = true;
```

**Cause 2: Filters too restrictive**
```javascript
// Try without filters
const all = await SupabaseAPI.fetchListings({});
console.log(`Total listings: ${all.length}`);

// Then try with filters
const filtered = await SupabaseAPI.fetchListings({ borough: 'Manhattan' });
console.log(`Manhattan listings: ${filtered.length}`);
```

**Cause 3: RLS policy blocking**
```javascript
// Check stats for errors
const stats = SupabaseAPI.getStats();
console.log('Stats:', stats);
```

---

### Problem: CORS errors

**Symptoms:**
- Console error: `CORS policy: No 'Access-Control-Allow-Origin'`
- Network tab shows failed preflight requests

**Solution:**

**Check 1: Use HTTPS or local server**
```bash
# Don't open file:// directly, use a server
python -m http.server 8000
# Then open http://localhost:8000
```

**Check 2: Check Supabase CORS settings**
1. Dashboard → Settings → API
2. Verify "Allow all origins" is enabled (development)
3. For production, add your domain to allowed origins

---

### Problem: Slow API responses

**Symptoms:**
- API takes >3 seconds to respond
- Tests timeout
- Page feels sluggish

**Solutions:**

**Solution 1: Check cache**
```javascript
const stats = SupabaseAPI.getStats();
console.log(`Cache hit rate: ${(stats.cacheHits / stats.requestCount * 100).toFixed(1)}%`);
// Should be >50% for repeat requests
```

**Solution 2: Reduce limit**
```javascript
// Instead of fetching all 134 listings
const listings = await SupabaseAPI.fetchListings({ limit: 20 });
```

**Solution 3: Use pagination**
```javascript
// Load more as user scrolls
let offset = 0;
const pageSize = 20;

async function loadMore() {
  const listings = await SupabaseAPI.fetchListings({
    limit: pageSize,
    offset: offset
  });
  offset += pageSize;
  return listings;
}
```

---

### Problem: Photos not loading

**Symptoms:**
- Listing data loads correctly
- Photo URLs are IDs instead of URLs
- Images broken

**Solution:**

```javascript
// WRONG: Using photo IDs directly
const listing = await SupabaseAPI.fetchListingById('123...');
console.log(listing.photos);  // ['photo_id_1', 'photo_id_2']
// Can't display these IDs as images!

// CORRECT: Fetch actual photo objects
const listing = await SupabaseAPI.fetchListingById('123...');
const photoObjects = await SupabaseAPI.fetchPhotos(listing.photos);
console.log(photoObjects[0].url);  // 'https://...'
```

---

## Performance Optimization

### 1. Use the Built-in Cache

The API caches results for 5 minutes:

```javascript
// First call: Fetches from API (~500ms)
const listings1 = await SupabaseAPI.fetchListings({ borough: 'Manhattan' });

// Second call: Returns from cache (<50ms)
const listings2 = await SupabaseAPI.fetchListings({ borough: 'Manhattan' });

// Different filters: New API call
const listings3 = await SupabaseAPI.fetchListings({ borough: 'Brooklyn' });
```

### 2. Fetch Only What You Need

```javascript
// ❌ BAD: Fetching all listings
const all = await SupabaseAPI.fetchListings();
const manhattanOnly = all.filter(l => l.Borough === 'Manhattan');

// ✅ GOOD: Filter on server
const manhattanOnly = await SupabaseAPI.fetchListings({
  borough: 'Manhattan'
});
```

### 3. Use Pagination

```javascript
// ❌ BAD: Loading 134 listings at once
const listings = await SupabaseAPI.fetchListings();
displayListings(listings);

// ✅ GOOD: Load 20 at a time
const page1 = await SupabaseAPI.fetchListings({ limit: 20, offset: 0 });
displayListings(page1);

// Load more button clicked
const page2 = await SupabaseAPI.fetchListings({ limit: 20, offset: 20 });
appendListings(page2);
```

### 4. Lazy Load Photos

```javascript
// ❌ BAD: Loading all photos upfront
const listings = await SupabaseAPI.fetchListings();
for (const listing of listings) {
  listing.photoUrls = await SupabaseAPI.fetchPhotos(listing.photos);
}

// ✅ GOOD: Load photos when listing is viewed
const listings = await SupabaseAPI.fetchListings();
displayListings(listings);  // Show with placeholder images

function onListingClick(listing) {
  const photos = await SupabaseAPI.fetchPhotos(listing.photos);
  showPhotoGallery(photos);
}
```

### 5. Monitor Performance

```javascript
// Log API stats periodically
setInterval(() => {
  const stats = SupabaseAPI.getStats();
  console.log('API Performance:', {
    requests: stats.requestCount,
    cacheHits: stats.cacheHits,
    errors: stats.errors,
    hitRate: `${(stats.cacheHits / stats.requestCount * 100).toFixed(1)}%`
  });
}, 60000);  // Every minute
```

---

## Security Best Practices

### 1. Never Commit config.local.js

```bash
# Verify it's git-ignored
git status
# Should NOT show config.local.js

# If it appears, add to .gitignore
echo "config.local.js" >> .gitignore
git rm --cached js/config.local.js
```

### 2. Use Anon Key Only

```javascript
// ✅ GOOD: Using anon key (safe for frontend)
window.ENV.SUPABASE_ANON_KEY = 'eyJ...anon...';

// ❌ BAD: NEVER use service_role in frontend
// window.ENV.SUPABASE_SERVICE_KEY = 'eyJ...service_role...';
```

### 3. Validate User Input

```javascript
// ❌ BAD: Direct user input to API
const borough = userInput.value;
const listings = await SupabaseAPI.fetchListings({ borough });

// ✅ GOOD: Validate and sanitize
const allowedBoroughs = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'];
const borough = allowedBoroughs.includes(userInput.value) ? userInput.value : null;
if (borough) {
  const listings = await SupabaseAPI.fetchListings({ borough });
}
```

### 4. Handle Errors Gracefully

```javascript
// ❌ BAD: Exposing errors to users
try {
  const listings = await SupabaseAPI.fetchListings();
} catch (error) {
  alert(`Error: ${error.message}`);  // Reveals technical details
}

// ✅ GOOD: User-friendly error messages
const listings = await SupabaseAPI.fetchListings();
if (listings.length === 0) {
  const stats = SupabaseAPI.getStats();
  if (stats.errors > 0) {
    showMessage('Unable to load listings. Please try again later.');
    console.error('Technical error:', stats.lastError);  // Log for debugging
  }
}
```

---

## Related Documentation

- [README.md](../README.md) - Main project documentation
- [LOGS.md](LOGS.md) - Logging system (includes Supabase logging)
- [STRUCTURE.md](STRUCTURE.md) - Project structure
- [tests/README.md](../tests/README.md) - Test suite (includes Supabase tests)
- [context/2025-10-09_initial_analysis.md](../context/2025-10-09_initial_analysis.md) - Supabase discovery process

---

## Summary

### Quick Start Checklist

- [ ] Access Supabase Dashboard
- [ ] Copy anon key from API Settings
- [ ] Create `js/config.local.js`
- [ ] Add anon key to config file
- [ ] Verify file is git-ignored
- [ ] Open `tests/test-supabase-api.html`
- [ ] Run tests (should see 18/18 pass)
- [ ] Fetch listings in console
- [ ] Verify 134 listings returned

### Key Points

- **Database:** 134 active listings in PostgreSQL
- **API:** PostgREST with RLS for security
- **Authentication:** Anon key (safe for frontend)
- **Caching:** 5-minute automatic cache
- **Fields:** 106 database fields, auto-transformed
- **Testing:** 18 comprehensive tests

### Support

If you encounter issues not covered in troubleshooting:

1. Check browser console for errors
2. Review `logs/` directory for error logs
3. Run test suite for diagnostic information
4. Check Supabase Dashboard status page
5. Verify RLS policies in database settings

---

**Last Updated:** 2025-10-09
**Version:** 1.0.0
**Supabase API Client:** js/supabase-api.js (585 lines)
