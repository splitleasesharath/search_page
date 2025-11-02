import { WeekPatternOption, WeekPatternData } from '../SearchFilters/types';

export interface WeekPatternFilterProps {
    value?: WeekPatternOption;
    onChange: (weekPattern: WeekPatternOption | undefined) => void;
}

export const WEEK_PATTERN_OPTIONS: WeekPatternData[] = [
    { label: 'Every week', period: 1, weeksOn: 1, weeksOff: 0 },
    { label: 'One week on/one week off', period: 2, weeksOn: 1, weeksOff: 1 },
    { label: 'Two weeks on/two weeks off', period: 4, weeksOn: 2, weeksOff: 2 },
    { label: 'One week on/three weeks off', period: 4, weeksOn: 1, weeksOff: 3 },
];
