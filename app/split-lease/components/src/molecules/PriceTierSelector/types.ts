export interface PriceTier {
  label: string;
  minPrice: number | null;
  maxPrice: number | null;
}

export const PRICE_TIER_OPTIONS: PriceTier[] = [
  { label: '< $200/night', minPrice: null, maxPrice: 200 },
  { label: '$200-$350/night', minPrice: 200, maxPrice: 350 },
  { label: '$350-$500/night', minPrice: 350, maxPrice: 500 },
  { label: '$500+/night', minPrice: 500, maxPrice: null },
  { label: 'All Prices', minPrice: null, maxPrice: null },
];

export interface PriceTierSelectorProps {
  value?: string;
  onChange?: (tier: PriceTier) => void;
  className?: string;
}
