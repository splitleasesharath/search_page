import styled from 'styled-components';

export const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 0;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
    }
`;

export const ListingCard = styled.div`
    background-color: #ffffff;
    border: 1px solid #dadce0;
    border-radius: 8px;
    overflow: hidden;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }
`;

export const ListingImage = styled.div<{ imageUrl?: string }>`
    width: 100%;
    height: 200px;
    background-color: #e0e0e0;
    background-image: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'none'};
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9e9e9e;
    font-size: 48px;
`;

export const ListingContent = styled.div`
    padding: 16px;
`;

export const ListingTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #202124;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const ListingDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const ListingDetail = styled.div`
    font-size: 14px;
    color: #5f6368;
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const ListingPrice = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #1a73e8;
    margin-top: 12px;
`;

export const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    font-size: 16px;
    color: #5f6368;
`;

export const EmptyState = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    padding: 40px 20px;
    text-align: center;
`;

export const EmptyStateIcon = styled.div`
    font-size: 64px;
    margin-bottom: 16px;
`;

export const EmptyStateTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: #424242;
    margin-bottom: 8px;
`;

export const EmptyStateText = styled.p`
    font-size: 14px;
    color: #757575;
    max-width: 400px;
`;
