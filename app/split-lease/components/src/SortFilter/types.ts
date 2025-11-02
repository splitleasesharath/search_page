import { SortOption, SortData } from '../SearchFilters/types';

export interface SortFilterProps {
    value: SortOption;
    onChange: (sort: SortOption) => void;
}

export const SORT_OPTIONS: SortData[] = [
    { label: 'Our Recommendations', field: 'recommendation_score', direction: 'desc' },
    { label: 'Price-Lowest to Highest', field: 'price', direction: 'asc' },
    { label: 'Most viewed', field: 'view_count', direction: 'desc' },
    { label: 'Recently Added', field: 'created_at', direction: 'desc' },
];
