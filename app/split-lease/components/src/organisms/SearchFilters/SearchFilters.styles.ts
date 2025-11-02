import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 380px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
    gap: 20px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: #333333;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const Divider = styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #e0e0e0;
  width: 100%;
`;

export const FiltersGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
