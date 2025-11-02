/**
 * ListingsGrid component - Grid container for listing cards
 */

import React from 'react';
import styled from 'styled-components';
import { ListingCard } from '../ListingCard';
import { ListingsGridProps } from './types';

const Container = styled.div`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 16px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  color: #d32f2f;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  text-align: center;
  color: #666;

  h3 {
    margin: 0 0 12px 0;
    font-size: 24px;
    color: #333;
  }

  p {
    margin: 0;
    font-size: 16px;
  }
`;

const ResultsHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const ListingsGrid: React.FC<ListingsGridProps> = ({
  listings,
  loading = false,
  error,
  onListingView,
}) => {
  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div>Loading listings...</div>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <h3>Error Loading Listings</h3>
          <p>{error}</p>
        </ErrorContainer>
      </Container>
    );
  }

  if (!listings || listings.length === 0) {
    return (
      <Container>
        <EmptyState>
          <h3>No Listings Found</h3>
          <p>We didn't find any results with your current filters. Try adjusting your search criteria.</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <ResultsHeader>{listings.length} listing{listings.length !== 1 ? 's' : ''} found</ResultsHeader>
      <Grid>
        {listings.map((item) => (
          <ListingCard
            key={item.listing?.id || item.id}
            listing={item.listing || item}
            price={item.displayPrice || item.pricePerNight}
            onView={onListingView}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default ListingsGrid;
