import React from 'react';
import { MapPlaceholderProps } from './types';
import {
    MapContainer,
    MapIcon,
    MapTitle,
    MapDescription,
    MapInfoList,
} from './MapPlaceholder.styles';

export const MapPlaceholder: React.FC<MapPlaceholderProps> = () => {
    return (
        <MapContainer>
            <MapIcon>🗺️</MapIcon>
            <MapTitle>Google Maps Integration - Coming Soon</MapTitle>
            <MapDescription>
                Interactive map view will display listing locations across NYC and NJ
            </MapDescription>
            <MapInfoList>
                <li>Dynamic marker placement based on listings</li>
                <li>Map centering by borough selection</li>
                <li>Marker clustering for dense areas</li>
                <li>Info windows with listing previews</li>
            </MapInfoList>
        </MapContainer>
    );
};
