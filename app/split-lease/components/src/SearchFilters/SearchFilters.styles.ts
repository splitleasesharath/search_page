import styled from 'styled-components';

export const FiltersContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const FilterGroup = styled.div`
    margin-bottom: 8px;
`;

export const ScheduleSelectorWrapper = styled.div`
    margin-top: 24px;
    padding: 16px;
    background-color: #e8f5e9;
    border: 2px solid #4caf50;
    border-radius: 8px;
`;

export const ScheduleSelectorTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #2e7d32;
    margin-bottom: 12px;
`;

export const SchedulePlaceholder = styled.div`
    padding: 20px;
    text-align: center;
    color: #5f6368;
    font-size: 14px;
`;
