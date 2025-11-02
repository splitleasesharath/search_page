/**
 * Search Page Types
 *
 * TypeScript interfaces for the search page filters, results, and map data.
 */

import { z } from 'zod';

// ============================================================================
// Day and Schedule Types
// ============================================================================

export const DaySchema = z.object({
  id: z.string(),
  singleLetter: z.string(),
  fullName: z.string(),
  index: z.number().min(0).max(6),
  bubbleNumber: z.number().optional(),
  first3Letters: z.string().optional(),
});

export type Day = z.infer<typeof DaySchema>;

// ============================================================================
// Borough and Location Types
// ============================================================================

export const BoroughSchema = z.enum([
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'Bergen County NJ',
  'All Boroughs',
]);

export type Borough = z.infer<typeof BoroughSchema>;

export const NeighborhoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  borough: BoroughSchema,
});

export type Neighborhood = z.infer<typeof NeighborhoodSchema>;

// ============================================================================
// Price Tier Types
// ============================================================================

export const PriceTierSchema = z.object({
  display: z.string(),
  min: z.number(),
  max: z.number(),
});

export type PriceTier = z.infer<typeof PriceTierSchema>;

export const PRICE_TIERS: PriceTier[] = [
  { display: '< $200/night', min: 20, max: 200 },
  { display: '$200-$350/night', min: 200, max: 350 },
  { display: '$350-$500/night', min: 350, max: 500 },
  { display: '$500+/night', min: 500, max: 999999 },
  { display: 'All Prices', min: 0, max: 999999 },
];

// ============================================================================
// Weekly Pattern Types
// ============================================================================

export const WeeklyPatternSchema = z.object({
  display: z.string(),
  shortDisplay: z.string(),
  mobileDisplay: z.string(),
  period: z.number(),
  numWeeksDuring4: z.number(),
});

export type WeeklyPattern = z.infer<typeof WeeklyPatternSchema>;

export const WEEKLY_PATTERNS: WeeklyPattern[] = [
  {
    display: 'Every week',
    shortDisplay: 'Every week',
    mobileDisplay: 'Every week',
    period: 1,
    numWeeksDuring4: 4,
  },
  {
    display: 'One week on, one week off',
    shortDisplay: '1 on, 1 off',
    mobileDisplay: '1 week on/off',
    period: 2,
    numWeeksDuring4: 2,
  },
  {
    display: 'Two weeks on, two weeks off',
    shortDisplay: '2 on, 2 off',
    mobileDisplay: '2 weeks on/off',
    period: 4,
    numWeeksDuring4: 2,
  },
  {
    display: 'One week on, three weeks off',
    shortDisplay: '1 on, 3 off',
    mobileDisplay: '1 week on/3 off',
    period: 4,
    numWeeksDuring4: 1,
  },
];

// ============================================================================
// Sort Option Types
// ============================================================================

export const SortOptionSchema = z.object({
  display: z.string(),
  fieldName: z.string(),
  descending: z.boolean(),
  mobileDisplay: z.string(),
});

export type SortOption = z.infer<typeof SortOptionSchema>;

export const SORT_OPTIONS: SortOption[] = [
  {
    display: 'Our Recommendations',
    fieldName: '.Search Ranking',
    descending: false,
    mobileDisplay: 'Our Recommendations',
  },
  {
    display: 'Price-Lowest to Highest',
    fieldName: 'price',
    descending: false,
    mobileDisplay: 'Price (Low to High)',
  },
  {
    display: 'Most viewed',
    fieldName: 'view_count',
    descending: true,
    mobileDisplay: 'Most Viewed',
  },
  {
    display: 'Recently Added',
    fieldName: 'Created Date',
    descending: true,
    mobileDisplay: 'Recently Added',
  },
];

// ============================================================================
// Search Filter Types
// ============================================================================

export const SearchFiltersSchema = z.object({
  borough: BoroughSchema.optional(),
  neighborhoods: z.array(z.string()).optional(),
  priceTier: PriceTierSchema.optional(),
  weeklyPattern: WeeklyPatternSchema.optional(),
  selectedDays: z.array(DaySchema).optional(),
  sortBy: SortOptionSchema.optional(),
  query: z.string().optional(),
});

export type SearchFilters = z.infer<typeof SearchFiltersSchema>;

// ============================================================================
// Search Results Types
// ============================================================================

export const SearchResultsSchema = z.object({
  listings: z.array(z.any()), // Will be typed as Listing from models.ts
  total: z.number(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  hasMore: z.boolean().optional(),
});

export type SearchResults = z.infer<typeof SearchResultsSchema>;

// ============================================================================
// Map Marker Types
// ============================================================================

export const MapMarkerSchema = z.object({
  id: z.string(),
  listingId: z.string(),
  position: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  title: z.string(),
  price: z.number(),
  image: z.string().optional(),
  neighborhood: z.string().optional(),
});

export type MapMarker = z.infer<typeof MapMarkerSchema>;

// ============================================================================
// Map Bounds Types
// ============================================================================

export const MapBoundsSchema = z.object({
  north: z.number(),
  south: z.number(),
  east: z.number(),
  west: z.number(),
});

export type MapBounds = z.infer<typeof MapBoundsSchema>;

// ============================================================================
// Borough Center Coordinates
// ============================================================================

export const BOROUGH_CENTERS: Record<Borough, { lat: number; lng: number }> = {
  'Manhattan': { lat: 40.7831, lng: -73.9712 },
  'Brooklyn': { lat: 40.6782, lng: -73.9442 }, // 365 Stockholm St
  'Queens': { lat: 40.7282, lng: -73.7949 },
  'Bronx': { lat: 40.8448, lng: -73.8648 },
  'Staten Island': { lat: 40.5795, lng: -74.1502 },
  'Bergen County NJ': { lat: 40.9254, lng: -74.0776 },
  'All Boroughs': { lat: 40.7128, lng: -74.0060 }, // NYC center
};

// ============================================================================
// Filter Options Types
// ============================================================================

export interface FilterOptions {
  boroughs: Borough[];
  priceTiers: PriceTier[];
  weeklyPatterns: WeeklyPattern[];
  sortOptions: SortOption[];
  neighborhoods: Neighborhood[];
}

// ============================================================================
// Default Filter Values
// ============================================================================

export const DEFAULT_FILTERS: SearchFilters = {
  borough: 'Manhattan',
  priceTier: PRICE_TIERS[1], // $200-$350/night
  weeklyPattern: WEEKLY_PATTERNS[0], // Every week
  sortBy: SORT_OPTIONS[0], // Our Recommendations
  selectedDays: [],
  neighborhoods: [],
};
