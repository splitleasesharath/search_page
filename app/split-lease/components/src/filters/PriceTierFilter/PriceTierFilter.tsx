import React from 'react';
import { Container, Label, Select } from './PriceTierFilter.styles';
import { PRICE_TIER_OPTIONS, PriceTier } from '../../../../types/filters';

export interface PriceTierFilterProps {
  value?: PriceTier | string;
  onChange?: (value: PriceTier | string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

/**
 * PriceTierFilter Component
 *
 * Dropdown filter for selecting price range.
 * Options: < $200/night, $200-$350/night, $350-$500/night, $500+/night, All Prices
 */
export const PriceTierFilter: React.FC<PriceTierFilterProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label = 'Price Range',
  placeholder = 'Select a price range',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value as PriceTier);
    }
  };

  return (
    <Container className={className}>
      <Label>{label}</Label>
      <Select
        value={value || ''}
        onChange={handleChange}
        disabled={disabled}
        aria-label={label}
      >
        <option value="">{placeholder}</option>
        {PRICE_TIER_OPTIONS.map((option) => (
          <option key={option.display} value={option.display}>
            {option.display}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default PriceTierFilter;
