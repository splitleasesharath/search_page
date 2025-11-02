import React from 'react';
import { Container, Label, Select } from './BoroughSelector.styles';
import { BoroughSelectorProps, BOROUGH_OPTIONS, Borough } from './types';

/**
 * BoroughSelector - Dropdown for selecting NYC boroughs and NJ counties
 */
export const BoroughSelector: React.FC<BoroughSelectorProps> = ({
  value = 'Manhattan',
  onChange,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value as Borough);
  };

  return (
    <Container className={className}>
      <Label htmlFor="borough-select">Select Borough</Label>
      <Select
        id="borough-select"
        value={value}
        onChange={handleChange}
        aria-label="Select borough or county"
      >
        {BOROUGH_OPTIONS.map((borough) => (
          <option key={borough} value={borough}>
            {borough}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default BoroughSelector;
