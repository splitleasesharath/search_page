import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label<{ $required?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: #333333;
  display: flex;
  align-items: center;
  gap: 4px;

  ${props => props.$required && `
    &::after {
      content: '*';
      color: #d32f2f;
    }
  `}
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.input<{ $error?: boolean; $hasIcon?: boolean }>`
  width: 100%;
  padding: 12px ${props => props.$hasIcon ? '16px 12px 44px' : '16px'};
  font-size: 14px;
  font-family: inherit;
  color: #333333;
  background-color: #ffffff;
  border: 2px solid ${props => props.$error ? '#d32f2f' : '#e0e0e0'};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$error ? '#d32f2f' : '#667eea'};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#d32f2f' : '#667eea'};
    box-shadow: 0 0 0 3px ${props => props.$error ? 'rgba(211, 47, 47, 0.1)' : 'rgba(102, 126, 234, 0.1)'};
  }

  &:disabled {
    background-color: #f5f5f5;
    color: #9e9e9e;
    cursor: not-allowed;
    border-color: #e0e0e0;
  }

  &::placeholder {
    color: #9e9e9e;
  }
`;

export const Icon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 18px;
  color: #666666;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #d32f2f;
  margin-top: 4px;
`;
