/**
 * Listing search and retrieval functions
 */

import { getSupabaseClient, handleApiError } from './client';
import { Listing, ListingCardData, ScheduleMatchType } from '../types/models';
import { SearchFilters, SortOption } from '../types/filters';
import { SearchResponse, ApiResult } from './types';
import { Day } from '../types/schedule';

/**
 * Search listings with filters
 */
export async function searchListings(
  filters: SearchFilters,
  limit: number = 50,
  offset: number = 0
): Promise<ApiResult<SearchResponse>> {
  try {
    const supabase = getSupabaseClient();
    let query = supabase
      .from('listing')
      .select('*', { count: 'exact' })
      .eq('status', 'Active')
      .eq('approval_status', 'Approved');

    // Filter by schedule (days available)
    if (filters.schedule && filters.schedule.length > 0) {
      // Query listings where days_available contains all selected days
      query = query.contains('days_available', filters.schedule);
    }

    // Filter by price range
    if (filters.priceRange) {
      if (filters.priceRange.min !== undefined) {
        query = query.gte('standardized_minimum_nightly_price', filters.priceRange.min);
      }
      if (filters.priceRange.max !== undefined) {
        query = query.lte('standardized_minimum_nightly_price', filters.priceRange.max);
      }
    }

    // Filter by location
    if (filters.location) {
      if (filters.location.boroughs.length > 0) {
        query = query.in('location_borough', filters.location.boroughs);
      }
      if (filters.location.neighborhoods.length > 0) {
        query = query.in('location_neighborhood', filters.location.neighborhoods);
      }
    }

    // Filter by property features
    if (filters.property) {
      if (filters.property.bedrooms !== undefined) {
        query = query.gte('bedrooms', filters.property.bedrooms);
      }
      if (filters.property.bathrooms !== undefined) {
        query = query.gte('bathrooms', filters.property.bathrooms);
      }
      if (filters.property.typeOfSpace && filters.property.typeOfSpace.length > 0) {
        query = query.in('type_of_space', filters.property.typeOfSpace);
      }
    }

    // Filter by amenities (if provided)
    if (filters.amenities && filters.amenities.length > 0) {
      // This would need array overlap operation - simplified for now
      // query = query.overlaps('amenities_in_unit', filters.amenities);
    }

    // Apply sorting
    switch (filters.sort) {
      case SortOption.PriceLowToHigh:
        query = query.order('standardized_minimum_nightly_price', { ascending: true });
        break;
      case SortOption.MostViewed:
        query = query.order('view_count', { ascending: false, nullsFirst: false });
        break;
      case SortOption.RecentlyAdded:
        query = query.order('created_at', { ascending: false });
        break;
      case SortOption.OurRecommendations:
      default:
        // Custom ranking logic could be applied here
        query = query.order('created_at', { ascending: false });
        break;
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return { error: handleApiError(error) };
    }

    // Transform listings to card data with schedule match
    const listings: ListingCardData[] = (data || []).map((listing) => ({
      listing: transformListing(listing),
      scheduleMatch: calculateScheduleMatch(listing, filters.schedule || []),
      displayPrice: calculateDisplayPrice(listing, filters.schedule?.length || 0),
      pricePerNight: calculateDisplayPrice(listing, filters.schedule?.length || 0),
    }));

    return {
      data: {
        listings,
        total: count || 0,
        hasMore: (count || 0) > offset + limit,
      },
    };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Get listing by ID
 */
export async function getListingById(id: string): Promise<ApiResult<Listing>> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.from('listing').select('*').eq('id', id).single();

    if (error) {
      return { error: handleApiError(error) };
    }

    return { data: transformListing(data) };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Get listing photos
 */
export async function getListingPhotos(listingId: string): Promise<ApiResult<any[]>> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('listing_photo')
      .select('*')
      .eq('listing_id', listingId)
      .order('position', { ascending: true });

    if (error) {
      return { error: handleApiError(error) };
    }

    return { data: data || [] };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Transform raw listing data to typed Listing model
 */
function transformListing(raw: any): Listing {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    status: raw.status,
    approval_status: raw.approval_status,
    host_id: raw.host_id,
    location: {
      borough: raw.location_borough,
      neighborhood: raw.location_neighborhood,
      city: raw.location_city,
      state: raw.location_state,
      zip: raw.location_zip,
      address: raw.location_address,
      latitude: raw.location_latitude,
      longitude: raw.location_longitude,
    },
    pricing: {
      nightly_2_nights: raw.nightly_2_nights,
      nightly_3_nights: raw.nightly_3_nights,
      nightly_4_nights: raw.nightly_4_nights,
      nightly_5_nights: raw.nightly_5_nights,
      nightly_7_nights: raw.nightly_7_nights,
      weekly: raw.weekly,
      monthly: raw.monthly,
      damage_deposit: raw.damage_deposit,
      standardized_minimum_nightly_price: raw.standardized_minimum_nightly_price,
    },
    features: {
      bedrooms: raw.bedrooms,
      bathrooms: raw.bathrooms,
      type_of_space: raw.type_of_space,
      amenities_in_unit: raw.amenities_in_unit,
      amenities_in_building: raw.amenities_in_building,
      house_rules: raw.house_rules,
      description: raw.description,
    },
    days_available: raw.days_available,
    weeks_offered: raw.weeks_offered,
    min_nights: raw.min_nights,
    max_nights: raw.max_nights,
    primary_photo_url: raw.primary_photo_url,
    view_count: raw.view_count,
    created_at: raw.created_at,
    updated_at: raw.updated_at,
  };
}

/**
 * Calculate schedule match type
 */
function calculateScheduleMatch(listing: any, selectedDays: Day[]): ScheduleMatchType {
  if (!selectedDays || selectedDays.length === 0) {
    return ScheduleMatchType.None;
  }

  const listingDays = listing.days_available || [];

  if (selectedDays.every((day) => listingDays.includes(day))) {
    return ScheduleMatchType.Exact;
  }

  if (selectedDays.some((day) => listingDays.includes(day))) {
    return ScheduleMatchType.Partial;
  }

  return ScheduleMatchType.None;
}

/**
 * Calculate display price based on number of nights
 */
function calculateDisplayPrice(listing: any, numNights: number): number {
  if (numNights === 2 && listing.nightly_2_nights) {
    return listing.nightly_2_nights;
  }
  if (numNights === 3 && listing.nightly_3_nights) {
    return listing.nightly_3_nights;
  }
  if (numNights === 4 && listing.nightly_4_nights) {
    return listing.nightly_4_nights;
  }
  if (numNights === 5 && listing.nightly_5_nights) {
    return listing.nightly_5_nights;
  }
  if (numNights === 7 && listing.nightly_7_nights) {
    return listing.nightly_7_nights;
  }

  // Fallback to weekly rate divided by 7
  if (listing.weekly) {
    return Math.round(listing.weekly / 7);
  }

  // Fallback to standardized minimum
  return listing.standardized_minimum_nightly_price || 0;
}
