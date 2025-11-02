export interface SortOption {
  label: string;
  field: string;
  descending: boolean;
}

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Our Recommendations', field: 'recommendation_score', descending: true },
  { label: 'Price-Lowest to Highest', field: 'price', descending: false },
  { label: 'Most Viewed', field: 'view_count', descending: true },
  { label: 'Recently Added', field: 'created_at', descending: true },
];

export interface SortBySelectorProps {
  value?: string;
  onChange?: (sortOption: SortOption) => void;
  className?: string;
}
