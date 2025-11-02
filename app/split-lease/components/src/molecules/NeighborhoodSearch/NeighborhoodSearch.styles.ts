import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background-color: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  transition: all 0.2s ease;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: #2563eb;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }

  &:disabled {
    background-color: #f3f4f6;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ListBox = styled.div`
  margin-top: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: #ffffff;
  display: none;

  &.show {
    display: block;
  }
`;

export const ListItem = styled.div<{ selected?: boolean }>`
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  color: ${props => props.selected ? '#2563eb' : '#111827'};
  background-color: ${props => props.selected ? '#eff6ff' : '#ffffff'};
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: #f3f4f6;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e5e7eb;
  }
`;

export const EmptyState = styled.div`
  padding: 1rem 0.75rem;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  font-style: italic;
`;
