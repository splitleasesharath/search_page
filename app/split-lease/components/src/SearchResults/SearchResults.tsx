/**
 * SearchResults Component
 *
 * Displays search results in a grid layout using ListingCard components.
 */

import React from 'react';
import { ListingCard } from '../molecules/ListingCard';
import type { SearchResultsProps } from './types';
import {
  Container,
  Header,
  ResultCount,
  Grid,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  EmptyState,
  EmptyIcon,
  EmptyText,
  EmptySubtext,
  ErrorContainer,
  ErrorIcon,
  ErrorText,
} from './SearchResults.styles';

/**
 * SearchResults Component
 */
export const SearchResults: React.FC<SearchResultsProps> = ({
  listings,
  isLoading = false,
  error,
  totalCount,
  className,
  onListingClick,
}) => {
  // Loading state
  if (isLoading) {
    return (
      <Container className={className}>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Searching for properties...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container className={className}>
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorText>Unable to load search results</ErrorText>
          <EmptySubtext>{error}</EmptySubtext>
        </ErrorContainer>
      </Container>
    );
  }

  // Empty state
  if (!listings || listings.length === 0) {
    return (
      <Container className={className}>
        <EmptyState>
          <EmptyIcon>🏠</EmptyIcon>
          <EmptyText>No properties found</EmptyText>
          <EmptySubtext>
            Try adjusting your filters or search criteria to find more properties.
          </EmptySubtext>
        </EmptyState>
      </Container>
    );
  }

  // Results display
  const count = totalCount !== undefined ? totalCount : listings.length;

  return (
    <Container className={className}>
      <Header>
        <ResultCount>
          {count} {count === 1 ? 'property' : 'properties'} found
        </ResultCount>
      </Header>
      <Grid>
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onClick={onListingClick ? () => onListingClick(listing.id) : undefined}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
