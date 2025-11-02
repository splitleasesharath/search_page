/**
 * SearchScheduleSelector styled components
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
`;

export const DaysRow = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const DayButton = styled(motion.button)<{ $selected: boolean; $disabled: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.$selected ? '#007AFF' : '#E5E5EA')};
  background: ${(props) => (props.$selected ? '#007AFF' : '#ffffff')};
  color: ${(props) => (props.$selected ? '#ffffff' : '#000000')};
  font-size: 14px;
  font-weight: 600;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  user-select: none;

  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(0, 122, 255, 0.2);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 12px;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
  color: #666;
`;

export const InfoLabel = styled.span`
  font-weight: 500;
`;

export const InfoValue = styled.span`
  font-weight: 600;
  color: #000;
`;

export const ErrorMessage = styled(motion.div)`
  padding: 12px;
  background: #FFF3F3;
  border: 1px solid #FFE5E5;
  border-radius: 6px;
  color: #D32F2F;
  font-size: 14px;
  text-align: center;
`;

export const HelpText = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  text-align: center;
`;
