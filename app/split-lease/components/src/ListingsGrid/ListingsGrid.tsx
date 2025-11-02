import React from 'react';
import { ListingsGridProps, Listing } from './types';
import {
    GridContainer,
    ListingCard,
    ListingImage,
    ListingContent,
    ListingTitle,
    ListingDetails,
    ListingDetail,
    ListingPrice,
    LoadingContainer,
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateText,
} from './ListingsGrid.styles';

// Mock data for placeholder listings
const MOCK_LISTINGS: Listing[] = [
    {
        id: '1',
        title: 'Spacious Manhattan Studio',
        borough: 'Manhattan',
        price: 250,
        weekPattern: 'Every week',
        bedrooms: 1,
        bathrooms: 1,
    },
    {
        id: '2',
        title: 'Brooklyn 2BR with Garden',
        borough: 'Brooklyn',
        price: 320,
        weekPattern: 'One week on/one week off',
        bedrooms: 2,
        bathrooms: 1,
    },
    {
        id: '3',
        title: 'Modern Queens Apartment',
        borough: 'Queens',
        price: 280,
        weekPattern: 'Every week',
        bedrooms: 1,
        bathrooms: 1,
    },
    {
        id: '4',
        title: 'Cozy Hudson County Home',
        borough: 'Hudson County NJ',
        price: 190,
        weekPattern: 'Two weeks on/two weeks off',
        bedrooms: 2,
        bathrooms: 2,
    },
];

export const ListingsGrid: React.FC<ListingsGridProps> = ({
    listings = MOCK_LISTINGS,
    loading = false,
}) => {
    if (loading) {
        return <LoadingContainer>Loading listings...</LoadingContainer>;
    }

    if (!listings || listings.length === 0) {
        return (
            <EmptyState>
                <EmptyStateIcon>🏠</EmptyStateIcon>
                <EmptyStateTitle>No listings found</EmptyStateTitle>
                <EmptyStateText>
                    Try adjusting your filters to see more results
                </EmptyStateText>
            </EmptyState>
        );
    }

    return (
        <GridContainer>
            {listings.map((listing) => (
                <ListingCard key={listing.id}>
                    <ListingImage imageUrl={listing.imageUrl}>
                        {!listing.imageUrl && '🏠'}
                    </ListingImage>
                    <ListingContent>
                        <ListingTitle>{listing.title}</ListingTitle>
                        <ListingDetails>
                            <ListingDetail>📍 {listing.borough}</ListingDetail>
                            {listing.bedrooms && listing.bathrooms && (
                                <ListingDetail>
                                    🛏️ {listing.bedrooms} bed · 🚿 {listing.bathrooms} bath
                                </ListingDetail>
                            )}
                            {listing.weekPattern && (
                                <ListingDetail>📅 {listing.weekPattern}</ListingDetail>
                            )}
                        </ListingDetails>
                        <ListingPrice>${listing.price}/night</ListingPrice>
                    </ListingContent>
                </ListingCard>
            ))}
        </GridContainer>
    );
};
