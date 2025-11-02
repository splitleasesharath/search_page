/**
 * Search Schedule Selector Island Mount Script
 */

import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { SearchScheduleSelector, SearchScheduleSelectorProps } from '../components/src/SearchScheduleSelector';

export function mountSearchScheduleSelector(
  elementId: string,
  runtimeProps?: Partial<SearchScheduleSelectorProps>
): Root | null {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error(`[SearchScheduleSelector Island] Element with id "${elementId}" not found`);
    return null;
  }

  try {
    const root = createRoot(element);
    root.render(<SearchScheduleSelector {...(runtimeProps as SearchScheduleSelectorProps)} />);

    return root;
  } catch (error) {
    console.error(`[SearchScheduleSelector Island] Failed to mount:`, error);
    return null;
  }
}

function autoMount() {
  const autoMountElements = document.querySelectorAll('[data-component="search-schedule-selector"]');

  autoMountElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    const manualMount = htmlElement.dataset.manualMount === 'true';

    if (manualMount) return;

    let elementId = htmlElement.id;
    if (!elementId) {
      elementId = `search-schedule-selector-island-${Math.random().toString(36).substr(2, 9)}`;
      htmlElement.id = elementId;
    }

    mountSearchScheduleSelector(elementId);
  });

  const commonMountPoints = ['schedule-selector-island', 'search-schedule-selector-island'];
  commonMountPoints.forEach((id) => {
    const element = document.getElementById(id);
    if (element && !element.hasChildNodes()) {
      mountSearchScheduleSelector(id);
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

export default mountSearchScheduleSelector;
