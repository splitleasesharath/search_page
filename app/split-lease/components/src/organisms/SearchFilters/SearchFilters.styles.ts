import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const FilterSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5rem 0;
`;

export const ListingsCounter = styled.div`
  padding: 1rem;
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 6px;
  text-align: center;
  margin-top: 1.5rem;
`;

export const CounterLabel = styled.div`
  font-size: 0.75rem;
  color: #1e40af;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const CounterValue = styled.div`
  font-size: 1.5rem;
  color: #1e3a8a;
  font-weight: 700;
`;

export const FilterGroupTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
