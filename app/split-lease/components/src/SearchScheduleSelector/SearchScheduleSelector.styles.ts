import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
  user-select: none;
`;

export const DayButton = styled.button<{ selected: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  min-width: 32px;
  border-radius: 50%;
  border: 2px solid ${props => props.selected ? '#2563eb' : '#d1d5db'};
  background-color: ${props => props.selected ? '#2563eb' : '#ffffff'};
  color: ${props => props.selected ? '#ffffff' : '#374151'};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    border-color: #2563eb;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    font-size: 0.75rem;
    min-width: 28px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

export const InfoItem = styled.div`
  flex: 1;
`;

export const InfoLabel = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  font-weight: 500;
`;

export const InfoValue = styled.div`
  font-size: 0.875rem;
  color: #111827;
  font-weight: 600;
`;

export const ErrorMessage = styled.div`
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
  color: #dc2626;
  font-size: 0.875rem;
  line-height: 1.4;
`;

export const SectionLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.75rem;
`;
