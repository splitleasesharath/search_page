import React from 'react';
import { BoroughFilterProps, BOROUGH_OPTIONS } from './types';
import { FilterContainer, FilterLabel, Select } from './BoroughFilter.styles';

export const BoroughFilter: React.FC<BoroughFilterProps> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === '') {
            onChange(undefined);
        } else {
            onChange(selectedValue as any);
        }
        console.log('Borough filter changed:', selectedValue || 'All Boroughs');
    };

    return (
        <FilterContainer>
            <FilterLabel htmlFor="borough-filter">Borough</FilterLabel>
            <Select
                id="borough-filter"
                value={value || ''}
                onChange={handleChange}
            >
                <option value="">All Boroughs</option>
                {BOROUGH_OPTIONS.map((borough) => (
                    <option key={borough} value={borough}>
                        {borough}
                    </option>
                ))}
            </Select>
        </FilterContainer>
    );
};
