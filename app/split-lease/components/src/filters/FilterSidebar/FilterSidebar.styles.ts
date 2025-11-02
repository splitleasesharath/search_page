import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 24px;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
    padding: 16px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333333;
  margin: 0;
  padding-bottom: 16px;
  border-bottom: 2px solid #e0e0e0;
`;

export const FiltersGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ScheduleSection = styled.div`
  padding-top: 8px;
  border-top: 1px solid #e0e0e0;
`;
