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
export { Footer } from './Footer';
export { Header } from './Header';

// ============================================================================
// Search Schedule Selector
// ============================================================================
export { SearchScheduleSelector } from './SearchScheduleSelector';
export type {
  Day,
  Listing,
  SearchScheduleSelectorProps,
  ValidationResult,
  ListingCount,
} from './SearchScheduleSelector';

// export { ListingImageGrid } from './ListingImageGrid'; // TODO: Create this component
// export type { ListingImage, ListingImageGridProps } from './ListingImageGrid';

// export { ProposalMenu } from './ProposalMenu'; // TODO: Create this component
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
export { Dropdown } from './atoms/Dropdown';
export type { DropdownOption, DropdownProps } from './atoms/Dropdown';

export { TextInput } from './atoms/TextInput';
export type { TextInputProps } from './atoms/TextInput';

// ============================================================================
// Molecular Components
// ============================================================================
export { ListingCard } from './molecules/ListingCard';
export type { ListingCardProps, Listing } from './molecules/ListingCard';

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
export type { SearchFiltersProps, SearchFilterValues } from './organisms/SearchFilters';
export {
  BOROUGH_OPTIONS,
  WEEKLY_PATTERN_OPTIONS,
  PRICE_TIER_OPTIONS,
  SORT_BY_OPTIONS,
} from './organisms/SearchFilters';

// ============================================================================
// Template Components
// ============================================================================
// TODO: Export template components as they are created
// export { MainLayout } from './templates/MainLayout';
// export { DashboardLayout } from './templates/DashboardLayout';

// Component library version
export const version = '0.1.0';


