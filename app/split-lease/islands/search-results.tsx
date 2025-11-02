/**
 * Search Results Island Mount Script
 */

import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SearchResults, SearchResultsProps } from '../components/src/SearchResults';

export function mountSearchResults(
  elementId: string,
  runtimeProps?: Partial<SearchResultsProps>
): Root | null {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`[SearchResults Island] Element with id "${elementId}" not found`);
    return null;
  }

  try {
    const root = createRoot(element);
    root.render(<SearchResults {...(runtimeProps as SearchResultsProps)} />);

    return root;
  } catch (error) {
    console.error(`[SearchResults Island] Failed to mount:`, error);
    return null;
  }
}

function autoMount() {
  const autoMountElements = document.querySelectorAll('[data-component="search-results"]');

  autoMountElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const manualMount = htmlElement.dataset.manualMount === 'true';

    if (manualMount) return;

    let elementId = htmlElement.id;
    if (!elementId) {
      elementId = `search-results-island-${Math.random().toString(36).substr(2, 9)}`;
      htmlElement.id = elementId;
    }

    mountSearchResults(elementId);
  });

  const commonMountPoints = ['search-results-island', 'results-island'];
  commonMountPoints.forEach((id) => {
    const element = document.getElementById(id);
    if (element && !element.hasChildNodes()) {
      mountSearchResults(id);
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

export default mountSearchResults;
