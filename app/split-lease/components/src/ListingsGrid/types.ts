export interface ListingsGridProps {
  listings: any[];
  loading?: boolean;
  error?: string;
  onListingView?: (listingId: string) => void;
}
