import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-height: 600px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const PlaceholderCard = styled.div`
  background-color: #ffffff;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
`;

export const PlaceholderContent = styled.div`
  text-align: center;
  color: #6b7280;
`;

export const PlaceholderTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

export const PlaceholderText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
`;

export const PlaceholderIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;
