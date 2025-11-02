/**
 * Main entry point for Split Lease Components
 * Exports all components as UMD module
 */

import React from 'react';
import ReactDOM from 'react-dom';

// Component imports
import { SearchScheduleSelector } from './SearchScheduleSelector';
import { FiltersPanel } from './FiltersPanel';
import { ListingCard } from './ListingCard';
import { ListingsGrid } from './ListingsGrid';
import { MapView } from './MapView';

// Export components object
const SplitLeaseComponents = {
  React,
  ReactDOM,
  SearchScheduleSelector,
  FiltersPanel,
  ListingCard,
  ListingsGrid,
  MapView,
};

// Attach to window for UMD usage
if (typeof window !== 'undefined') {
  (window as any).SplitLeaseComponents = SplitLeaseComponents;
}

export default SplitLeaseComponents;
export {
  SearchScheduleSelector,
  FiltersPanel,
  ListingCard,
  ListingsGrid,
  MapView,
};
