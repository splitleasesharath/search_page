/**
 * SearchScheduleSelector component
 * Allows users to select days of the week for rental search
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  Container,
  DaysRow,
  DayButton,
  InfoRow,
  InfoLabel,
  InfoValue,
  ErrorMessage,
  HelpText,
} from './SearchScheduleSelector.styles';
import { SearchScheduleSelectorProps, Day, DaySelection } from './types';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SearchScheduleSelector: React.FC<SearchScheduleSelectorProps> = ({
  onSelectionChange,
  minDays = 1,
  maxDays = 7,
  requireContiguous = false,
  initialSelection = [],
}) => {
  const [selectedDays, setSelectedDays] = useState<Set<Day>>(new Set(initialSelection));
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Validate selection
  const validateSelection = useCallback(
    (days: Set<Day>): { isValid: boolean; errorMessage?: string } => {
      if (days.size < minDays) {
        return {
          isValid: false,
          errorMessage: `Please select at least ${minDays} day${minDays > 1 ? 's' : ''}`,
        };
      }

      if (days.size > maxDays) {
        return {
          isValid: false,
          errorMessage: `Please select no more than ${maxDays} day${maxDays > 1 ? 's' : ''}`,
        };
      }

      if (requireContiguous && days.size > 1) {
        const sortedDays = Array.from(days).sort((a, b) => a - b);
        for (let i = 1; i < sortedDays.length; i++) {
          if (sortedDays[i] - sortedDays[i - 1] > 1) {
            return {
              isValid: false,
              errorMessage: 'Selected days must be consecutive',
            };
          }
        }
      }

      return { isValid: true };
    },
    [minDays, maxDays, requireContiguous]
  );

  // Calculate check-in and check-out days
  const getCheckInCheckOut = useCallback((days: Set<Day>) => {
    if (days.size === 0) return {};

    const sortedDays = Array.from(days).sort((a, b) => a - b);
    return {
      checkIn: sortedDays[0],
      checkOut: (sortedDays[sortedDays.length - 1] + 1) % 7,
    };
  }, []);

  // Emit selection change
  useEffect(() => {
    const validation = validateSelection(selectedDays);
    const { checkIn, checkOut } = getCheckInCheckOut(selectedDays);

    const selection: DaySelection = {
      selectedDays: Array.from(selectedDays),
      checkIn,
      checkOut,
      isValid: validation.isValid,
      errorMessage: validation.errorMessage,
    };

    setErrorMessage(validation.errorMessage || '');
    onSelectionChange(selection);
  }, [selectedDays, validateSelection, getCheckInCheckOut, onSelectionChange]);

  // Toggle day selection
  const toggleDay = useCallback((day: Day) => {
    setSelectedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  }, []);

  // Mouse handlers for drag selection
  const handleMouseDown = useCallback(
    (day: Day) => {
      setIsDragging(true);
      toggleDay(day);
    },
    [toggleDay]
  );

  const handleMouseEnter = useCallback(
    (day: Day) => {
      if (isDragging) {
        toggleDay(day);
      }
    },
    [isDragging, toggleDay]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);

  const { checkIn, checkOut } = getCheckInCheckOut(selectedDays);

  return (
    <Container>
      <HelpText>Click or drag to select your preferred rental days</HelpText>
      <DaysRow>
        {DAY_LABELS.map((label, index) => (
          <DayButton
            key={index}
            $selected={selectedDays.has(index as Day)}
            $disabled={false}
            onMouseDown={() => handleMouseDown(index as Day)}
            onMouseEnter={() => handleMouseEnter(index as Day)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </DayButton>
        ))}
      </DaysRow>

      {selectedDays.size > 0 && (
        <>
          <InfoRow>
            <div>
              <InfoLabel>Check-in: </InfoLabel>
              <InfoValue>{checkIn !== undefined ? DAY_NAMES[checkIn] : '-'}</InfoValue>
            </div>
            <div>
              <InfoLabel>Check-out: </InfoLabel>
              <InfoValue>{checkOut !== undefined ? DAY_NAMES[checkOut] : '-'}</InfoValue>
            </div>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Total Nights: </InfoLabel>
            <InfoValue>{selectedDays.size}</InfoValue>
          </InfoRow>
        </>
      )}

      {errorMessage && (
        <ErrorMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {errorMessage}
        </ErrorMessage>
      )}
    </Container>
  );
};

export default SearchScheduleSelector;
