/**
 * SplitLease Component Library
 *
 * Barrel export for all components following Atomic Design principles.
 *
 * Usage:
 *   import { Button, SearchBar, Header } from '@components'
 */

// ============================================================================
// Existing Components
// ============================================================================
export { SearchScheduleSelector } from './SearchScheduleSelector';
export type { SearchScheduleSelectorProps, Day, ScheduleValidation } from './SearchScheduleSelector';

export { Footer } from './Footer';
export { default as Header } from './Header/Header';

// TODO: Export these components as they are created
// export { ListingImageGrid } from './ListingImageGrid';
// export type { ListingImage, ListingImageGridProps } from './ListingImageGrid';

// export { ProposalMenu } from './ProposalMenu';
// export type {
//   WeekDay,
//   PricingInfo,
//   ReservationSpanOption,
//   HostPreferences,
//   ProposalMenuProps,
//   ProposalData,
// } from './ProposalMenu';

// ============================================================================
// Atomic Components
// ============================================================================
// TODO: Export atomic components as they are created
// export { Button } from './atomic/Button';
// export { Input } from './atomic/Input';
// export { Icon } from './atomic/Icon';
// export { Text } from './atomic/Text';

// ============================================================================
// Molecular Components
// ============================================================================
export { ListingCard } from './molecules/ListingCard';
export type { ListingCardProps, Listing } from './molecules/ListingCard';

export { BoroughSelector } from './molecules/BoroughSelector';
export type { BoroughSelectorProps, Borough } from './molecules/BoroughSelector';
export { BOROUGH_OPTIONS } from './molecules/BoroughSelector';

export { WeekPatternSelector } from './molecules/WeekPatternSelector';
export type { WeekPatternSelectorProps, WeekPattern } from './molecules/WeekPatternSelector';
export { WEEK_PATTERN_OPTIONS } from './molecules/WeekPatternSelector';

export { PriceTierSelector } from './molecules/PriceTierSelector';
export type { PriceTierSelectorProps, PriceTier } from './molecules/PriceTierSelector';
export { PRICE_TIER_OPTIONS } from './molecules/PriceTierSelector';

export { SortBySelector } from './molecules/SortBySelector';
export type { SortBySelectorProps, SortOption } from './molecules/SortBySelector';
export { SORT_OPTIONS } from './molecules/SortBySelector';

export { NeighborhoodSearch } from './molecules/NeighborhoodSearch';
export type { NeighborhoodSearchProps, Neighborhood } from './molecules/NeighborhoodSearch';

// ============================================================================
// Organism Components
// ============================================================================
export { HeroSection } from './organisms/HeroSection';
export type { HeroSectionProps } from './organisms/HeroSection';

export { BenefitsSection } from './organisms/BenefitsSection';
export type { BenefitsSectionProps, Benefit } from './organisms/BenefitsSection';

export { ScheduleTypeCards } from './organisms/ScheduleTypeCards';
export type { ScheduleTypeCardsProps, ScheduleType } from './organisms/ScheduleTypeCards';

export { PopularListings } from './organisms/PopularListings';
export type { PopularListingsProps } from './organisms/PopularListings';

export { SupportSection } from './organisms/SupportSection';
export type { SupportSectionProps, SupportOption } from './organisms/SupportSection';

export { SearchFilters } from './organisms/SearchFilters';
export type { SearchFiltersProps, SearchFiltersState } from './organisms/SearchFilters';

export { SearchResults } from './organisms/SearchResults';
export type { SearchResultsProps } from './organisms/SearchResults';

export { SearchMap } from './organisms/SearchMap';
export type { SearchMapProps } from './organisms/SearchMap';

// ============================================================================
// Template Components
// ============================================================================
// TODO: Export template components as they are created
// export { MainLayout } from './templates/MainLayout';
// export { DashboardLayout } from './templates/DashboardLayout';

// Component library version
export const version = '0.1.0';


