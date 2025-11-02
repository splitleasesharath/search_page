import React, { useState } from 'react';
import { BoroughFilter } from '../BoroughFilter';
import { PriceTierFilter } from '../PriceTierFilter';
import { WeekPatternFilter } from '../WeekPatternFilter';
import { SortFilter } from '../SortFilter';
import { FilterState, FilterChangeHandler } from './types';
import {
    FiltersContainer,
    FilterGroup,
    ScheduleSelectorWrapper,
    ScheduleSelectorTitle,
    SchedulePlaceholder,
} from './SearchFilters.styles';

export interface SearchFiltersProps {
    initialFilters?: Partial<FilterState>;
    onChange?: FilterChangeHandler;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
    initialFilters = {},
    onChange,
}) => {
    const [filters, setFilters] = useState<FilterState>({
        borough: initialFilters.borough,
        priceTier: initialFilters.priceTier,
        weekPattern: initialFilters.weekPattern,
        sort: initialFilters.sort || 'Our Recommendations',
        startDate: initialFilters.startDate,
        endDate: initialFilters.endDate,
    });

    const handleFilterChange = (newFilters: Partial<FilterState>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);
        onChange?.(updatedFilters);
        console.log('Filters updated:', updatedFilters);
    };

    return (
        <FiltersContainer>
            <FilterGroup>
                <BoroughFilter
                    value={filters.borough}
                    onChange={(borough) => handleFilterChange({ borough })}
                />
            </FilterGroup>

            <FilterGroup>
                <PriceTierFilter
                    value={filters.priceTier}
                    onChange={(priceTier) => handleFilterChange({ priceTier })}
                />
            </FilterGroup>

            <FilterGroup>
                <WeekPatternFilter
                    value={filters.weekPattern}
                    onChange={(weekPattern) => handleFilterChange({ weekPattern })}
                />
            </FilterGroup>

            <FilterGroup>
                <SortFilter
                    value={filters.sort}
                    onChange={(sort) => handleFilterChange({ sort })}
                />
            </FilterGroup>

            <ScheduleSelectorWrapper>
                <ScheduleSelectorTitle>Select Your Schedule</ScheduleSelectorTitle>
                <SchedulePlaceholder>
                    Schedule Selector Component - Coming Soon
                    <br />
                    (Will be integrated from external repository)
                </SchedulePlaceholder>
            </ScheduleSelectorWrapper>
        </FiltersContainer>
    );
};
