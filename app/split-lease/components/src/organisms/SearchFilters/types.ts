import type { Day } from '../../SearchScheduleSelector';

/**
 * Filter values for the search page
 */
export interface SearchFilterValues {
  /** Selected borough */
  borough?: string;

  /** Selected weekly pattern */
  weeklyPattern?: string;

  /** Selected price tier */
  priceTier?: string;

  /** Selected sort by option */
  sortBy?: string;

  /** Neighborhood refinement search text */
  neighborhood?: string;

  /** Selected days from the schedule selector */
  selectedDays?: Day[];
}

/**
 * Props for the SearchFilters organism component
 */
export interface SearchFiltersProps {
  /** Callback fired when any filter changes */
  onFilterChange?: (filters: SearchFilterValues) => void;

  /** Initial filter values */
  initialFilters?: SearchFilterValues;

  /** Custom styling class name */
  className?: string;
}
