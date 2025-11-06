# Split Lease Search Page - Architecture

## Overview
Single-page search interface for NYC split lease properties, powered by Supabase database.

## Core Stack
- **Frontend:** Vanilla JS + React (Schedule Selector only)
- **Backend:** Supabase PostgreSQL + Bubble.io workflows
- **Maps:** Google Maps JavaScript API

## Data Flow
```
Supabase DB → SupabaseAPI.js → FilterConfig.js → App.js → UI Components
```

## Key Design Decisions

### 1. No Image Fallbacks (Intentional)
**Decision:** Return empty array when photos missing, don't show placeholders  
**Rationale:** Wrong property images could mislead users  
**Location:** `supabase-api.js:397-464`

### 2. Zero Results Fallback
**Decision:** Auto-show all listings when filters produce zero results  
**Rationale:** Better UX than empty page; notice explains behavior  
**Location:** `app.js:649-662`

### 3. Database-Driven Filtering
**Decision:** Load borough/neighborhood options from database, not hardcoded  
**Rationale:** Single source of truth, easier updates  
**Location:** `filter-config.js:74-273`

### 4. Consolidated Credentials
**Decision:** All API keys centralized in `config.js` via `window.ENV`  
**Rationale:** Easy rotation, environment-based configuration  
**Location:** `js/config.js`

## Component Dependencies
```
config.js (loads first)
  ├─ supabase-api.js
  ├─ filter-config.js
  ├─ logger.js
  └─ app.js
      ├─ schedule-selector-integration.js (React)
      └─ contact-host-messaging.js (Bubble workflow)
```

## State Management
- `window.selectedDays` - Array of selected day indices (0-6)
- `window.currentListings` - Currently displayed listings after filters
- `window.mapMarkers` - Google Maps marker objects
- `window.SupabaseAPI` - Singleton Supabase client
- `window.FilterConfig` - Filter configuration from database
- `window.ENV` - Environment variables and API credentials

## API Integration
- **Supabase:** Primary data source (listings, photos, filters)
- **Google Maps:** Map visualization and geocoding
- **Bubble Workflows:** Contact host messaging, AI signup

## Environment Detection
- **Development:** `localhost` or `127.0.0.1` → DEBUG logging
- **Staging:** Domains with `staging/test/preview` → INFO logging
- **Production:** All other domains → WARN logging only

Auto-configured in `config.js`, adjusts Logger verbosity automatically.
