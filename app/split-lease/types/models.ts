/**
 * Core domain models based on Supabase schema
 */

import { Day, WeeklyPattern } from './schedule';
import { Borough, TypeOfSpace } from './filters';

// User model
export interface User {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
  created_at?: string;
}

// Location information
export interface Location {
  borough?: Borough;
  neighborhood?: string;
  city?: string;
  state?: string;
  zip?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

// Pricing information (multiple nightly rates based on stay length)
export interface Pricing {
  nightly_2_nights?: number;
  nightly_3_nights?: number;
  nightly_4_nights?: number;
  nightly_5_nights?: number;
  nightly_7_nights?: number;
  weekly?: number;
  monthly?: number;
  damage_deposit?: number;
  standardized_minimum_nightly_price?: number; // Used for filtering
}

// Features and amenities
export interface Features {
  bedrooms?: number;
  bathrooms?: number;
  type_of_space?: TypeOfSpace;
  amenities_in_unit?: string[];
  amenities_in_building?: string[];
  house_rules?: string[];
  description?: string;
}

// Listing photo
export interface ListingPhoto {
  id: string;
  listing_id: string;
  url: string;
  position?: number;
  caption?: string;
  created_at?: string;
}

// Main listing model (simplified from 106 fields to essentials)
export interface Listing {
  id: string;

  // Basic info
  name?: string;
  slug?: string;
  description?: string;

  // Status
  status?: 'Active' | 'Inactive' | 'Pending';
  approval_status?: 'Approved' | 'Pending' | 'Rejected';

  // Host
  host_id?: string;
  host?: User;

  // Location
  location?: Location;

  // Pricing
  pricing?: Pricing;

  // Features
  features?: Features;

  // Schedule and availability
  days_available?: Day[];
  weeks_offered?: WeeklyPattern;
  min_nights?: number;
  max_nights?: number;

  // Photos
  photos?: ListingPhoto[];
  primary_photo_url?: string;

  // Metadata
  view_count?: number;
  created_at?: string;
  updated_at?: string;
}

// Proposal/booking model
export interface Proposal {
  id: string;
  listing_id: string;
  guest_id: string;
  check_in?: Date;
  check_out?: Date;
  nights?: number;
  total_price?: number;
  status?: 'Pending' | 'Accepted' | 'Rejected' | 'Cancelled';
  created_at?: string;
}

// Schedule match indicator for search results
export enum ScheduleMatchType {
  Exact = 'exact',
  Partial = 'partial',
  None = 'none',
}

// Listing card data (for display in search results)
export interface ListingCardData {
  listing: Listing;
  scheduleMatch?: ScheduleMatchType;
  displayPrice?: number; // Calculated based on selected schedule
  pricePerNight?: number;
}
