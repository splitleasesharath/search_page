/**
 * MapView component - Placeholder for Google Maps integration
 */

import React from 'react';
import styled from 'styled-components';
import { MapViewProps } from './types';

const Container = styled.div`
  width: 100%;
  height: 500px;
  background: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
  border: 2px dashed #ccc;
`;

export const MapView: React.FC<MapViewProps> = ({ listings }) => {
  return (
    <Container>
      <div>
        <div>Map View - Google Maps Integration Coming Soon</div>
        <div style={{ fontSize: '14px', marginTop: '8px' }}>
          {listings?.length || 0} listings to display
        </div>
      </div>
    </Container>
  );
};

export default MapView;
