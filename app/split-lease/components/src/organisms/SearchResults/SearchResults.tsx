import React from 'react';
import {
  Container,
  GridContainer,
  PlaceholderCard,
  PlaceholderContent,
  PlaceholderTitle,
  PlaceholderText,
  PlaceholderIcon,
} from './SearchResults.styles';

export interface SearchResultsProps {
  className?: string;
}

/**
 * SearchResults - Placeholder component for search results grid
 * Will be replaced with actual listing data from Supabase in future phase
 */
export const SearchResults: React.FC<SearchResultsProps> = ({ className }) => {
  return (
    <Container className={className}>
      <GridContainer>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <PlaceholderCard key={i}>
            <PlaceholderContent>
              <PlaceholderIcon>🏠</PlaceholderIcon>
              <PlaceholderTitle>Listing {i}</PlaceholderTitle>
              <PlaceholderText>
                Results coming soon
              </PlaceholderText>
            </PlaceholderContent>
          </PlaceholderCard>
        ))}
      </GridContainer>

      <PlaceholderCard style={{ marginTop: '1.5rem' }}>
        <PlaceholderContent>
          <PlaceholderIcon>🔄</PlaceholderIcon>
          <PlaceholderTitle>Supabase Integration Pending</PlaceholderTitle>
          <PlaceholderText>
            Search results will be populated from the database once Supabase integration is complete.
            <br />
            The filter selections above are fully functional and ready to query real data.
          </PlaceholderText>
        </PlaceholderContent>
      </PlaceholderCard>
    </Container>
  );
};

export default SearchResults;
