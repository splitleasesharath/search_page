/**
 * Search Filters Island Mount Script
 *
 * Provides automatic and manual mounting capabilities for the SearchFilters component.
 */

import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SearchFilters, SearchFiltersProps } from '../components/src/SearchFilters';

/**
 * Mounts the SearchFilters component as an island
 */
export function mountSearchFilters(
  elementId: string,
  runtimeProps?: Partial<SearchFiltersProps>
): Root | null {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`[SearchFilters Island] Element with id "${elementId}" not found`);
    return null;
  }

  try {
    const root = createRoot(element);
    root.render(<SearchFilters {...(runtimeProps as SearchFiltersProps)} />);

    return root;
  } catch (error) {
    console.error(`[SearchFilters Island] Failed to mount:`, error);
    return null;
  }
}

/**
 * Auto-mount all SearchFilters islands on page load
 */
function autoMount() {
  const autoMountElements = document.querySelectorAll('[data-component="search-filters"]');

  autoMountElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const manualMount = htmlElement.dataset.manualMount === 'true';

    if (manualMount) return;

    let elementId = htmlElement.id;
    if (!elementId) {
      elementId = `search-filters-island-${Math.random().toString(36).substr(2, 9)}`;
      htmlElement.id = elementId;
    }

    mountSearchFilters(elementId);
  });

  const commonMountPoints = ['search-filters-island', 'filters-island'];
  commonMountPoints.forEach((id) => {
    const element = document.getElementById(id);
    if (element && !element.hasChildNodes()) {
      mountSearchFilters(id);
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMount);
  } else {
    autoMount();
  }
}

export default mountSearchFilters;
