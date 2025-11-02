/**
 * SearchResults Types
 */

export interface SearchResultsProps {
  /** Array of listing results */
  listings: any[]; // Using any to avoid external dependency

  /** Loading state */
  isLoading?: boolean;

  /** Error message */
  error?: string;

  /** Total count of results */
  totalCount?: number;

  /** Custom styling class name */
  className?: string;

  /** Callback when a listing is clicked */
  onListingClick?: (listingId: string) => void;
}
