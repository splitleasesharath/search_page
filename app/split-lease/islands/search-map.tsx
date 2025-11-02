/**
 * Search Map Island Mount Script
 */

import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SearchMap, SearchMapProps } from '../components/src/SearchMap';

export function mountSearchMap(
  elementId: string,
  runtimeProps?: Partial<SearchMapProps>
): Root | null {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`[SearchMap Island] Element with id "${elementId}" not found`);
    return null;
  }

  try {
    const root = createRoot(element);
    root.render(<SearchMap {...(runtimeProps as SearchMapProps)} />);

    return root;
  } catch (error) {
    console.error(`[SearchMap Island] Failed to mount:`, error);
    return null;
  }
}

function autoMount() {
  const autoMountElements = document.querySelectorAll('[data-component="search-map"]');

  autoMountElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const manualMount = htmlElement.dataset.manualMount === 'true';

    if (manualMount) return;

    let elementId = htmlElement.id;
    if (!elementId) {
      elementId = `search-map-island-${Math.random().toString(36).substr(2, 9)}`;
      htmlElement.id = elementId;
    }

    mountSearchMap(elementId);
  });

  const commonMountPoints = ['search-map-island', 'map-island'];
  commonMountPoints.forEach((id) => {
    const element = document.getElementById(id);
    if (element && !element.hasChildNodes()) {
      mountSearchMap(id);
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

export default mountSearchMap;
