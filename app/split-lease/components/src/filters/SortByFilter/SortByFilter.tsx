import React from 'react';
import { Container, Label, Select } from './SortByFilter.styles';
import { SORT_BY_OPTIONS, SortByOption } from '../../../../types/filters';

export interface SortByFilterProps {
  value?: SortByOption | string;
  onChange?: (value: SortByOption | string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

/**
 * SortByFilter Component
 *
 * Dropdown filter for selecting sort order.
 * Options: Our Recommendations, Price-Lowest to Highest, Most viewed, Recently Added
 */
export const SortByFilter: React.FC<SortByFilterProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label = 'Sort By',
  placeholder = 'Select sort order',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value as SortByOption);
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
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option.display} value={option.display}>
            {option.display}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SortByFilter;
