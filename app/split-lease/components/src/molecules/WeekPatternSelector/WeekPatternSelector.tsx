import React from 'react';
import { Container, Label, Select } from './WeekPatternSelector.styles';
import { WeekPatternSelectorProps, WEEK_PATTERN_OPTIONS, WeekPattern } from './types';

/**
 * WeekPatternSelector - Dropdown for selecting recurring week patterns
 */
export const WeekPatternSelector: React.FC<WeekPatternSelectorProps> = ({
  value = 'Every week',
  onChange,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as WeekPattern);
  };

  return (
    <Container className={className}>
      <Label htmlFor="week-pattern-select">Select Week Pattern</Label>
      <Select
        id="week-pattern-select"
        value={value}
        onChange={handleChange}
        aria-label="Select week pattern"
      >
        {WEEK_PATTERN_OPTIONS.map((pattern) => (
          <option key={pattern} value={pattern}>
            {pattern}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default WeekPatternSelector;
