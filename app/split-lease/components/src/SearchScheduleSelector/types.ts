/**
 * SearchScheduleSelector component types
 */

export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export interface DayState {
  day: Day;
  selected: boolean;
  disabled: boolean;
}

export interface SearchScheduleSelectorProps {
  onSelectionChange: (selection: DaySelection) => void;
  minDays?: number;
  maxDays?: number;
  requireContiguous?: boolean;
  initialSelection?: Day[];
}

export interface DaySelection {
  selectedDays: Day[];
  checkIn?: Day;
  checkOut?: Day;
  isValid: boolean;
  errorMessage?: string;
}
