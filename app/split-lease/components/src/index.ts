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
export { default as Header } from './Header/Header';

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
// Search Page Components
// ============================================================================
export { SearchFilters } from './SearchFilters';
export type { SearchFiltersProps, FilterState, FilterChangeHandler } from './SearchFilters';

export { BoroughFilter } from './BoroughFilter';
export type { BoroughFilterProps } from './BoroughFilter';

export { PriceTierFilter } from './PriceTierFilter';
export type { PriceTierFilterProps } from './PriceTierFilter';

export { WeekPatternFilter } from './WeekPatternFilter';
export type { WeekPatternFilterProps } from './WeekPatternFilter';

export { SortFilter } from './SortFilter';
export type { SortFilterProps } from './SortFilter';

export { MapPlaceholder } from './MapPlaceholder';
export type { MapPlaceholderProps } from './MapPlaceholder';

export { ListingsGrid } from './ListingsGrid';
export type { ListingsGridProps } from './ListingsGrid';
export type { Listing as ListingGridItem } from './ListingsGrid';

// ============================================================================
// Template Components
// ============================================================================
// TODO: Export template components as they are created
// export { MainLayout } from './templates/MainLayout';
// export { DashboardLayout } from './templates/DashboardLayout';

// Component library version
export const version = '0.1.0';


