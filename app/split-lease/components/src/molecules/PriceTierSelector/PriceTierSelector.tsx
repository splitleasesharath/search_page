import React from 'react';
import { Container, Label, Select } from './PriceTierSelector.styles';
import { PriceTierSelectorProps, PRICE_TIER_OPTIONS } from './types';

/**
 * PriceTierSelector - Dropdown for selecting price ranges
 */
export const PriceTierSelector: React.FC<PriceTierSelectorProps> = ({
  value = '$200-$350/night',
  onChange,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const selectedTier = PRICE_TIER_OPTIONS.find(tier => tier.label === selectedLabel);
    if (selectedTier) {
      onChange?.(selectedTier);
    }
  };

  return (
    <Container className={className}>
      <Label htmlFor="price-tier-select">Select Price Range</Label>
      <Select
        id="price-tier-select"
        value={value}
        onChange={handleChange}
        aria-label="Select price range"
      >
        {PRICE_TIER_OPTIONS.map((tier) => (
          <option key={tier.label} value={tier.label}>
            {tier.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default PriceTierSelector;
