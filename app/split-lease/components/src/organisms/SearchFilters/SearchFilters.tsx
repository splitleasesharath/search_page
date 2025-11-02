import React, { useState, useCallback, useEffect } from 'react';
import { SearchScheduleSelector } from '../../SearchScheduleSelector';
import { Dropdown } from '../../atoms/Dropdown';
import { TextInput } from '../../atoms/TextInput';
import type { Day } from '../../SearchScheduleSelector';
import {
  Container,
  Title,
  Section,
  SectionTitle,
  Divider,
  FiltersGroup,
} from './SearchFilters.styles';
import {
  BOROUGH_OPTIONS,
  WEEKLY_PATTERN_OPTIONS,
  PRICE_TIER_OPTIONS,
  SORT_BY_OPTIONS,
} from './constants';
import type { SearchFiltersProps, SearchFilterValues } from './types';

/**
 * SearchFilters Component
 *
 * A complete filter sidebar organism for the search page.
 * Includes schedule selector, location filters, price filters, and sorting options.
 *
 * @example
 * ```tsx
 * <SearchFilters
 *   onFilterChange={(filters) => {
 *     console.log('Filters changed:', filters);
 *     // TODO: Implement Supabase filtering logic
 *   }}
 * />
 * ```
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onFilterChange,
  initialFilters = {},
  className,
}) => {
  const [filters, setFilters] = useState<SearchFilterValues>({
    borough: initialFilters.borough,
    weeklyPattern: initialFilters.weeklyPattern,
    priceTier: initialFilters.priceTier,
    sortBy: initialFilters.sortBy || 'our-recommendations', // Default sort
    neighborhood: initialFilters.neighborhood,
    selectedDays: initialFilters.selectedDays || [],
  });

  /**
   * Update a specific filter value
   */
  const updateFilter = useCallback((key: keyof SearchFilterValues, value: any) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  }, []);

  /**
   * Notify parent component when filters change
   */
  useEffect(() => {
    if (onFilterChange) {
      console.log('Filters updated:', filters);
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  return (
    <Container className={className}>
      <Title>Search Filters</Title>

      {/* Schedule Selector Section */}
      <Section>
        <SectionTitle>Select Your Schedule</SectionTitle>
        <SearchScheduleSelector
          onSelectionChange={(days: Day[]) => {
            console.log('Selected days:', days);
            updateFilter('selectedDays', days);
          }}
          onError={(error) => {
            console.error('Schedule selector error:', error);
          }}
        />
      </Section>

      <Divider />

      {/* Location Filters Section */}
      <Section>
        <SectionTitle>Location</SectionTitle>
        <FiltersGroup>
          <Dropdown
            label="Borough"
            options={BOROUGH_OPTIONS}
            value={filters.borough}
            onChange={(value) => {
              console.log('Borough changed:', value);
              updateFilter('borough', value);
            }}
            placeholder="Select a borough"
          />

          <TextInput
            label="Neighborhood"
            value={filters.neighborhood}
            onChange={(value) => {
              console.log('Neighborhood changed:', value);
              updateFilter('neighborhood', value);
            }}
            placeholder="Search neighborhoods..."
            icon="🔍"
            type="search"
          />
        </FiltersGroup>
      </Section>

      <Divider />

      {/* Rental Pattern Section */}
      <Section>
        <SectionTitle>Rental Pattern</SectionTitle>
        <Dropdown
          label="Week Pattern"
          options={WEEKLY_PATTERN_OPTIONS}
          value={filters.weeklyPattern}
          onChange={(value) => {
            console.log('Weekly pattern changed:', value);
            updateFilter('weeklyPattern', value);
          }}
          placeholder="Select a pattern"
        />
      </Section>

      <Divider />

      {/* Price Section */}
      <Section>
        <SectionTitle>Price</SectionTitle>
        <Dropdown
          label="Price Tier"
          options={PRICE_TIER_OPTIONS}
          value={filters.priceTier}
          onChange={(value) => {
            console.log('Price tier changed:', value);
            updateFilter('priceTier', value);
          }}
          placeholder="Select a price range"
        />
      </Section>

      <Divider />

      {/* Sort Section */}
      <Section>
        <SectionTitle>Sort By</SectionTitle>
        <Dropdown
          label="Sort Order"
          options={SORT_BY_OPTIONS}
          value={filters.sortBy}
          onChange={(value) => {
            console.log('Sort by changed:', value);
            updateFilter('sortBy', value);
          }}
          placeholder="Select sort order"
        />
      </Section>
    </Container>
  );
};

export default SearchFilters;
