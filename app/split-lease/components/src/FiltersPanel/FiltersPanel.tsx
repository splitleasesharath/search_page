/**
 * FiltersPanel component - Main container for all filters
 */

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FiltersPanelProps, Filters } from './types';

const Container = styled.div`
  padding: 20px;
  background: #f8f8f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const ClearButton = styled.button`
  padding: 10px 20px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d32f2f;
  }
`;

export const FiltersPanel: React.FC<FiltersPanelProps> = ({ onFiltersChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const updateFilters = useCallback(
    (updates: Partial<Filters>) => {
      const newFilters = { ...filters, ...updates };
      setFilters(newFilters);
      // Debounce in parent component
      onFiltersChange(newFilters);
    },
    [filters, onFiltersChange]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    onFiltersChange({});
  }, [onFiltersChange]);

  return (
    <Container>
      <FilterSection>
        <FilterLabel>Weekly Pattern</FilterLabel>
        <Select
          value={filters.weeklyPattern || ''}
          onChange={(e) => updateFilters({ weeklyPattern: e.target.value })}
        >
          <option value="">Any pattern</option>
          <option value="every_week">Every week</option>
          <option value="1_on_1_off">1 week on / 1 week off</option>
          <option value="2_on_2_off">2 weeks on / 2 weeks off</option>
          <option value="1_on_3_off">1 week on / 3 weeks off</option>
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Price Range</FilterLabel>
        <Select
          value={filters.priceRange?.display || ''}
          onChange={(e) => {
            const display = e.target.value;
            let priceRange;
            if (display === '< $200/night') {
              priceRange = { max: 200, display };
            } else if (display === '$200-$350/night') {
              priceRange = { min: 200, max: 350, display };
            } else if (display === '$350-$500/night') {
              priceRange = { min: 350, max: 500, display };
            } else if (display === '$500+/night') {
              priceRange = { min: 500, display };
            }
            updateFilters({ priceRange });
          }}
        >
          <option value="">Any price</option>
          <option value="< $200/night">&lt; $200/night</option>
          <option value="$200-$350/night">$200-$350/night</option>
          <option value="$350-$500/night">$350-$500/night</option>
          <option value="$500+/night">$500+/night</option>
        </Select>
      </FilterSection>

      <FilterSection>
        <FilterLabel>Bedrooms</FilterLabel>
        <Input
          type="number"
          min="0"
          max="5"
          value={filters.bedrooms || ''}
          onChange={(e) => updateFilters({ bedrooms: parseInt(e.target.value) || undefined })}
          placeholder="Any"
        />
      </FilterSection>

      <FilterSection>
        <FilterLabel>Bathrooms</FilterLabel>
        <Input
          type="number"
          min="0"
          max="5"
          value={filters.bathrooms || ''}
          onChange={(e) => updateFilters({ bathrooms: parseInt(e.target.value) || undefined })}
          placeholder="Any"
        />
      </FilterSection>

      <FilterSection>
        <FilterLabel>Sort By</FilterLabel>
        <Select
          value={filters.sort || 'our_recommendations'}
          onChange={(e) => updateFilters({ sort: e.target.value })}
        >
          <option value="our_recommendations">Our Recommendations</option>
          <option value="price_low_to_high">Price - Lowest to Highest</option>
          <option value="most_viewed">Most Viewed</option>
          <option value="recently_added">Recently Added</option>
        </Select>
      </FilterSection>

      <ClearButton onClick={clearFilters}>Clear All Filters</ClearButton>
    </Container>
  );
};

export default FiltersPanel;
