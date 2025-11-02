import type { DropdownOption } from '../../atoms/Dropdown';

/**
 * Borough filter options
 * Based on the live page analysis and Search Page Option Sets
 */
export const BOROUGH_OPTIONS: DropdownOption[] = [
  { value: 'manhattan', label: 'Manhattan' },
  { value: 'brooklyn', label: 'Brooklyn' },
  { value: 'bronx', label: 'Bronx' },
  { value: 'queens', label: 'Queens' },
  { value: 'bergen-county-nj', label: 'Bergen County NJ' },
  { value: 'essex-county-nj', label: 'Essex County NJ' },
  { value: 'hudson-county-nj', label: 'Hudson County NJ' },
];

/**
 * Weekly pattern filter options
 * Based on Search Page Option Sets - WEEKLY SELECTION OPTIONS
 */
export const WEEKLY_PATTERN_OPTIONS: DropdownOption[] = [
  { value: 'every-week', label: 'Every week' },
  { value: 'one-on-one-off', label: 'One week on, one week off' },
  { value: 'two-on-two-off', label: 'Two weeks on, two weeks off' },
  { value: 'one-on-three-off', label: 'One week on, three weeks off' },
];

/**
 * Price tier filter options
 * Based on Search Page Option Sets - FILTER-PRICEONSEARCH
 */
export const PRICE_TIER_OPTIONS: DropdownOption[] = [
  { value: 'under-200', label: '< $200/night' },
  { value: '200-350', label: '$200-$350/night' },
  { value: '350-500', label: '$350-$500/night' },
  { value: '500-plus', label: '$500+/night' },
  { value: 'all-prices', label: 'All Prices' },
];

/**
 * Sort by filter options
 * Based on Search Page Option Sets - SORTBYPROPERTIESSEARCH
 */
export const SORT_BY_OPTIONS: DropdownOption[] = [
  { value: 'our-recommendations', label: 'Our Recommendations' },
  { value: 'price-lowest', label: 'Price-Lowest to Highest' },
  { value: 'most-viewed', label: 'Most Viewed' },
  { value: 'recently-added', label: 'Recently Added' },
];
