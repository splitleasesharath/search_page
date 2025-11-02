export interface MapPlaceholderProps {
    center?: {
        lat: number;
        lng: number;
    };
    zoom?: number;
    markers?: Array<{
        id: string;
        lat: number;
        lng: number;
        title: string;
    }>;
}
