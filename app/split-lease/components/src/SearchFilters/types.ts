/**
 * SearchFilters Types
 */

export type Borough =
  | 'Manhattan'
  | 'Brooklyn'
  | 'Queens'
  | 'Bronx'
  | 'Staten Island'
  | 'Bergen County NJ'
  | 'All Boroughs';

export interface PriceTier {
  display: string;
  min: number;
  max: number;
}

export interface WeeklyPattern {
  display: string;
  shortDisplay: string;
  mobileDisplay: string;
  period: number;
  numWeeksDuring4: number;
}

export interface SortOption {
  display: string;
  fieldName: string;
  descending: boolean;
  mobileDisplay: string;
}

export interface Day {
  id: string;
  singleLetter: string;
  fullName: string;
  index: number;
}

export interface SearchFilters {
  borough?: Borough;
  neighborhoods?: string[];
  priceTier?: PriceTier;
  weeklyPattern?: WeeklyPattern;
  selectedDays?: Day[];
  sortBy?: SortOption;
  query?: string;
}

/**
 * Props for the SearchFilters component
 */
export interface SearchFiltersProps {
  /** Current filter values */
  filters: SearchFilters;

  /** Callback when filters change */
  onFiltersChange: (filters: SearchFilters) => void;

  /** Available neighborhoods for the selected borough */
  availableNeighborhoods?: string[];

  /** Custom styling class name */
  className?: string;

  /** Show/hide neighborhood refinement input */
  showNeighborhood?: boolean;
}
