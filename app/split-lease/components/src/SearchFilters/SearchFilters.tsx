/**
 * SearchFilters Component
 *
 * Filter panel for the search page with borough, price, weekly pattern, sort, and neighborhood filters.
 */

import React, { useState } from 'react';
import type { SearchFiltersProps, Borough, PriceTier, WeeklyPattern, SortOption } from './types';
import {
  Container,
  FilterGroup,
  Label,
  Select,
  Input,
  NeighborhoodChips,
  Chip,
  ChipRemoveButton,
} from './SearchFilters.styles';

const BOROUGHS: Borough[] = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island',
  'Bergen County NJ',
  'All Boroughs',
];

const PRICE_TIERS: PriceTier[] = [
  { display: '< $200/night', min: 20, max: 200 },
  { display: '$200-$350/night', min: 200, max: 350 },
  { display: '$350-$500/night', min: 350, max: 500 },
  { display: '$500+/night', min: 500, max: 999999 },
  { display: 'All Prices', min: 0, max: 999999 },
];

const WEEKLY_PATTERNS: WeeklyPattern[] = [
  {
    display: 'Every week',
    shortDisplay: 'Every week',
    mobileDisplay: 'Every week',
    period: 1,
    numWeeksDuring4: 4,
  },
  {
    display: 'One week on, one week off',
    shortDisplay: '1 on, 1 off',
    mobileDisplay: '1 week on/off',
    period: 2,
    numWeeksDuring4: 2,
  },
  {
    display: 'Two weeks on, two weeks off',
    shortDisplay: '2 on, 2 off',
    mobileDisplay: '2 weeks on/off',
    period: 4,
    numWeeksDuring4: 2,
  },
  {
    display: 'One week on, three weeks off',
    shortDisplay: '1 on, 3 off',
    mobileDisplay: '1 week on/3 off',
    period: 4,
    numWeeksDuring4: 1,
  },
];

const SORT_OPTIONS: SortOption[] = [
  {
    display: 'Our Recommendations',
    fieldName: '.Search Ranking',
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

/**
 * SearchFilters Component
 */
export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  availableNeighborhoods = [],
  className,
  showNeighborhood = true,
}) => {
  const [neighborhoodInput, setNeighborhoodInput] = useState('');

  const handleBoroughChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const borough = e.target.value as Borough;
    onFiltersChange({
      ...filters,
      borough,
      neighborhoods: [], // Reset neighborhoods when borough changes
    });
  };

  const handlePriceTierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    const priceTier = PRICE_TIERS[index];
    onFiltersChange({
      ...filters,
      priceTier,
    });
  };

  const handleWeeklyPatternChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    const weeklyPattern = WEEKLY_PATTERNS[index];
    onFiltersChange({
      ...filters,
      weeklyPattern,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.target.value, 10);
    const sortBy = SORT_OPTIONS[index];
    onFiltersChange({
      ...filters,
      sortBy,
    });
  };

  const handleNeighborhoodAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && neighborhoodInput.trim()) {
      const currentNeighborhoods = filters.neighborhoods || [];
      if (!currentNeighborhoods.includes(neighborhoodInput.trim())) {
        onFiltersChange({
          ...filters,
          neighborhoods: [...currentNeighborhoods, neighborhoodInput.trim()],
        });
      }
      setNeighborhoodInput('');
    }
  };

  const handleNeighborhoodRemove = (neighborhood: string) => {
    const currentNeighborhoods = filters.neighborhoods || [];
    onFiltersChange({
      ...filters,
      neighborhoods: currentNeighborhoods.filter(n => n !== neighborhood),
    });
  };

  return (
    <Container className={className}>
      {/* Borough Filter */}
      <FilterGroup>
        <Label htmlFor="borough-filter">Borough / Location</Label>
        <Select
          id="borough-filter"
          value={filters.borough || 'All Boroughs'}
          onChange={handleBoroughChange}
        >
          {BOROUGHS.map((borough) => (
            <option key={borough} value={borough}>
              {borough}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Price Tier Filter */}
      <FilterGroup>
        <Label htmlFor="price-filter">Price Range</Label>
        <Select
          id="price-filter"
          value={PRICE_TIERS.findIndex(
            (tier) => tier.display === filters.priceTier?.display
          )}
          onChange={handlePriceTierChange}
        >
          {PRICE_TIERS.map((tier, index) => (
            <option key={tier.display} value={index}>
              {tier.display}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Weekly Pattern Filter */}
      <FilterGroup>
        <Label htmlFor="weekly-pattern-filter">Weekly Pattern</Label>
        <Select
          id="weekly-pattern-filter"
          value={WEEKLY_PATTERNS.findIndex(
            (pattern) => pattern.display === filters.weeklyPattern?.display
          )}
          onChange={handleWeeklyPatternChange}
        >
          {WEEKLY_PATTERNS.map((pattern, index) => (
            <option key={pattern.display} value={index}>
              {pattern.display}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Sort By Filter */}
      <FilterGroup>
        <Label htmlFor="sort-filter">Sort By</Label>
        <Select
          id="sort-filter"
          value={SORT_OPTIONS.findIndex(
            (option) => option.display === filters.sortBy?.display
          )}
          onChange={handleSortChange}
        >
          {SORT_OPTIONS.map((option, index) => (
            <option key={option.display} value={index}>
              {option.display}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {/* Neighborhood Refinement */}
      {showNeighborhood && (
        <FilterGroup>
          <Label htmlFor="neighborhood-filter">Neighborhood (Optional)</Label>
          <Input
            id="neighborhood-filter"
            type="text"
            placeholder="Type neighborhood and press Enter"
            value={neighborhoodInput}
            onChange={(e) => setNeighborhoodInput(e.target.value)}
            onKeyDown={handleNeighborhoodAdd}
          />
          {filters.neighborhoods && filters.neighborhoods.length > 0 && (
            <NeighborhoodChips>
              {filters.neighborhoods.map((neighborhood) => (
                <Chip key={neighborhood}>
                  {neighborhood}
                  <ChipRemoveButton
                    onClick={() => handleNeighborhoodRemove(neighborhood)}
                    aria-label={`Remove ${neighborhood}`}
                  >
                    ×
                  </ChipRemoveButton>
                </Chip>
              ))}
            </NeighborhoodChips>
          )}
        </FilterGroup>
      )}
    </Container>
  );
};

export default SearchFilters;
