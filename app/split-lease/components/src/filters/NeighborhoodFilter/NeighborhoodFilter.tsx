import React, { useState, useEffect, useRef } from 'react';
import { Container, Label, Input, SuggestionsList, SuggestionItem } from './NeighborhoodFilter.styles';

export interface NeighborhoodFilterProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  placeholder?: string;
  suggestions?: string[];
}

/**
 * NeighborhoodFilter Component
 *
 * Search/filter input for neighborhood refinement with autocomplete suggestions.
 */
export const NeighborhoodFilter: React.FC<NeighborhoodFilterProps> = ({
  value,
  onChange,
  disabled = false,
  className,
  label = 'Neighborhood',
  placeholder = 'Search neighborhoods...',
  suggestions = [],
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (inputValue && suggestions.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    if (onChange) {
      onChange(suggestion);
    }
  };

  return (
    <Container className={className} ref={containerRef}>
      <Label>{label}</Label>
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (filteredSuggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
      />
      {showSuggestions && filteredSuggestions.length > 0 && (
        <SuggestionsList>
          {filteredSuggestions.map((suggestion, index) => (
            <SuggestionItem
              key={`${suggestion}-${index}`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </Container>
  );
};

export default NeighborhoodFilter;
