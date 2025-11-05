# Filter to Database Field Mapping
## Complete Mapping of All Search Filter Options to Supabase Database Fields

**Purpose:** This document maps every user-facing filter option to its corresponding Supabase database field for error checking and validation.

---

## 1. BOROUGH FILTER

**UI Location:** `index.html` lines 85-94, Filter panel dropdown
**Frontend Variable:** `boroughSelect`
**Filter Config:** `filter-config.js` lines 10-18 (`BOROUGH_IDS`)

| Frontend Value | Display Name | Database Field | Database Value (Foreign Key ID) |
|----------------|--------------|----------------|----------------------------------|
| `bergen` | Bergen County NJ | `Location - Borough` | `1607041299747x827062990768184900` |
| `bronx` | Bronx | `Location - Borough` | `1607041299714x866026028780297600` |
| `brooklyn` | Brooklyn | `Location - Borough` | `1607041299637x913970439175620100` |
| `essex` | Essex County NJ | `Location - Borough` | `1607041299777x826854337748672500` |
| `hudson` | Hudson County NJ | `Location - Borough` | `1607041299803x542854758464683600` |
| `manhattan` | Manhattan | `Location - Borough` | `1607041299687x679479834266385900` |
| `queens` | Queens | `Location - Borough` | `1607041299664x679850027677426300` |

**Database Details:**
- **Table:** `listing`
- **Column:** `Location - Borough` (text type)
- **Is Foreign Key:** ✅ **YES - Validated via MCP**
- **Foreign Key To:** `zat_geo_borough_toplevel._id`
- **Lookup Display Column:** `"Display Borough"`
- **Data Integrity:** 100% valid (12/12 active listings have valid references)
- **Query Implementation:** `supabase-api.js` line 69
- **Query Operator:** `.in('Location - Borough', filters.boroughs)`

**✅ VALIDATION CONFIRMED:** All values in this field are Bubble IDs (format: `\d+x\d+`) that correctly reference the lookup table.

---

## 2. WEEK PATTERN FILTER

**UI Location:** `index.html` lines 98-106, Filter panel dropdown
**Frontend Variable:** `weekPattern`
**Filter Config:** `filter-config.js` lines 24-29 (`WEEK_PATTERNS`)

| Frontend Value | Display Name | Database Field | Database Value (Exact Match) |
|----------------|--------------|----------------|------------------------------|
| `every-week` | Every week | `Weeks offered` | `Every week` |
| `one-on-off` | One week on, one week off | `Weeks offered` | `One week on, one week off` |
| `two-on-off` | Two weeks on, two weeks off | `Weeks offered` | `Two weeks on, two weeks off` |
| `one-three-off` | One week on, three weeks off | `Weeks offered` | `One week on, three weeks off` |

**Database Details:**
- **Table:** `listing`
- **Column:** `Weeks offered` (text type, NOT NULL)
- **Is Foreign Key:** ❌ **NO - Plain Text Values (Validated via MCP)**
- **Actual Database Values Found:** `"Every week"`, `"One week on, one week off"`
- **Query Implementation:** `supabase-api.js` line 75
- **Query Operator:** `.in('Weeks offered', filters.weekPatterns)`

**✅ VALIDATION CONFIRMED:** This field contains plain text enum values, NOT Bubble IDs. Direct string matching is correct.

---

## 3. PRICE TIER FILTER

**UI Location:** `index.html` lines 109-118, Filter panel dropdown
**Frontend Variable:** `priceTier`
**Filter Config:** `filter-config.js` lines 35-41 (`PRICE_TIERS`)

| Frontend Value | Display Name | Database Field | Database Query Logic |
|----------------|--------------|----------------|----------------------|
| `under-200` | < $200/night | `Standarized Minimum Nightly Price (Filter)` | min: 0, max: 199.99 |
| `200-350` | $200-$350/night | `Standarized Minimum Nightly Price (Filter)` | min: 200, max: 350 |
| `350-500` | $350-$500/night | `Standarized Minimum Nightly Price (Filter)` | min: 350.01, max: 500 |
| `500-plus` | $500+/night | `Standarized Minimum Nightly Price (Filter)` | min: 500.01, max: 999999 |
| `all` | All Prices | `Standarized Minimum Nightly Price (Filter)` | No filter applied |

