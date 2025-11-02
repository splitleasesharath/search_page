import styled from 'styled-components';

export const MapContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
    border-radius: 4px;
    padding: 40px 20px;
    text-align: center;
`;

export const MapIcon = styled.div`
    font-size: 64px;
    margin-bottom: 16px;
    color: #9e9e9e;
`;

export const MapTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #424242;
    margin-bottom: 8px;
`;

export const MapDescription = styled.p`
    font-size: 14px;
    color: #757575;
    max-width: 400px;
    line-height: 1.5;
`;

export const MapInfoList = styled.ul`
    margin-top: 20px;
    text-align: left;
    font-size: 13px;
    color: #616161;
    list-style: none;
    padding: 0;

    li {
        padding: 4px 0;

        &:before {
            content: '→ ';
            color: #9e9e9e;
            margin-right: 8px;
        }
    }
`;
