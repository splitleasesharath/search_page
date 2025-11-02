import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  Container,
  DaysContainer,
  DayButton,
  InfoSection,
  InfoItem,
  InfoLabel,
  InfoValue,
  ErrorMessage,
  SectionLabel,
} from './SearchScheduleSelector.styles';
import { SearchScheduleSelectorProps, Day, ScheduleValidation } from './types';

const DAYS: Omit<Day, 'selected'>[] = [
  { label: 'Sunday', short: 'S', index: 0 },
  { label: 'Monday', short: 'M', index: 1 },
  { label: 'Tuesday', short: 'T', index: 2 },
  { label: 'Wednesday', short: 'W', index: 3 },
  { label: 'Thursday', short: 'T', index: 4 },
  { label: 'Friday', short: 'F', index: 5 },
  { label: 'Saturday', short: 'S', index: 6 },
];

/**
 * SearchScheduleSelector - Interactive day-of-week picker for split lease schedules
 * Supports click and drag selection with validation for contiguous days
 */
export const SearchScheduleSelector: React.FC<SearchScheduleSelectorProps> = ({
  selectedDays = [],
  onChange,
  minDays = 2,
  maxDays = 5,
  requireContiguous = true,
  className,
}) => {
  const [selected, setSelected] = useState<Set<number>>(new Set(selectedDays));
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [validation, setValidation] = useState<ScheduleValidation>({ isValid: true });
  const containerRef = useRef<HTMLDivElement>(null);

  // Validate selection
  const validateSelection = useCallback((days: Set<number>): ScheduleValidation => {
    const count = days.size;

    if (count === 0) {
      return { isValid: true };
    }

    if (count < minDays) {
      return {
        isValid: false,
        errorMessage: `Please select at least ${minDays} days`,
      };
    }

    if (count > maxDays) {
      return {
        isValid: false,
        errorMessage: `Please select no more than ${maxDays} days`,
      };
    }

    if (requireContiguous && count > 1) {
      const sortedDays = Array.from(days).sort((a, b) => a - b);

      // Check if days are contiguous (including wrap-around Sunday-Saturday)
      let isContiguous = true;

      // Check normal contiguous
      for (let i = 1; i < sortedDays.length; i++) {
        if (sortedDays[i] - sortedDays[i - 1] !== 1) {
          isContiguous = false;
          break;
        }
      }

      // If not contiguous normally, check wrap-around (e.g., Sat-Sun or Fri-Sat-Sun)
      if (!isContiguous && sortedDays.includes(0) && sortedDays.includes(6)) {
        // Check if it wraps around the week
        const withoutSunday = sortedDays.filter(d => d !== 0);
        const withoutSaturday = sortedDays.filter(d => d !== 6);

        // Check if Saturday through Sunday is contiguous
        if (withoutSunday.length > 0 && withoutSunday[withoutSunday.length - 1] === 6) {
          isContiguous = true;
          for (let i = 1; i < withoutSunday.length; i++) {
            if (withoutSunday[i] - withoutSunday[i - 1] !== 1) {
              isContiguous = false;
              break;
            }
          }
        }

        // Check if Sunday through some day is contiguous
        if (!isContiguous && withoutSaturday.length > 0 && withoutSaturday[0] === 0) {
          isContiguous = true;
          for (let i = 1; i < withoutSaturday.length; i++) {
            if (withoutSaturday[i] - withoutSaturday[i - 1] !== 1) {
              isContiguous = false;
              break;
            }
          }
        }
      }

      if (!isContiguous) {
        return {
          isValid: false,
          errorMessage: 'Please select consecutive days',
        };
      }
    }

    return { isValid: true };
  }, [minDays, maxDays, requireContiguous]);

  // Update validation when selection changes
  useEffect(() => {
    const result = validateSelection(selected);
    setValidation(result);
  }, [selected, validateSelection]);

  // Handle day click
  const handleDayClick = (dayIndex: number) => {
    const newSelected = new Set(selected);

    if (newSelected.has(dayIndex)) {
      newSelected.delete(dayIndex);
    } else {
      if (newSelected.size < maxDays) {
        newSelected.add(dayIndex);
      }
    }

    setSelected(newSelected);
    onChange?.(Array.from(newSelected).sort((a, b) => a - b));
  };

  // Handle drag start
  const handleMouseDown = (dayIndex: number) => {
    setIsDragging(true);
    setDragStart(dayIndex);

    const newSelected = new Set(selected);
    if (newSelected.size < maxDays) {
      newSelected.add(dayIndex);
      setSelected(newSelected);
    }
  };

  // Handle drag over
  const handleMouseEnter = (dayIndex: number) => {
    if (!isDragging || dragStart === null) return;

    const start = Math.min(dragStart, dayIndex);
    const end = Math.max(dragStart, dayIndex);
    const newSelected = new Set<number>();

    for (let i = start; i <= end; i++) {
      if (newSelected.size < maxDays) {
        newSelected.add(i);
      }
    }

    setSelected(newSelected);
  };

  // Handle drag end
  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragStart(null);
      onChange?.(Array.from(selected).sort((a, b) => a - b));
    }
  };

  // Attach global mouse up listener
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, selected]);

  // Get check-in and check-out days
  const getCheckInCheckOut = () => {
    if (selected.size === 0) {
      return { checkIn: '-', checkOut: '-' };
    }

    const sortedDays = Array.from(selected).sort((a, b) => a - b);
    const checkInDay = DAYS[sortedDays[0]].label;
    const checkOutDay = sortedDays.length > 1
      ? DAYS[sortedDays[sortedDays.length - 1]].label
      : checkInDay;

    return { checkIn: checkInDay, checkOut: checkOutDay };
  };

  const { checkIn, checkOut } = getCheckInCheckOut();

  return (
    <Container className={className} ref={containerRef}>
      <SectionLabel>Select Your Days</SectionLabel>

      <DaysContainer>
        {DAYS.map((day) => (
          <DayButton
            key={day.index}
            selected={selected.has(day.index)}
            onClick={() => handleDayClick(day.index)}
            onMouseDown={() => handleMouseDown(day.index)}
            onMouseEnter={() => handleMouseEnter(day.index)}
            aria-label={day.label}
            aria-pressed={selected.has(day.index)}
            title={day.label}
          >
            {day.short}
          </DayButton>
        ))}
      </DaysContainer>

      <InfoSection>
        <InfoItem>
          <InfoLabel>Check-in</InfoLabel>
          <InfoValue>{checkIn}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>Check-out</InfoLabel>
          <InfoValue>{checkOut}</InfoValue>
        </InfoItem>
      </InfoSection>

      {!validation.isValid && validation.errorMessage && (
        <ErrorMessage role="alert">{validation.errorMessage}</ErrorMessage>
      )}
    </Container>
  );
};

export default SearchScheduleSelector;