**Database Details:**
- **Table:** `listing`
- **Column:** `Standarized Minimum Nightly Price (Filter)` (numeric type)
- **Foreign Key:** None (direct numeric comparison)
- **Query Implementation:** `supabase-api.js` lines 79-87
- **Query Operator:** `.gte()` and `.lte()` for range filtering

**⚠️ NOTE:** Column name has a typo - "Standarized" instead of "Standardized"

---

## 4. NEIGHBORHOOD FILTER

**UI Location:** `index.html` lines 132-166, Filter panel checkboxes
**Frontend Variable:** `neighborhoods` (array)
**Filter Config:** `filter-config.js` lines 47-77 (`NEIGHBORHOOD_ID_MAP`)

**Sample Mappings (28 hardcoded neighborhoods):**

| Frontend Value (kebab-case) | Display Name | Database Field | Database Value (Foreign Key ID) |
|-----------------------------|--------------|----------------|----------------------------------|
| `alphabet-city` | Alphabet City | `Location - Hood` | `1686665230140x391210370437286460` |
| `central-harlem` | Central Harlem | `Location - Hood` | `1686665230141x230398124637156930` |
| `chinatown` | Chinatown | `Location - Hood` | `1686665230141x776267324259844400` |
| `civic-center` | Civic Center | `Location - Hood` | `1686665230141x755924307821723600` |
| `clinton` | Clinton | `Location - Hood` | `1686665230141x109760773900222880` |
| `east-village` | East Village | `Location - Hood` | `1686665230142x112378752684300980` |
| `financial-district` | Financial District | `Location - Hood` | `1686665230151x890139725988428000` |
| `flatiron` | Flatiron | `Location - Hood` | `1686665230152x267314860159501250` |
| `gramercy` | Gramercy | `Location - Hood` | `1686665230152x620128845984789800` |
| `greenwich-village` | Greenwich Village | `Location - Hood` | `1686665230152x612341317545480300` |
| `harlem` | Harlem | `Location - Hood` | `1686665230152x605333115253335400` |
| `hells-kitchen` | Hell's Kitchen | `Location - Hood` | `1686665230152x946040790740281700` |
| `lenox-hill` | Lenox Hill | `Location - Hood` | `1686665230152x107491527623286400` |
| `little-italy` | Little Italy | `Location - Hood` | `1686665230155x602601280086412900` |
| `lower-east-side` | Lower East Side | `Location - Hood` | `1686665230155x453679119750186400` |
| `manhattan-valley` | Manhattan Valley | `Location - Hood` | `1686665230155x464862775699738100` |
| `meatpacking` | Meatpacking District | `Location - Hood` | `1686665230156x383426092121550660` |
| `midtown` | Midtown | `Location - Hood` | `1686665230156x919393222700867700` |
| `morningside` | Morningside Heights | `Location - Hood` | `1686665230156x619700681333798900` |
| `murray-hill` | Murray Hill | `Location - Hood` | `1686665230156x189072522158048260` |
| `noho` | NoHo | `Location - Hood` | `1686665230156x796622800256194800` |
| `soho` | SoHo | `Location - Hood` | `1686665230165x715885378733032800` |
| `sutton` | Sutton Place | `Location - Hood` | `1686665230165x766503309591935400` |
| `tribeca` | TriBeCa | `Location - Hood` | `1686665230165x338198443257803600` |
| `turtle-bay` | Turtle Bay | `Location - Hood` | `1686665230166x938784065484759300` |
| `ues` | Upper East Side (UES) | `Location - Hood` | `1686665230166x869557584945557300` |
| `uws` | Upper West Side (UWS) | `Location - Hood` | `1686665230166x210607508191402500` |
| `west-village` | West Village | `Location - Hood` | `1686665230366x524476031487277800` |
| `yorkville` | Yorkville | `Location - Hood` | `1686665230367x729164037248075600` |

**Database Details:**
- **Table:** `listing`
- **Column:** `Location - Hood` (text type)
- **Is Foreign Key:** ✅ **YES - Validated via MCP**
- **Foreign Key To:** `zat_geo_hood_mediumlevel._id`
- **Lookup Display Column:** `"Display"`
- **Sample Valid Mappings:**
  - `1686665230141x301148839537636900` → "East Harlem"
  - `1686666406575x878767767933899400` → "Clinton Hill"
  - `1686665230141x755924307821723600` → "Civic Center"
  - `1686665230156x189072522158048260` → "Murray Hill"
