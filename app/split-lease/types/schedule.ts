/**
 * Schedule-related types for Split Lease search functionality
 */

// Days of the week enum
export enum Day {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// Night corresponding to check-in day
export enum Night {
  SundayNight = 0,
  MondayNight = 1,
  TuesdayNight = 2,
  WednesdayNight = 3,
  ThursdayNight = 4,
  FridayNight = 5,
  SaturdayNight = 6,
}

// Weekly rental patterns
export enum WeeklyPattern {
  EveryWeek = 'every_week',
  OneOnOneOff = '1_on_1_off',
  TwoOnTwoOff = '2_on_2_off',
  OneOnThreeOff = '1_on_3_off',
}

// Week pattern metadata
export interface WeekPatternOption {
  value: WeeklyPattern;
  display: string;
  displayMobile: string;
  period: number; // Number of weeks in pattern cycle
}

// Schedule selection state
export interface ScheduleSelection {
  selectedDays: Day[];
  checkIn?: Day;
  checkOut?: Day;
  isValid: boolean;
  errorMessage?: string;
}

// Day selection helper
export const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Week pattern options as per option set
export const WEEK_PATTERN_OPTIONS: WeekPatternOption[] = [
  {
    value: WeeklyPattern.EveryWeek,
    display: 'Every week',
    displayMobile: 'Every week',
    period: 1,
  },
  {
    value: WeeklyPattern.OneOnOneOff,
    display: '1 week on / 1 week off',
    displayMobile: '1 on / 1 off',
    period: 2,
  },
  {
    value: WeeklyPattern.TwoOnTwoOff,
    display: '2 weeks on / 2 weeks off',
    displayMobile: '2 on / 2 off',
    period: 4,
  },
  {
    value: WeeklyPattern.OneOnThreeOff,
    display: '1 week on / 3 weeks off',
    displayMobile: '1 on / 3 off',
    period: 4,
  },
];
