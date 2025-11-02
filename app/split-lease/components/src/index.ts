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
export type {
  Day,
  Listing as ScheduleListing,
  SearchScheduleSelectorProps,
  ValidationResult,
  ListingCount,
} from './SearchScheduleSelector';

export { Footer } from './Footer';
export { Header } from './Header';

// TODO: Implement ListingImageGrid component
// export { ListingImageGrid } from './ListingImageGrid';
// export type { ListingImage, ListingImageGridProps } from './ListingImageGrid';

// TODO: Implement ProposalMenu component
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

// ============================================================================
// Search Filter Components
// ============================================================================
export { FilterSidebar } from './filters/FilterSidebar';
export type { FilterSidebarProps } from './filters/FilterSidebar';

export { BoroughFilter } from './filters/BoroughFilter';
export type { BoroughFilterProps } from './filters/BoroughFilter';

export { WeekPatternFilter } from './filters/WeekPatternFilter';
export type { WeekPatternFilterProps } from './filters/WeekPatternFilter';

export { PriceTierFilter } from './filters/PriceTierFilter';
export type { PriceTierFilterProps } from './filters/PriceTierFilter';

export { SortByFilter } from './filters/SortByFilter';
export type { SortByFilterProps } from './filters/SortByFilter';

export { NeighborhoodFilter } from './filters/NeighborhoodFilter';
export type { NeighborhoodFilterProps } from './filters/NeighborhoodFilter';

// ============================================================================
// Template Components
// ============================================================================
// TODO: Export template components as they are created
// export { MainLayout } from './templates/MainLayout';
// export { DashboardLayout } from './templates/DashboardLayout';

// Component library version
export const version = '0.1.0';


