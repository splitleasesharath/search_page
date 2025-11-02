/**
 * FiltersPanel types
 */

export interface FiltersPanelProps {
  onFiltersChange: (filters: Filters) => void;
  initialFilters?: Partial<Filters>;
}

export interface Filters {
  weeklyPattern?: string;
  priceRange?: { min?: number; max?: number; display: string };
  boroughs?: string[];
  neighborhoods?: string[];
  bedrooms?: number;
  bathrooms?: number;
  typeOfSpace?: string[];
  amenities?: string[];
  sort?: string;
}
