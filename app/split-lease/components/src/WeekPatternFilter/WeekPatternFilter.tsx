import React from 'react';
import { WeekPatternFilterProps, WEEK_PATTERN_OPTIONS } from './types';
import { FilterContainer, FilterLabel, Select } from './WeekPatternFilter.styles';

export const WeekPatternFilter: React.FC<WeekPatternFilterProps> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === '') {
            onChange(undefined);
        } else {
            onChange(selectedValue as any);
        }
        console.log('Week pattern filter changed:', selectedValue || 'All Patterns');
    };

    return (
        <FilterContainer>
            <FilterLabel htmlFor="week-pattern-filter">Weekly Frequency</FilterLabel>
            <Select
                id="week-pattern-filter"
                value={value || ''}
                onChange={handleChange}
            >
                <option value="">All Patterns</option>
                {WEEK_PATTERN_OPTIONS.map((pattern) => (
                    <option key={pattern.label} value={pattern.label}>
                        {pattern.label}
                    </option>
                ))}
            </Select>
        </FilterContainer>
    );
};
