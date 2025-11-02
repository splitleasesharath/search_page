/**
 * Type definitions for Search Filter components
 */

// Borough options based on Split Lease service areas
export type BoroughOption =
    | 'Manhattan'
    | 'Brooklyn'
    | 'Queens'
    | 'Bronx'
    | 'Bergen County NJ'
    | 'Essex County NJ'
    | 'Hudson County NJ';

// Price tier options with ranges
export type PriceTierOption =
    | '< $200/night'
    | '$200-$350/night'
    | '$350-$500/night'
    | '$500+/night'
    | 'All Prices';

export interface PriceTierData {
    label: PriceTierOption;
    minPrice?: number;
    maxPrice?: number;
}

// Week pattern options for rental schedules
export type WeekPatternOption =
    | 'Every week'
    | 'One week on/one week off'
    | 'Two weeks on/two weeks off'
    | 'One week on/three weeks off';

export interface WeekPatternData {
    label: WeekPatternOption;
    period: number; // Total period in weeks
    weeksOn: number; // Number of weeks on
    weeksOff: number; // Number of weeks off
}

// Sort options for listing display
export type SortOption =
    | 'Our Recommendations'
    | 'Price-Lowest to Highest'
    | 'Most viewed'
    | 'Recently Added';

export interface SortData {
    label: SortOption;
    field: string;
    direction: 'asc' | 'desc';
}

// Combined filter state
export interface FilterState {
    borough?: BoroughOption;
    priceTier?: PriceTierOption;
    weekPattern?: WeekPatternOption;
    sort: SortOption;
    startDate?: Date;
    endDate?: Date;
}

// Filter change handler type
export type FilterChangeHandler = (filters: FilterState) => void;
