# Maintenance Guide

## Quick Start

### Adding New Features

**New Filter Type**
1. Add to `filteroptions` table in Supabase
2. FilterConfig auto-loads on next page load
3. Add UI element in `index.html`
4. No code changes needed (database-driven)

**New Listing Field**
1. Add column to Supabase `listings` table
2. Update `supabase-api.js` → `transformListing()` function
3. Add to UI template in `app.js` → `createListingCard()`

## Updating API Credentials

**All credentials in:** `js/config.js` (window.ENV object)

**To rotate:**
1. Update value in `config.js`
2. No other file changes needed (all reference `window.ENV`)
3. For production, use environment variables

## Debugging

**Enable debug logging:**
```javascript
window.Logger.setMinLevel(window.Logger.LogLevel.DEBUG);
```

**View error history:**
```javascript
window.Logger.getErrors(); // Last 50 errors
```

## Common Issues

### Listings Not Loading
1. Check browser console for Supabase errors
2. Verify API key in `config.js` is valid
3. Check Supabase service status

### Map Not Showing
1. Verify Google Maps API key in `config.js`
2. Check browser console for authentication errors
3. Ensure Maps JavaScript API is enabled in Google Cloud Console

### Filters Not Working
1. Check FilterConfig loaded: `console.log(window.FilterConfig)`
2. Verify filter options in Supabase `filteroptions` table
3. Check console for SQL query errors

### Toast Notifications Not Appearing
1. Verify CSS file loaded: check Network tab
2. Check for JavaScript errors in console
3. Ensure `showToast()` function exists in `app.js`

## Testing Checklist

**After Any Changes:**
- [ ] Page loads without console errors
- [ ] Listings display correctly
- [ ] All filters work (borough, neighborhood, price, week pattern)
- [ ] Zero results fallback works
- [ ] Map shows markers correctly
- [ ] Contact host modal opens
- [ ] Schedule selector works
- [ ] No `alert()` dialogs appear (should use toast)

## File Structure
```
search-page-2/
├── js/
│   ├── config.js              # All API credentials (EDIT THIS)
│   ├── supabase-api.js        # Database client
│   ├── filter-config.js       # Filter logic
│   ├── app.js                 # Main application
│   ├── logger.js              # Logging system
│   └── schedule-selector-integration.js  # React component
├── css/
│   └── styles.css             # Includes toast styles
├── components/
│   └── ContactHost/
│       └── contact-host-messaging.js  # Messaging modal
├── index.html                 # Main page
├── .env.example               # Environment template
├── ARCHITECTURE.md            # This file
└── MAINTENANCE.md             # You are here
```

## Code Quality Standards

**DO:**
- Use `window.Logger` for logging (not `console.log`)
- Use `showToast()` for user feedback (not `alert()`)
- Reference `window.ENV` for all credentials
- Add proper error handling with try/catch

**DON'T:**
- Hardcode API keys or credentials
- Use `alert()` for user messages
- Add `console.log` statements (use Logger)
- Hardcode data that belongs in database

## Deployment

**Local Development:**
1. Copy `.env.example` to `.env`
2. Fill in actual API keys
3. Open `index.html` in browser

**Production (Cloudflare Pages):**
1. Set environment variables in Cloudflare dashboard
2. Build command: `node build-cloudflare.js`
3. Build script injects ENV values into `config.js`
