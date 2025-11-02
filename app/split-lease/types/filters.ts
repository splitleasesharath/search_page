/**
 * Search Filter Type Definitions
 *
 * Types for all search filter options and configurations,
 * based on the option sets from the original Bubble application.
 */

import { z } from 'zod';
import { Borough } from './search';

// ============================================================================
// Price Tier Filter (FILTER-PRICEONSEARCH option set)
// ============================================================================

export const PriceTierSchema = z.enum([
  '< $200/night',
  '$200-$350/night',
  '$350-$500/night',
  '$500+/night',
  'All Prices',
]);

export type PriceTier = z.infer<typeof PriceTierSchema>;

export interface PriceTierOption {
  display: PriceTier;
  priceMin: number;
  priceMax: number;
}

export const PRICE_TIER_OPTIONS: PriceTierOption[] = [
  {
    display: '< $200/night',
    priceMin: 20,
    priceMax: 200,
  },
  {
    display: '$200-$350/night',
    priceMin: 200,
    priceMax: 350,
  },
  {
    display: '$350-$500/night',
    priceMin: 350,
    priceMax: 500,
  },
  {
    display: '$500+/night',
    priceMin: 500,
    priceMax: 999999,
  },
  {
    display: 'All Prices',
    priceMin: 0,
    priceMax: 999999,
  },
];

// ============================================================================
// Sort By Filter (SORTBYPROPERTIESSEARCH option set)
// ============================================================================

export const SortByOptionSchema = z.enum([
  'Our Recommendations',
  'Price-Lowest to Highest',
  'Most viewed',
  'Recently Added',
]);

export type SortByOption = z.infer<typeof SortByOptionSchema>;

export interface SortByConfig {
  display: SortByOption;
  fieldName: string;
  descending: boolean;
  mobileDisplay: string;
}

export const SORT_BY_OPTIONS: SortByConfig[] = [
  {
    display: 'Our Recommendations',
    fieldName: 'custom_sort',
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
// Weekly Pattern Filter (WEEKLY SELECTION OPTIONS option set)
// ============================================================================

export const WeeklyPatternSchema = z.enum([
  'Every week',
  'One week on, one week off',
  'Two weeks on, two weeks off',
  'One week on, three weeks off',
]);

export type WeeklyPattern = z.infer<typeof WeeklyPatternSchema>;

export interface WeeklyPatternOption {
  display: WeeklyPattern;
  shortDisplay: string;
  mobileDisplay: string;
  period: number;
  numWeeksDuring4Weeks: number;
  shownToHosts: boolean;
}

export const WEEKLY_PATTERN_OPTIONS: WeeklyPatternOption[] = [
  {
    display: 'Every week',
    shortDisplay: 'Every week',
    mobileDisplay: 'Every week',
    period: 1,
    numWeeksDuring4Weeks: 4,
    shownToHosts: true,
  },
  {
    display: 'One week on, one week off',
    shortDisplay: '1 on, 1 off',
    mobileDisplay: '1 week on/off',
    period: 2,
    numWeeksDuring4Weeks: 2,
    shownToHosts: true,
  },
  {
    display: 'Two weeks on, two weeks off',
    shortDisplay: '2 on, 2 off',
    mobileDisplay: '2 weeks on/off',
    period: 4,
    numWeeksDuring4Weeks: 2,
    shownToHosts: true,
  },
  {
    display: 'One week on, three weeks off',
    shortDisplay: '1 on, 3 off',
    mobileDisplay: '1 week on/3 off',
    period: 4,
    numWeeksDuring4Weeks: 1,
    shownToHosts: true,
  },
];

// ============================================================================
// Borough Filter Options
// ============================================================================

export const BOROUGH_OPTIONS: Borough[] = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Bergen County NJ',
  'Essex County NJ',
  'Hudson County NJ',
];

// ============================================================================
// Combined Filter State Type
// ============================================================================

export const SearchFilterStateSchema = z.object({
  borough: z.string().optional(),
  neighborhood: z.string().optional(),
  weeklyPattern: WeeklyPatternSchema.optional(),
  priceTier: PriceTierSchema.optional(),
  sortBy: SortByOptionSchema.optional(),
  checkInDay: z.string().optional(), // Day of week for check-in
  checkOutDay: z.string().optional(), // Day of week for check-out
  selectedDays: z.array(z.string()).optional(), // Array of selected day names
});

export type SearchFilterState = z.infer<typeof SearchFilterStateSchema>;

// ============================================================================
// Filter Component Props Types
// ============================================================================

export interface FilterProps<T = any> {
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  className?: string;
}

export interface DropdownFilterProps<T = string> extends FilterProps<T> {
  options: readonly T[] | T[];
  placeholder?: string;
  label?: string;
}

export interface SearchInputFilterProps extends FilterProps<string> {
  placeholder?: string;
  label?: string;
  suggestions?: string[];
}
