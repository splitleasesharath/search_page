export interface Day {
  label: string;
  short: string;
  index: number;
  selected: boolean;
}

export interface SearchScheduleSelectorProps {
  selectedDays?: number[];
  onChange?: (days: number[]) => void;
  minDays?: number;
  maxDays?: number;
  requireContiguous?: boolean;
  className?: string;
}

export interface ScheduleValidation {
  isValid: boolean;
  errorMessage?: string;
}