- **Data Integrity:** 100% valid (12/12 active listings have valid references)
- **Total Available Neighborhoods:** 293 (only 28 hardcoded in frontend)
- **Query Implementation:** `supabase-api.js` line 92
- **Query Operator:** `.in('Location - Hood', filters.neighborhoods)`
- **Dynamic Population:** `app.js` lines 667-712 (`populateNeighborhoods()`)

**⚠️ IMPORTANT:** The frontend dynamically populates neighborhoods from loaded listings, but the hardcoded mapping only covers 28 Manhattan neighborhoods. The database has 293 total neighborhoods across all boroughs.

**✅ VALIDATION CONFIRMED:** All values in this field are Bubble IDs that correctly reference the lookup table.

---

## 5. SORT OPTIONS

**UI Location:** `index.html` lines 121-129, Filter panel dropdown
**Frontend Variable:** `sortBy`
**Filter Config:** `filter-config.js` lines 83-104 (`SORT_OPTIONS`)

| Frontend Value | Display Name | Database Field | Sort Direction |
|----------------|--------------|----------------|----------------|
| `recommended` | Our Recommendations | `Modified Date` | Descending (newest first) |
| `price-low` | Price-Lowest to Highest | `Standarized Minimum Nightly Price (Filter)` | Ascending (low to high) |
| `most-viewed` | Most Viewed | `Metrics - Click Counter` | Descending (most clicks first) |
| `recent` | Recently Added | `Created Date` | Descending (newest first) |

**Database Details:**
- **Table:** `listing`
- **Columns:**
  - `Modified Date` (timestamp with time zone, NOT NULL)
  - `Standarized Minimum Nightly Price (Filter)` (numeric)
  - `Metrics - Click Counter` (integer)
  - `Created Date` (timestamp with time zone, NOT NULL)
- **Query Implementation:** `supabase-api.js` lines 96-104
- **Query Operator:** `.order(sortField, { ascending: filters.sort.ascending })`

---

## 6. SCHEDULE SELECTOR (DAYS/NIGHTS)

**UI Location:** `index.html` line 78, React component mount point
**Frontend Variable:** `selectedDays` (array of day indices 0-6)
**Component:** Schedule Selector (React)
**Integration:** `js/schedule-selector-integration.js`

**This filter affects PRICE LOOKUP, not direct filtering:**

| Selected Days Count | Nights Count | Database Field Lookup |
|---------------------|--------------|------------------------|
| 2 days | 1 night | `Starting nightly price` |
| 3 days | 2 nights | `Price 2 nights selected` OR `💰Nightly Host Rate for 2 nights` |
| 4 days | 3 nights | `Price 3 nights selected` OR `💰Nightly Host Rate for 3 nights` |
| 5 days | 4 nights | `Price 4 nights selected` OR `💰Nightly Host Rate for 4 nights` |
| 6 days | 5 nights | `Price 5 nights selected` OR `💰Nightly Host Rate for 5 nights` |
| 7 days | 6 nights | `Price 6 nights selected` (NOT IN DATABASE) |
| 8 days | 7 nights | `Price 7 nights selected` OR `💰Nightly Host Rate for 7 nights` |

**Database Details:**
- **Table:** `listing`
- **Columns:**
  - `Starting nightly price` - Transformed field (NOT in database)
  - `Standarized Minimum Nightly Price (Filter)` (numeric) - Base price
  - `💰Nightly Host Rate for 2 nights` (numeric)
  - `💰Nightly Host Rate for 3 nights` (numeric)
  - `💰Nightly Host Rate for 4 nights` (numeric)
  - `💰Nightly Host Rate for 5 nights` (numeric)
  - `💰Nightly Host Rate for 7 nights` (numeric)
- **Price Calculation:** `app.js` lines 14-40 (`calculateDynamicPrice()`)
- **Transformation:** `supabase-api.js` lines 248-260

**⚠️ MISSING FIELD:** `Price 6 nights selected` is referenced in code but does NOT exist in database

---

## 7. HIDDEN/AUTOMATIC FILTERS

These filters are applied automatically but not directly controlled by user input:

### 7.1 Active Status Filter
- **Frontend:** Always applied
- **Database Field:** `Active` (boolean, in listing table)
- **Database Value:** `true`
- **Query:** `supabase-api.js` line 63

