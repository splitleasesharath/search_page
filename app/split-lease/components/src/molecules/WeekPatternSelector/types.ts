export type WeekPattern =
  | 'Every week'
  | 'One week on/one week off'
  | 'Two weeks on/two weeks off'
  | 'One week on/three weeks off';

export interface WeekPatternSelectorProps {
  value?: WeekPattern;
  onChange?: (pattern: WeekPattern) => void;
  className?: string;
}

export const WEEK_PATTERN_OPTIONS: WeekPattern[] = [
  'Every week',
  'One week on/one week off',
  'Two weeks on/two weeks off',
  'One week on/three weeks off',
];
