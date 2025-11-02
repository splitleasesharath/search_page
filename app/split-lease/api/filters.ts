/**
 * Filter option fetching functions
 */

import { getSupabaseClient, handleApiError } from './client';
import { Borough } from '../types/filters';
import { ApiResult, FilterOptionsResponse } from './types';

/**
 * Get all available boroughs
 */
export async function getBoroughs(): Promise<ApiResult<Borough[]>> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('listing')
      .select('location_borough')
      .eq('status', 'Active')
      .eq('approval_status', 'Approved')
      .not('location_borough', 'is', null);

    if (error) {
      return { error: handleApiError(error) };
    }

    // Extract unique boroughs
    const boroughs = Array.from(
      new Set((data || []).map((item) => item.location_borough).filter(Boolean))
    ) as Borough[];

    return { data: boroughs };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Get neighborhoods for a specific borough
 */
export async function getNeighborhoods(borough?: Borough): Promise<ApiResult<string[]>> {
  try {
    const supabase = getSupabaseClient();
    let query = supabase
      .from('listing')
      .select('location_neighborhood')
      .eq('status', 'Active')
      .eq('approval_status', 'Approved')
      .not('location_neighborhood', 'is', null);

    if (borough) {
      query = query.eq('location_borough', borough);
    }

    const { data, error } = await query;

    if (error) {
      return { error: handleApiError(error) };
    }

    // Extract unique neighborhoods
    const neighborhoods = Array.from(
      new Set((data || []).map((item) => item.location_neighborhood).filter(Boolean))
    ) as string[];

    return { data: neighborhoods };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Get all available amenities
 */
export async function getAmenities(): Promise<ApiResult<{ inUnit: string[]; inBuilding: string[] }>> {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from('listing')
      .select('amenities_in_unit, amenities_in_building')
      .eq('status', 'Active')
      .eq('approval_status', 'Approved');

    if (error) {
      return { error: handleApiError(error) };
    }

    // Aggregate all unique amenities
    const inUnitSet = new Set<string>();
    const inBuildingSet = new Set<string>();

    (data || []).forEach((listing) => {
      if (Array.isArray(listing.amenities_in_unit)) {
        listing.amenities_in_unit.forEach((amenity: string) => inUnitSet.add(amenity));
      }
      if (Array.isArray(listing.amenities_in_building)) {
        listing.amenities_in_building.forEach((amenity: string) => inBuildingSet.add(amenity));
      }
    });

    return {
      data: {
        inUnit: Array.from(inUnitSet).sort(),
        inBuilding: Array.from(inBuildingSet).sort(),
      },
    };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}

/**
 * Get all filter options in one call
 */
export async function getAllFilterOptions(): Promise<ApiResult<FilterOptionsResponse>> {
  try {
    const [boroughsResult, neighborhoodsResult, amenitiesResult] = await Promise.all([
      getBoroughs(),
      getNeighborhoods(),
      getAmenities(),
    ]);

    if (boroughsResult.error || neighborhoodsResult.error || amenitiesResult.error) {
      return {
        error: {
          message: 'Failed to load filter options',
        },
      };
    }

    // Group neighborhoods by borough
    const neighborhoodsByBorough: { [borough: string]: string[] } = {};
    for (const borough of boroughsResult.data || []) {
      const result = await getNeighborhoods(borough);
      if (result.data) {
        neighborhoodsByBorough[borough] = result.data;
      }
    }

    return {
      data: {
        boroughs: boroughsResult.data || [],
        neighborhoods: neighborhoodsByBorough,
        amenitiesInUnit: amenitiesResult.data?.inUnit || [],
        amenitiesInBuilding: amenitiesResult.data?.inBuilding || [],
      },
    };
  } catch (error) {
    return { error: handleApiError(error) };
  }
}
