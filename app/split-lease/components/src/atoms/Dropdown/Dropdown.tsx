import React from 'react';
import {
  Container,
  Label,
  SelectWrapper,
  StyledSelect,
  DropdownIcon,
  ErrorMessage,
} from './Dropdown.styles';
import type { DropdownProps } from './types';

/**
 * Dropdown Component
 *
 * A reusable dropdown/select component for form inputs.
 * Supports custom styling, error states, and accessibility features.
 *
 * @example
 * ```tsx
 * <Dropdown
 *   label="Borough"
 *   options={boroughOptions}
 *   value={selectedBorough}
 *   onChange={(value) => setSelectedBorough(value)}
 *   placeholder="Select a borough"
 * />
 * ```
 */
export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  className,
  disabled = false,
  error = false,
  errorMessage,
  required = false,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <Container className={className}>
      {label && (
        <Label $required={required} htmlFor={label}>
          {label}
        </Label>
      )}

      <SelectWrapper>
        <StyledSelect
          id={label}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
          $error={error}
          aria-label={label || placeholder}
          aria-required={required}
          aria-invalid={error}
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </StyledSelect>

        <DropdownIcon>▼</DropdownIcon>
      </SelectWrapper>

      {error && errorMessage && (
        <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default Dropdown;
