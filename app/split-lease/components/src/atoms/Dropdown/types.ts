/**
 * Represents a single option in the dropdown
 */
export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Props for the Dropdown component
 */
export interface DropdownProps {
  /** Array of dropdown options */
  options: DropdownOption[];

  /** Currently selected value */
  value?: string;

  /** Callback fired when selection changes */
  onChange?: (value: string) => void;

  /** Placeholder text when no value is selected */
  placeholder?: string;

  /** Label for the dropdown */
  label?: string;

  /** Custom styling class name */
  className?: string;

  /** Whether the dropdown is disabled */
  disabled?: boolean;

  /** Error state */
  error?: boolean;

  /** Error message to display */
  errorMessage?: string;

  /** Required field indicator */
  required?: boolean;
}
