import React from 'react';
import {
  Container,
  MapPlaceholder,
  PlaceholderContent,
  PlaceholderIcon,
  PlaceholderTitle,
  PlaceholderText,
} from './SearchMap.styles';

export interface SearchMapProps {
  className?: string;
}

/**
 * SearchMap - Placeholder component for map integration
 * Will be replaced with Google Maps integration in future phase
 */
export const SearchMap: React.FC<SearchMapProps> = ({ className }) => {
  return (
    <Container className={className}>
      <MapPlaceholder>
        <PlaceholderContent>
          <PlaceholderIcon>🗺️</PlaceholderIcon>
          <PlaceholderTitle>Map Coming Soon</PlaceholderTitle>
          <PlaceholderText>
            Interactive Google Maps integration will display listing locations here.
            <br /><br />
            Features will include:
            <br />• Listing markers
            <br />• Clustering
            <br />• Click to view details
          </PlaceholderText>
        </PlaceholderContent>
      </MapPlaceholder>
    </Container>
  );
};

export default SearchMap;
