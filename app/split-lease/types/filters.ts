/**
 * Filter and search parameter types
 */

import { Day, WeeklyPattern } from './schedule';

// NYC Boroughs
export enum Borough {
  Manhattan = 'Manhattan',
  Brooklyn = 'Brooklyn',
  Queens = 'Queens',
  Bronx = 'Bronx',
  StatenIsland = 'Staten Island',
}

// Neighborhood information
export interface Neighborhood {
  name: string;
  borough: Borough;
}

// Price range filter
export interface PriceRange {
  min?: number;
  max?: number;
  display: string;
}

// Price range options as per FILTER-PRICEONSEARCH option set
export const PRICE_RANGE_OPTIONS: PriceRange[] = [
  { display: '< $200/night', max: 200 },
  { min: 200, max: 350, display: '$200-$350/night' },
  { min: 350, max: 500, display: '$350-$500/night' },
  { min: 500, display: '$500+/night' },
];

// Type of space options
export enum TypeOfSpace {
  Bedroom = 'Bedroom',
  EntireApartment = 'Entire Apartment',
  Studio = 'Studio',
  SharedRoom = 'Shared Room',
}

// Sort options
export enum SortOption {
  OurRecommendations = 'our_recommendations',
  PriceLowToHigh = 'price_low_to_high',
  MostViewed = 'most_viewed',
  RecentlyAdded = 'recently_added',
}

// Sort option metadata
export interface SortOptionMeta {
  value: SortOption;
  display: string;
}

export const SORT_OPTIONS: SortOptionMeta[] = [
  { value: SortOption.OurRecommendations, display: 'Our Recommendations' },
  { value: SortOption.PriceLowToHigh, display: 'Price - Lowest to Highest' },
  { value: SortOption.MostViewed, display: 'Most Viewed' },
  { value: SortOption.RecentlyAdded, display: 'Recently Added' },
];

// Property filters
export interface PropertyFilters {
  bedrooms?: number; // 0-5+
  bathrooms?: number; // 0-5+
  typeOfSpace?: TypeOfSpace[];
}

// Location filters
export interface LocationFilters {
  boroughs: Borough[];
  neighborhoods: string[];
}

// Complete search filters
export interface SearchFilters {
  schedule?: Day[];
  weeklyPattern?: WeeklyPattern;
  priceRange?: PriceRange;
  location?: LocationFilters;
  property?: PropertyFilters;
  amenities?: string[];
  sort?: SortOption;
}
