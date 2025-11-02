import React, { useState } from 'react';
import { Container, Title, FiltersGrid, ScheduleSection } from './FilterSidebar.styles';
import { BoroughFilter } from '../BoroughFilter';
import { WeekPatternFilter } from '../WeekPatternFilter';
import { PriceTierFilter } from '../PriceTierFilter';
import { SortByFilter } from '../SortByFilter';
import { NeighborhoodFilter } from '../NeighborhoodFilter';
import { SearchScheduleSelector } from '../../SearchScheduleSelector';
import type { SearchFilterState } from '../../../../types/filters';
import type { Day } from '../../SearchScheduleSelector/types';

export interface FilterSidebarProps {
  onFilterChange?: (filters: SearchFilterState) => void;
  className?: string;
  initialFilters?: Partial<SearchFilterState>;
}

/**
 * FilterSidebar Component
 *
 * Container component that composes all search filter components.
 * Includes Borough, Week Pattern, Price Tier, Sort By, Neighborhood filters,
 * and the Search Schedule Selector.
 */
export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  className,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<SearchFilterState>({
    borough: initialFilters.borough,
    neighborhood: initialFilters.neighborhood,
    weeklyPattern: initialFilters.weeklyPattern,
    priceTier: initialFilters.priceTier,
    sortBy: initialFilters.sortBy,
    selectedDays: initialFilters.selectedDays || [],
  });

  const updateFilter = <K extends keyof SearchFilterState>(
    key: K,
    value: SearchFilterState[K]
  ) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleScheduleChange = (selectedDays: Day[]) => {
    const dayNames = selectedDays.map(day => day.fullName);
    updateFilter('selectedDays', dayNames);
  };

  return (
    <Container className={className}>
      <Title>Filter Your Search</Title>

      <FiltersGrid>
        <BoroughFilter
          value={filters.borough}
          onChange={(value) => updateFilter('borough', value)}
        />

        <WeekPatternFilter
          value={filters.weeklyPattern}
          onChange={(value) => updateFilter('weeklyPattern', value as any)}
        />

        <PriceTierFilter
          value={filters.priceTier}
          onChange={(value) => updateFilter('priceTier', value as any)}
        />

        <SortByFilter
          value={filters.sortBy}
          onChange={(value) => updateFilter('sortBy', value as any)}
        />

        <NeighborhoodFilter
          value={filters.neighborhood}
          onChange={(value) => updateFilter('neighborhood', value)}
          suggestions={[
            'Upper East Side',
            'Upper West Side',
            'Greenwich Village',
            'Williamsburg',
            'Park Slope',
            'Astoria',
            'Long Island City',
          ]}
        />
      </FiltersGrid>

      <ScheduleSection>
        <SearchScheduleSelector
          onSelectionChange={handleScheduleChange}
          minDays={2}
          maxDays={5}
          requireContiguous={true}
        />
      </ScheduleSection>
    </Container>
  );
};

export default FilterSidebar;
