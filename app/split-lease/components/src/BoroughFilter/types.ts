import { BoroughOption } from '../SearchFilters/types';

export interface BoroughFilterProps {
    value?: BoroughOption;
    onChange: (borough: BoroughOption | undefined) => void;
}

export const BOROUGH_OPTIONS: BoroughOption[] = [
    'Manhattan',
    'Brooklyn',
    'Queens',
    'Bronx',
    'Bergen County NJ',
    'Essex County NJ',
    'Hudson County NJ',
];