### 7.2 Approved Status Filter
- **Frontend:** Always applied
- **Database Field:** `Approved` (boolean, in listing table)
- **Database Value:** `true`
- **Query:** `supabase-api.js` line 64

---

## 8. DISPLAY-ONLY FIELDS (Not Filters)

These database fields are used for display purposes but are NOT filterable:

### Listing Details Display
| Display Purpose | Database Field | Data Type | Foreign Key? | Lookup Table |
|----------------|----------------|-----------|--------------|--------------|
| Listing Title | `Name` | text | ❌ No | N/A |
| Description | `Description` | text | ❌ No | N/A |
| Square Feet | `Features - SQFT Area` | integer | ❌ No | N/A |
| Bedrooms | `Features - Qty Bedrooms` | integer | ❌ No | N/A |
| Bathrooms | `Features - Qty Bathrooms` | integer | ❌ No | N/A |
| Max Guests | `Features - Qty Guests` | integer | ❌ No | N/A |
| Space Type | `Features - Type of Space` | text | ✅ **YES** | `zat_features_listingtype` (use `"Label "` column) |
| Kitchen Type | `Kitchen Type` | text | ❌ **NO** | Plain text: "Full Kitchen", "Kitchenette" |

### Location Display
| Display Purpose | Database Field | Data Type | Usage Location |
|----------------|----------------|-----------|----------------|
| Neighborhood Name | `Location - Hood` | text (FK) | Location tag |
| Borough Name | `Location - Borough` | text (FK) | Location tag |
| Address | `Location - Address` | jsonb | Map coordinates |
| Latitude | `listing_address_latitude` | numeric | Map markers |
| Longitude | `listing_address_longitude` | numeric | Map markers |

### Host Information Display
| Display Purpose | Database Field | Data Type | Usage Location |
|----------------|----------------|-----------|----------------|
| Host Name | `host name` | text | Host card |
| Host Email | `Host email` | text | Messaging |

### Photo Display
| Display Purpose | Database Field | Data Type | Usage Location |
|----------------|----------------|-----------|----------------|
| Photo IDs Array | `Features - Photos` | jsonb | Image carousel |
| Photo URL | `Photo` (from listing_photo table) | text | Image src |

### Metrics Display
| Display Purpose | Database Field | Data Type | Usage Location |
|----------------|----------------|-----------|----------------|
| Click Counter | `Metrics - Click Counter` | integer | Popularity sorting |
| Viewers | `Viewers` | jsonb | Analytics |
| Clickers | `Clickers` | jsonb | Analytics |

### Availability Display
| Display Purpose | Database Field | Data Type | Usage Location |
|----------------|----------------|-----------|----------------|
| Days Available | `Days Available (List of Days)` | jsonb | Schedule display |
| Nights Available | `Nights Available (List of Nights)` | jsonb | Schedule display |
| Minimum Nights | `Minimum Nights` | integer | Booking rules |
| Weeks Offered | `Weeks offered` | text | ALSO USED AS FILTER |

---

## 9. TRANSFORMATION MAPPINGS

The frontend transforms database values for display. Here are the key transformations:

### Borough ID → Display Name
**Source:** `supabase-api.js` lines 331-344 (`normalizeBoroughName()`)

| Database ID | Normalized Name | Display Name |
|-------------|-----------------|--------------|
| `1607041299687x679479834266385900` | `manhattan` | Manhattan |
| `1607041299637x913970439175620100` | `brooklyn` | Brooklyn |
| `1607041299664x679850027677426300` | `queens` | Queens |
| `1607041299714x866026028780297600` | `bronx` | Bronx |
| `1607041299747x827062990768184900` | `bergen` | Bergen County NJ |
| `1607041299777x826854337748672500` | `essex` | Essex County NJ |
| `1607041299803x542854758464683600` | `hudson` | Hudson County NJ |

### Photo IDs → Photo URLs
**Source:** `supabase-api.js` lines 143-183 (`fetchPhotoUrls()`)
- Frontend sends array of photo IDs from `Features - Photos` field
- Queries `listing_photo` table to get actual URLs
- Joins on `listing_photo._id = photo_id`
- Returns `Photo` field (text URL)

### Coordinates Extraction
**Source:** `supabase-api.js` lines 222-226
- Database has `Location - Address` (jsonb) with `{lat, lng}` properties
- Extracted and normalized to `{lat, lng}` object for map display

