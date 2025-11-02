import React from 'react';
import { Container, Label, Select } from './WeekPatternFilter.styles';
import { WEEKLY_PATTERN_OPTIONS, WeeklyPattern } from '../../../../types/filters';

export interface WeekPatternFilterProps {
  value?: WeeklyPattern | string;
  onChange?: (value: WeeklyPattern | string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
}

/**
 * WeekPatternFilter Component
 *
 * Dropdown filter for selecting weekly frequency pattern.
 * Options: Every week, One week on/off, Two weeks on/off, One week on/three weeks off
 */
export const WeekPatternFilter: React.FC<WeekPatternFilterProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label = 'Weekly Pattern',
  placeholder = 'Select a pattern',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value as WeeklyPattern);
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
        {WEEKLY_PATTERN_OPTIONS.map((option) => (
          <option key={option.display} value={option.display}>
            {option.display}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default WeekPatternFilter;
