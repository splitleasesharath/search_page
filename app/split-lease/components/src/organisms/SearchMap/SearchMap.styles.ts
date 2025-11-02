import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  overflow: hidden;
`;

export const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.1) 20px,
        rgba(255, 255, 255, 0.1) 40px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(255, 255, 255, 0.1) 20px,
        rgba(255, 255, 255, 0.1) 40px
      );
    pointer-events: none;
  }
`;

export const PlaceholderContent = styled.div`
  text-align: center;
  color: #6b7280;
  z-index: 1;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 320px;
`;

export const PlaceholderIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
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
  color: #6b7280;
`;