---

## 10. VALIDATED FIELD TYPES (MCP VERIFICATION)

**Validation Method:** Direct database queries via Supabase MCP tools
**Date Validated:** 2025-11-04
**Active Listings Checked:** 12

### Foreign Key Fields (Bubble IDs)

| Field Name | Foreign Key? | Lookup Table | Display Column | Data Integrity |
|-----------|--------------|--------------|----------------|----------------|
| `Location - Borough` | ✅ YES | `zat_geo_borough_toplevel` | `"Display Borough"` | 100% valid (12/12) |
| `Location - Hood` | ✅ YES | `zat_geo_hood_mediumlevel` | `"Display"` | 100% valid (12/12) |
| `Features - Type of Space` | ✅ YES | `zat_features_listingtype` | `"Label "` ⚠️ (trailing space) | 100% valid (12/12) |
| `Features - Amenities In-Unit` | ✅ YES | `zat_features_amenity` | `"Name"` | JSONB array of IDs |
| `Features - Amenities In-Building` | ✅ YES | `zat_features_amenity` | `"Name"` | JSONB array of IDs |

**Bubble ID Pattern:** `{timestamp}x{random_number}` (e.g., `1607041299687x679479834266385900`)

### Plain Text Fields (Enum Values)

| Field Name | Foreign Key? | Distinct Values Found | Notes |
|-----------|--------------|----------------------|-------|
| `Weeks offered` | ❌ NO | "Every week", "One week on, one week off" | Enum string values |
| `Kitchen Type` | ❌ NO | "Full Kitchen", "Kitchenette", null | Enum string values |
| `Preferred Gender` | ❌ NO | "Female", "Male", "No Preference" | Enum string values |

### Sample Validated Mappings

**Space Type IDs:**
- `1569530331984x152755544104023800` → "Entire Place"
- `1569530159044x216130979074711000` → "Private Room"

**Amenity IDs:**
- `1558470368024x124705598302821140` → "Air Conditioned" (In Unit)
- `1625802334216x386767366158665900` → "Patio / Backyard" (In Unit)
- `1619795207043x135092473285574660` → "BBQ Grill" (In Building)
- `1625802825769x273103875460747100` → "Common Outdoor Space" (In Building)
- `1555340850683x868929351440588700` → "Gym" (In Building)

**🎉 ZERO BROKEN REFERENCES FOUND** - All foreign key relationships are intact and valid!

---

## 11. POTENTIAL ISSUES & DISCREPANCIES

### ⚠️ Issue 1: Typo in Database Column Name
- **Column:** `Standarized Minimum Nightly Price (Filter)`
- **Should be:** `Standardized Minimum Nightly Price (Filter)`
- **Impact:** None if consistently misspelled everywhere
- **Location:** Database schema, all query code

### ⚠️ Issue 2: Missing Price Field
- **Missing Field:** `Price 6 nights selected`
- **Referenced in:** `app.js` line 25 (priceFieldMap)
- **Database has:** 2, 3, 4, 5, 7 nights only (no 6-night field)
- **Impact:** 6-night stays will fall back to base price

### ⚠️ Issue 3: Incomplete Neighborhood Mapping
- **Hardcoded:** 28 Manhattan neighborhoods in `filter-config.js`
- **Database has:** 293 total neighborhoods across all boroughs
- **Impact:** Non-Manhattan neighborhoods won't have proper ID mapping
- **Mitigation:** Dynamic population in `app.js` lines 667-712

### ⚠️ Issue 4: Schedule Selector Days Not Used for Filtering
- **User selects:** Days of the week (Mon-Fri, etc.)
- **Database field:** `Days Available (List of Days)` (jsonb, NOT NULL)
- **Current behavior:** Days selection only affects price calculation
- **Potential issue:** Not filtering by actual availability
- **Location:** No query uses `Days Available (List of Days)` field

### ⚠️ Issue 5: Borough Display Name Mismatch
- **UI Dropdown shows:** "Manhattan" (index.html line 92)
- **Database lookup returns:** Full borough IDs
- **Frontend expects:** Lowercase values ('manhattan')
- **Location:** Mapping in both `filter-config.js` and `supabase-api.js`

