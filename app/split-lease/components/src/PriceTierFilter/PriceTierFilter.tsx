import React from 'react';
import { PriceTierFilterProps, PRICE_TIER_OPTIONS } from './types';
import { FilterContainer, FilterLabel, Select } from './PriceTierFilter.styles';

export const PriceTierFilter: React.FC<PriceTierFilterProps> = ({ value, onChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        if (selectedValue === '') {
            onChange(undefined);
        } else {
            onChange(selectedValue as any);
        }
        console.log('Price tier filter changed:', selectedValue || 'All Prices');
    };

    return (
        <FilterContainer>
            <FilterLabel htmlFor="price-tier-filter">Price Range</FilterLabel>
            <Select
                id="price-tier-filter"
                value={value || ''}
                onChange={handleChange}
            >
                <option value="">All Prices</option>
                {PRICE_TIER_OPTIONS.filter(tier => tier.label !== 'All Prices').map((tier) => (
                    <option key={tier.label} value={tier.label}>
                        {tier.label}
                    </option>
                ))}
            </Select>
        </FilterContainer>
    );
};
