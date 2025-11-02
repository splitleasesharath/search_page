import styled from 'styled-components';

export const FilterContainer = styled.div`
    margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #202124;
    margin-bottom: 8px;
`;

export const Select = styled.select`
    width: 100%;
    padding: 10px 12px;
    font-size: 14px;
    border: 1px solid #dadce0;
    border-radius: 4px;
    background-color: #ffffff;
    color: #202124;
    cursor: pointer;
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #1a73e8;
    }

    &:focus {
        outline: none;
        border-color: #1a73e8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
    }

    option {
        padding: 8px;
    }
`;