### ⚠️ Issue 6: Multiple Price Field Names
- **Database uses:** `💰Nightly Host Rate for X nights` (with emoji)
- **Transformed to:** `Price X nights selected` (without emoji)
- **Fallback logic:** Checks both naming conventions
- **Location:** `app.js` lines 19-26, `supabase-api.js` lines 248-260

---

## 12. SUMMARY TABLE: ALL FILTER OPTIONS

| Filter Type | UI Element | Frontend Config | Database Field | Database Type | Foreign Key? | MCP Validated |
|-------------|-----------|-----------------|----------------|---------------|--------------|---------------|
| Borough | Select dropdown | `BOROUGH_IDS` | `Location - Borough` | text | ✅ Yes → `zat_geo_borough_toplevel` | ✅ 100% valid |
| Week Pattern | Select dropdown | `WEEK_PATTERNS` | `Weeks offered` | text (NOT NULL) | ❌ No (Plain text) | ✅ Confirmed enum |
| Price Tier | Select dropdown | `PRICE_TIERS` | `Standarized Minimum Nightly Price (Filter)` | numeric | ❌ No | N/A (numeric field) |
| Neighborhood | Checkboxes | `NEIGHBORHOOD_ID_MAP` | `Location - Hood` | text | ✅ Yes → `zat_geo_hood_mediumlevel` | ✅ 100% valid |
| Sort By | Select dropdown | `SORT_OPTIONS` | Multiple (see section 5) | Mixed | ❌ No | N/A |
| Schedule (Days) | React component | `selectedDays` | (Affects price lookup only) | N/A | ❌ No | N/A |
| Active Status | Auto-applied | Hardcoded | `Active` | boolean | ❌ No | N/A |
| Approved Status | Auto-applied | Hardcoded | `Approved` | boolean | ❌ No | N/A |

---

### ⚠️ Issue 7: Trailing Space in Column Name (NEW)
- **Column:** `"Label "` in `zat_features_listingtype` table
- **Problem:** Column name has a trailing space
- **Impact:** Must use exact quoting in SQL queries: `"Label "`
- **Location:** Lookup table for space types
- **Validated:** Via MCP queries

---

## 13. QUERY IMPLEMENTATION REFERENCE

**Main Query Function:** `supabase-api.js` lines 46-141 (`getListings()`)

**Query Building Order:**
1. Base query: `listing` table, select all columns
2. Filter: `Active = true` (line 63)
3. Filter: `Approved = true` (line 64)
4. Filter: Borough if provided (line 69)
5. Filter: Week pattern if provided (line 75)
6. Filter: Price range if provided (lines 79-87)
7. Filter: Neighborhoods if provided (line 92)
8. Sort: Apply sort config (lines 96-104)
9. Execute query (line 106)
10. Fetch photo URLs (line 131)
11. Transform listings (line 134)

**Filter Application Function:** `app.js` lines 534-615 (`applyFilters()`)

---

---

## 14. MCP VALIDATION SUMMARY

**Validation Completed:** 2025-11-04
**Tool Used:** Supabase MCP via mcp-tool-specialist subagents
**Queries Executed:** 11 total (2 subagent passes)

### Pass 1: Field Value Type Identification
- Queried 5 sample listings with all filter fields
- Analyzed distinct values for Weeks offered, Kitchen Type, Preferred Gender, Features - Type of Space
- Sampled amenity IDs from JSONB arrays
- **Result:** Identified which fields contain Bubble IDs vs plain text

### Pass 2: Foreign Key Relationship Validation
- Cross-referenced listing IDs with lookup tables via LEFT JOINs
- Validated Borough, Hood, Space Type, and Amenity relationships
- Checked data integrity (NULL joins = broken references)
- Retrieved human-readable labels from lookup tables
- **Result:** Confirmed 100% valid relationships, zero broken references

### Key Discoveries
1. ✅ All suspected foreign key fields ARE indeed Bubble IDs
2. ✅ All foreign key relationships are valid (no broken references)
3. ✅ Plain text fields confirmed as enum values
4. ⚠️ Discovered trailing space in `"Label "` column name
5. ✅ Amenities stored as JSONB arrays of foreign key IDs
6. ✅ Kitchen Type is plain text, NOT a foreign key

---

**Document Version:** 2.0
**Last Updated:** 2025-11-04 (MCP Validation Added)
**Created for:** Error checking and validation exercise
**Validation Status:** ✅ Comprehensive database validation completed
