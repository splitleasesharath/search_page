/**
 * SearchResults Styled Components
 */

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`;

export const ResultCount = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  gap: 16px;
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.div`
  font-size: 14px;
  color: #6b7280;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  gap: 12px;
`;

export const EmptyIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
`;

export const EmptyText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
`;

export const EmptySubtext = styled.div`
  font-size: 14px;
  color: #6b7280;
  max-width: 400px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  gap: 12px;
  background: #fef2f2;
  border-radius: 12px;
`;

export const ErrorIcon = styled.div`
  font-size: 48px;
`;

export const ErrorText = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #dc2626;
`;
