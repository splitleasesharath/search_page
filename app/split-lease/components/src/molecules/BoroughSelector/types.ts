export type Borough =
  | 'Bergen County NJ'
  | 'Bronx'
  | 'Brooklyn'
  | 'Essex County NJ'
  | 'Hudson County NJ'
  | 'Manhattan'
  | 'Queens';

export interface BoroughSelectorProps {
  value?: Borough;
  onChange?: (borough: Borough) => void;
  className?: string;
}

export const BOROUGH_OPTIONS: Borough[] = [
  'Bergen County NJ',
  'Bronx',
  'Brooklyn',
  'Essex County NJ',
  'Hudson County NJ',
  'Manhattan',
  'Queens',
];
