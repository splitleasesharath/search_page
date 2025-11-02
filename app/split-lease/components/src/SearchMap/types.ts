/**
 * SearchMap Types
 */

export interface MapMarker {
  id: string;
  listingId: string;
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  price: number;
  image?: string;
  neighborhood?: string;
}

export interface SearchMapProps {
  /** Array of map markers */
  markers: MapMarker[];

  /** Map center coordinates */
  center?: { lat: number; lng: number };

  /** Map zoom level */
  zoom?: number;

  /** Google Maps API key */
  apiKey?: string;

  /** Custom styling class name */
  className?: string;

  /** Callback when a marker is clicked */
  onMarkerClick?: (markerId: string) => void;

  /** Loading state */
  isLoading?: boolean;
}
