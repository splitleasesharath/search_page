import React from 'react';
import { Container, Label, Select } from './BoroughFilter.styles';
import { BOROUGH_OPTIONS } from '../../../../types/filters';
import type { Borough } from '../../../../types/search';

export interface BoroughFilterProps {
  value?: Borough | string;
  onChange?: (value: Borough | string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

/**
 * BoroughFilter Component
 *
 * Dropdown filter for selecting a borough/location.
 * Options: Manhattan, Brooklyn, Queens, Bronx, Bergen County NJ, Essex County NJ, Hudson County NJ
 */
export const BoroughFilter: React.FC<BoroughFilterProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label = 'Borough',
  placeholder = 'Select a borough',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
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
        {BOROUGH_OPTIONS.map((borough) => (
          <option key={borough} value={borough}>
            {borough}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default BoroughFilter;
