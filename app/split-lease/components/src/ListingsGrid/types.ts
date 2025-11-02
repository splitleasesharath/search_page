export interface Listing {
    id: string;
    title: string;
    borough: string;
    price: number;
    imageUrl?: string;
    weekPattern?: string;
    bedrooms?: number;
    bathrooms?: number;
}

export interface ListingsGridProps {
    listings?: Listing[];
    loading?: boolean;
}
