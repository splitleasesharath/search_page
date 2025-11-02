import { Borough } from '../../molecules/BoroughSelector/types';
import { WeekPattern } from '../../molecules/WeekPatternSelector/types';
import { PriceTier } from '../../molecules/PriceTierSelector/types';
import { SortOption } from '../../molecules/SortBySelector/types';

export interface SearchFiltersState {
  selectedDays: number[];
  borough: Borough;
  weekPattern: WeekPattern;
  priceTier: PriceTier;
  sortBy: SortOption;
  neighborhoods: string[];
  listingsCount: number;
}

export interface SearchFiltersProps {
  onFiltersChange?: (state: SearchFiltersState) => void;
  initialState?: Partial<SearchFiltersState>;
  className?: string;
}
