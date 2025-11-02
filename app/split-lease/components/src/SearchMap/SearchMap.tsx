/**
 * SearchMap Component
 *
 * Displays listing markers on a Google Map.
 * Note: This is a placeholder implementation. Google Maps integration requires
 * the Google Maps JavaScript API to be loaded in the page.
 */

import React from 'react';
import type { SearchMapProps } from './types';
import { Container, MapPlaceholder, MapIcon } from './SearchMap.styles';

/**
 * SearchMap Component
 */
export const SearchMap: React.FC<SearchMapProps> = ({
  markers,
  center = { lat: 40.7128, lng: -74.0060 },
  zoom = 12,
  className,
  onMarkerClick,
  isLoading = false,
}) => {
  // TODO: Implement actual Google Maps integration
  // This requires the Google Maps JavaScript API to be loaded
  // See: https://developers.google.com/maps/documentation/javascript/overview

  return (
    <Container className={className}>
      <MapPlaceholder>
        <MapIcon>🗺️</MapIcon>
        <div>Map View</div>
        <div style={{ fontSize: '12px', textAlign: 'center', maxWidth: '300px' }}>
          {isLoading
            ? 'Loading map...'
            : `Showing ${markers.length} ${markers.length === 1 ? 'property' : 'properties'} on map`}
        </div>
        <div style={{ fontSize: '11px', color: '#9ca3af' }}>
          Google Maps integration to be implemented
        </div>
      </MapPlaceholder>
    </Container>
  );
};

export default SearchMap;
