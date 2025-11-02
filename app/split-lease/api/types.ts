/**
 * API-specific request and response types
 */

import { Listing, ListingCardData } from '../types/models';
import { SearchFilters } from '../types/filters';
import { Borough } from '../types/filters';

// Search request
export interface SearchRequest {
  filters: SearchFilters;
  limit?: number;
  offset?: number;
}

// Search response
export interface SearchResponse {
  listings: ListingCardData[];
  total: number;
  hasMore: boolean;
}

// Filter options response
export interface FilterOptionsResponse {
  boroughs: Borough[];
  neighborhoods: { [borough: string]: string[] };
  amenitiesInUnit: string[];
  amenitiesInBuilding: string[];
}

// API result wrapper
export interface ApiResult<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}
