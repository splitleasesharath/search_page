import { PriceTierOption, PriceTierData } from '../SearchFilters/types';

export interface PriceTierFilterProps {
    value?: PriceTierOption;
    onChange: (priceTier: PriceTierOption | undefined) => void;
}

export const PRICE_TIER_OPTIONS: PriceTierData[] = [
    { label: '< $200/night', minPrice: 0, maxPrice: 200 },
    { label: '$200-$350/night', minPrice: 200, maxPrice: 350 },
    { label: '$350-$500/night', minPrice: 350, maxPrice: 500 },
    { label: '$500+/night', minPrice: 500 },
    { label: 'All Prices' },
];
