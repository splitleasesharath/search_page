/**
 * Props for the TextInput component
 */
export interface TextInputProps {
  /** Current input value */
  value?: string;

  /** Callback fired when input value changes */
  onChange?: (value: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Label for the input */
  label?: string;

  /** Custom styling class name */
  className?: string;

  /** Whether the input is disabled */
  disabled?: boolean;

  /** Error state */
  error?: boolean;

  /** Error message to display */
  errorMessage?: string;

  /** Required field indicator */
  required?: boolean;

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';

  /** Autocomplete attribute */
  autoComplete?: string;

  /** Maximum length of input */
  maxLength?: number;

  /** Icon to display (emoji or text) */
  icon?: string;
}
