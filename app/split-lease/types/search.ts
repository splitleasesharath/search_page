/**
 * Search Page Type Definitions
 *
 * Types specific to the search page functionality, including
 * listing data, geographic data, and search-related types.
 */

import { z } from 'zod';

// ============================================================================
// Day and Night Types (from DAYS option set)
// ============================================================================

export const DayOfWeekSchema = z.enum([
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]);

export type DayOfWeek = z.infer<typeof DayOfWeekSchema>;

export const DaySchema = z.object({
  display: DayOfWeekSchema,
  bubbleNumber: z.number().int().min(1).max(7),
  bubbleNumberText: z.string(),
  first3Letters: z.string().length(3),
  singleLetter: z.string().length(1),
  nextDay: DayOfWeekSchema,
  previousNight: DayOfWeekSchema,
  associatedNight: DayOfWeekSchema,
});

export type Day = z.infer<typeof DaySchema>;

// ============================================================================
// Borough and Neighborhood Types
// ============================================================================

export const BoroughSchema = z.enum([
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Bergen County NJ',
  'Essex County NJ',
  'Hudson County NJ',
]);

export type Borough = z.infer<typeof BoroughSchema>;

export const NeighborhoodSchema = z.object({
  id: z.string(),
  name: z.string(),
  borough: BoroughSchema,
  displayName: z.string().optional(),
});

export type Neighborhood = z.infer<typeof NeighborhoodSchema>;

// ============================================================================
// Listing Types (Search-specific)
// ============================================================================

export const ListingPhotoSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  alt: z.string().optional(),
  order: z.number().int().default(0),
});

export type ListingPhoto = z.infer<typeof ListingPhotoSchema>;

export const PricingListSchema = z.object({
  id: z.string(),
  nightlyRate: z.number().positive(),
  weeklyRate: z.number().positive().optional(),
  monthlyRate: z.number().positive().optional(),
  currency: z.string().default('USD'),
});

export type PricingList = z.infer<typeof PricingListSchema>;

// Space Type Feature
export const SpaceTypeSchema = z.enum([
  'bedroom',
  'entire_apartment',
  'shared_room',
  'studio',
  'loft',
  'other',
]);

export type SpaceType = z.infer<typeof SpaceTypeSchema>;

// Amenity Feature (extended from base)
export const ListingAmenitySchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string().optional(),
  icon: z.string().optional(),
});

export type ListingAmenity = z.infer<typeof ListingAmenitySchema>;

// Parking Options Feature
export const ParkingOptionSchema = z.enum([
  'street_parking',
  'garage',
  'driveway',
  'none',
]);

export type ParkingOption = z.infer<typeof ParkingOptionSchema>;

// Storage Options Feature
export const StorageOptionSchema = z.enum([
  'closet',
  'storage_unit',
  'basement',
  'attic',
  'none',
]);

export type StorageOption = z.infer<typeof StorageOptionSchema>;

// House Rules Feature
export const HouseRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
});

export type HouseRule = z.infer<typeof HouseRuleSchema>;

// Cancellation Policy Feature
export const CancellationPolicySchema = z.enum([
  'flexible',
  'moderate',
  'strict',
  'super_strict',
]);

export type CancellationPolicy = z.infer<typeof CancellationPolicySchema>;

// Complete Search Listing Type
export const SearchListingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  borough: BoroughSchema,
  neighborhood: NeighborhoodSchema.optional(),
  spaceType: SpaceTypeSchema,
  photos: z.array(ListingPhotoSchema).default([]),
  pricing: PricingListSchema,
  amenities: z.array(ListingAmenitySchema).default([]),
  parkingOption: ParkingOptionSchema.optional(),
  storageOption: StorageOptionSchema.optional(),
  houseRules: z.array(HouseRuleSchema).default([]),
  cancellationPolicy: CancellationPolicySchema.optional(),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().positive().optional(),
  maxOccupants: z.number().int().positive().optional(),
  viewCount: z.number().int().default(0),
  featured: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export type SearchListing = z.infer<typeof SearchListingSchema>;

// ============================================================================
// Nights Available Type
// ============================================================================

export const NightsAvailableSchema = z.object({
  listingId: z.string(),
  availableNights: z.array(z.string().datetime()),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export type NightsAvailable = z.infer<typeof NightsAvailableSchema>;

// ============================================================================
// Saved Search Type
// ============================================================================

export const SavedSearchSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string().optional(),
  filters: z.record(z.any()), // Will be populated with filter values
  emailNotifications: z.boolean().default(false),
  smsNotifications: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export type SavedSearch = z.infer<typeof SavedSearchSchema>;

// ============================================================================
// Notification Settings Type
// ============================================================================

export const NotificationSettingsSchema = z.object({
  id: z.string(),
  userId: z.string(),
  emailEnabled: z.boolean().default(true),
  smsEnabled: z.boolean().default(false),
  frequency: z.enum(['immediate', 'daily', 'weekly']).default('daily'),
});

export type NotificationSettings = z.infer<typeof NotificationSettingsSchema>;

// ============================================================================
// Proposal Type
// ============================================================================

export const ProposalStatusSchema = z.enum([
  'pending',
  'accepted',
  'rejected',
  'withdrawn',
]);

export type ProposalStatus = z.infer<typeof ProposalStatusSchema>;

export const ProposalSchema = z.object({
  id: z.string(),
  listingId: z.string(),
  guestId: z.string(),
  proposedPrice: z.number().positive(),
  proposedDates: z.object({
    checkIn: z.string().datetime(),
    checkOut: z.string().datetime(),
  }),
  message: z.string().optional(),
  status: ProposalStatusSchema.default('pending'),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});

export type Proposal = z.infer<typeof ProposalSchema>;
