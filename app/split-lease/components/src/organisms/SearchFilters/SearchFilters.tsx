import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  FilterSection,
  Divider,
  ListingsCounter,
  CounterLabel,
  CounterValue,
  FilterGroupTitle,
} from './SearchFilters.styles';
import { SearchFiltersProps, SearchFiltersState } from './types';
import { SearchScheduleSelector } from '../../SearchScheduleSelector';
import { BoroughSelector } from '../../molecules/BoroughSelector';
import { WeekPatternSelector } from '../../molecules/WeekPatternSelector';
import { PriceTierSelector } from '../../molecules/PriceTierSelector';
import { SortBySelector } from '../../molecules/SortBySelector';
import { NeighborhoodSearch } from '../../molecules/NeighborhoodSearch';
import { PRICE_TIER_OPTIONS } from '../../molecules/PriceTierSelector/types';
import { SORT_OPTIONS } from '../../molecules/SortBySelector/types';

/**
 * SearchFilters - Container organism for all search filter components
 * Manages state and coordinates between all filter components
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFiltersChange,
  initialState,
  className,
}) => {
  const [state, setState] = useState<SearchFiltersState>({
    selectedDays: initialState?.selectedDays || [],
    borough: initialState?.borough || 'Manhattan',
    weekPattern: initialState?.weekPattern || 'Every week',
    priceTier: initialState?.priceTier || PRICE_TIER_OPTIONS[1], // $200-$350/night
    sortBy: initialState?.sortBy || SORT_OPTIONS[0], // Our Recommendations
    neighborhoods: initialState?.neighborhoods || [],
    listingsCount: initialState?.listingsCount || 0,
  });

  // Notify parent of filter changes
  useEffect(() => {
    onFiltersChange?.(state);
  }, [state, onFiltersChange]);

  // Handler for day selection
  const handleDaysChange = useCallback((days: number[]) => {
    setState(prev => ({ ...prev, selectedDays: days }));
  }, []);

  // Handler for borough selection
  const handleBoroughChange = useCallback((borough: typeof state.borough) => {
    setState(prev => ({ ...prev, borough, neighborhoods: [] })); // Reset neighborhoods
  }, []);

  // Handler for week pattern selection
  const handleWeekPatternChange = useCallback((weekPattern: typeof state.weekPattern) => {
    setState(prev => ({ ...prev, weekPattern }));
  }, []);

  // Handler for price tier selection
  const handlePriceTierChange = useCallback((priceTier: typeof state.priceTier) => {
    setState(prev => ({ ...prev, priceTier }));
  }, []);

  // Handler for sort by selection
  const handleSortByChange = useCallback((sortBy: typeof state.sortBy) => {
    setState(prev => ({ ...prev, sortBy }));
  }, []);

  // Handler for neighborhood selection
  const handleNeighborhoodsChange = useCallback((neighborhoods: string[]) => {
    setState(prev => ({ ...prev, neighborhoods }));
  }, []);

  return (
    <Container className={className}>
      <FilterGroupTitle>Search Filters</FilterGroupTitle>

      {/* Schedule Selector */}
      <FilterSection>
        <SearchScheduleSelector
          selectedDays={state.selectedDays}
          onChange={handleDaysChange}
        />
      </FilterSection>

      <Divider />

      {/* Location Filters */}
      <FilterSection>
        <BoroughSelector
          value={state.borough}
          onChange={handleBoroughChange}
        />
      </FilterSection>

      <FilterSection>
        <NeighborhoodSearch
          selectedNeighborhoods={state.neighborhoods}
          onChange={handleNeighborhoodsChange}
        />
      </FilterSection>

      <Divider />

      {/* Schedule Pattern */}
      <FilterSection>
        <WeekPatternSelector
          value={state.weekPattern}
          onChange={handleWeekPatternChange}
        />
      </FilterSection>

      <Divider />

      {/* Price Filter */}
      <FilterSection>
        <PriceTierSelector
          value={state.priceTier.label}
          onChange={handlePriceTierChange}
        />
      </FilterSection>

      <Divider />

      {/* Sort Options */}
      <FilterSection>
        <SortBySelector
          value={state.sortBy.label}
          onChange={handleSortByChange}
        />
      </FilterSection>

      {/* Listings Counter */}
      <ListingsCounter>
        <CounterLabel>Listings Found</CounterLabel>
        <CounterValue>{state.listingsCount}</CounterValue>
      </ListingsCounter>
    </Container>
  );
};

export default SearchFilters;
