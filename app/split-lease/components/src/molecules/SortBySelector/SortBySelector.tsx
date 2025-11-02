import React from 'react';
import { Container, Label, Select } from './SortBySelector.styles';
import { SortBySelectorProps, SORT_OPTIONS } from './types';

/**
 * SortBySelector - Dropdown for selecting result sort order
 */
export const SortBySelector: React.FC<SortBySelectorProps> = ({
  value = 'Our Recommendations',
  onChange,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedOption = SORT_OPTIONS.find(opt => opt.label === selectedLabel);
    if (selectedOption) {
      onChange?.(selectedOption);
    }
  };

  return (
    <Container className={className}>
      <Label htmlFor="sort-by-select">Sort By</Label>
      <Select
        id="sort-by-select"
        value={value}
        onChange={handleChange}
        aria-label="Sort results by"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.label} value={option.label}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SortBySelector;
