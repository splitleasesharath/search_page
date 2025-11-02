import React from 'react';
import { SortFilterProps, SORT_OPTIONS } from './types';
import { FilterContainer, FilterLabel, Select } from './SortFilter.styles';

export const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value as any;
        onChange(selectedValue);
        console.log('Sort filter changed:', selectedValue);
    };

    return (
        <FilterContainer>
            <FilterLabel htmlFor="sort-filter">Sort By</FilterLabel>
            <Select
                id="sort-filter"
                value={value}
                onChange={handleChange}
            >
                {SORT_OPTIONS.map((sortOption) => (
                    <option key={sortOption.label} value={sortOption.label}>
                        {sortOption.label}
                    </option>
                ))}
            </Select>
        </FilterContainer>
    );
};
