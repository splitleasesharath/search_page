/**
 * SearchMap Styled Components
 */

import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  background: #f3f4f6;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 400px;
  }
`;

export const MapPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 16px;
  color: #6b7280;
  font-size: 14px;
`;

export const MapIcon = styled.div`
  font-size: 48px;
  opacity: 0.5;
`;
