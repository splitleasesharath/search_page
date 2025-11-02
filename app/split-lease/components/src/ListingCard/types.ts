export interface ListingCardProps {
  listing: {
    id: string;
    name?: string;
    primary_photo_url?: string;
    location?: {
      neighborhood?: string;
      borough?: string;
    };
    pricing?: {
      standardized_minimum_nightly_price?: number;
    };
    features?: {
      bedrooms?: number;
      bathrooms?: number;
      type_of_space?: string;
    };
  };
  price?: number;
  onView?: (listingId: string) => void;
}
