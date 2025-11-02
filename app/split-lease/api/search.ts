/**
 * Search API
 *
 * API methods for searching listings with filters.
 */

import { supabase } from './client';
import type { SearchFilters, SearchResults, Day } from '../types/search';
import type { SplitLease } from '../types/models';

/**
 * Search for listings based on filters
 */
export async function searchListings(
  filters: SearchFilters
): Promise<SearchResults> {
  try {
    let query = supabase
      .from('listings')
      .select('*', { count: 'exact' })
      .eq('status', 'active')
      .eq('approved', true);

    // Borough filter
    if (filters.borough && filters.borough !== 'All Boroughs') {
      query = query.eq('location_borough', filters.borough);
    }

    // Price filter
    if (filters.priceTier) {
      query = query
        .gte('price', filters.priceTier.min)
        .lte('price', filters.priceTier.max);
    }

    // Neighborhood filter
    if (filters.neighborhoods && filters.neighborhoods.length > 0) {
      // Using contains for JSONB array field
      query = query.contains('location_hoods', filters.neighborhoods);
    }

    // Selected days filter
    if (filters.selectedDays && filters.selectedDays.length > 0) {
      const dayIndices = filters.selectedDays.map((day) => day.index);
      // Assuming days_available is a JSONB array field containing day indices
      query = query.contains('days_available', dayIndices);
    }

    // Sort by
    if (filters.sortBy) {
      const fieldName = filters.sortBy.fieldName;
      const descending = filters.sortBy.descending;

      if (fieldName === '.Search Ranking') {
        // Custom search ranking field
        query = query.order('search_ranking', { ascending: !descending });
      } else if (fieldName === 'price') {
        query = query.order('price', { ascending: !descending });
      } else if (fieldName === 'view_count') {
        query = query.order('view_count', { ascending: !descending });
      } else if (fieldName === 'Created Date') {
        query = query.order('created_at', { ascending: !descending });
      }
    }

    // Limit results
    query = query.limit(50);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Search failed: ${error.message}`);
    }

    return {
      listings: (data as SplitLease[]) || [],
      total: count || 0,
      page: 1,
      pageSize: 50,
      hasMore: (count || 0) > 50,
    };
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
}

/**
 * Get neighborhoods for a specific borough
 */
export async function getNeighborhoods(borough: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('location_hoods')
      .eq('location_borough', borough)
      .eq('status', 'active');

    if (error) {
      throw new Error(`Failed to fetch neighborhoods: ${error.message}`);
    }

    // Extract unique neighborhoods from JSONB arrays
    const neighborhoods = new Set<string>();
    data?.forEach((listing: any) => {
      if (listing.location_hoods && Array.isArray(listing.location_hoods)) {
        listing.location_hoods.forEach((hood: string) => neighborhoods.add(hood));
      }
    });

    return Array.from(neighborhoods).sort();
  } catch (error) {
    console.error('Get neighborhoods error:', error);
    return [];
  }
}

/**
 * Get available boroughs
 */
export async function getBoroughs(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('location_borough')
      .eq('status', 'active')
      .not('location_borough', 'is', null);

    if (error) {
      throw new Error(`Failed to fetch boroughs: ${error.message}`);
    }

    // Extract unique boroughs
    const boroughs = new Set<string>();
    data?.forEach((listing: any) => {
      if (listing.location_borough) {
        boroughs.add(listing.location_borough);
      }
    });

    return Array.from(boroughs).sort();
  } catch (error) {
    console.error('Get boroughs error:', error);
    return [];
  }
}

/**
 * Get listing counts for selected days
 * Returns both exact and partial matches
 */
export async function getListingCounts(
  selectedDays: Day[]
): Promise<{ exact: number; partial: number }> {
  try {
    const dayIndices = selectedDays.map((day) => day.index);

    // Exact matches (listings with exactly these days available)
    const { count: exactCount } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .eq('approved', true)
      .contains('days_available', dayIndices);

    // Partial matches (listings with at least one of these days available)
    const { count: partialCount } = await supabase
      .from('listings')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .eq('approved', true)
      .overlaps('days_available', dayIndices);

    return {
      exact: exactCount || 0,
      partial: partialCount || 0,
    };
  } catch (error) {
    console.error('Get listing counts error:', error);
    return { exact: 0, partial: 0 };
  }
}
