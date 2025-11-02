import React from 'react';
import {
  Container,
  Label,
  InputWrapper,
  StyledInput,
  Icon,
  ErrorMessage,
} from './TextInput.styles';
import type { TextInputProps } from './types';

/**
 * TextInput Component
 *
 * A reusable text input component for form inputs.
 * Supports custom styling, icons, error states, and accessibility features.
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Neighborhood"
 *   value={neighborhood}
 *   onChange={(value) => setNeighborhood(value)}
 *   placeholder="Enter neighborhood name"
 *   icon="🔍"
 * />
 * ```
 */
export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter text',
  label,
  className,
  disabled = false,
  error = false,
  errorMessage,
  required = false,
  type = 'text',
  autoComplete,
  maxLength,
  icon,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      <InputWrapper>
        {icon && <Icon>{icon}</Icon>}

        <StyledInput
          id={label}
          type={type}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          $error={error}
          $hasIcon={!!icon}
          aria-label={label || placeholder}
          aria-required={required}
          aria-invalid={error}
          autoComplete={autoComplete}
          maxLength={maxLength}
        />
      </InputWrapper>

      {error && errorMessage && (
        <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default TextInput;
