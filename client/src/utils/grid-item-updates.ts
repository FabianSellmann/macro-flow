import {
  GridItem,
  FredChartItem,
  FredObservationOptions,
  ChartConfig,
  GridItemLayout,
} from '@/types';

/**
 * Grid Item Update Utilities
 * 
 * Functions to update grid items with proper immutability.
 * All functions return updated grid items array.
 * 
 * These functions are designed to work with React state updates:
 * 
 * ```tsx
 * setGridItems(prev => updateGridItemTitle(prev, 'item-id', 'New Title'));
 * ```
 */

// ============================================================================
// Generic Update Functions
// ============================================================================

/**
 * Update any property of a grid item
 */
export function updateGridItem(
  items: GridItem[],
  itemId: string,
  updates: Partial<GridItem>
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId) {
      return { ...item, ...updates };
    }
    return item;
  });
}

/**
 * Update a grid item's title
 */
export function updateGridItemTitle(
  items: GridItem[],
  itemId: string,
  title: string
): GridItem[] {
  return updateGridItem(items, itemId, { title });
}

/**
 * Update a grid item's layout
 */
export function updateGridItemLayout(
  items: GridItem[],
  itemId: string,
  layout: Partial<GridItemLayout>
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId) {
      return {
        ...item,
        layout: {
          ...item.layout,
          ...layout,
        },
      };
    }
    return item;
  });
}

// ============================================================================
// Config Update Functions
// ============================================================================

/**
 * Update any config property of a grid item
 * This is a generic function that works for all item types
 */
export function updateGridItemConfig(
  items: GridItem[],
  itemId: string,
  configUpdates: Partial<GridItem['config']>
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId) {
      return {
        ...item,
        config: {
          ...item.config,
          ...configUpdates,
        },
      };
    }
    return item;
  });
}

// ============================================================================
// FRED Chart Specific Update Functions
// ============================================================================

/**
 * Update FRED observation options for a FRED chart item
 */
export function updateFredChartOptions(
  items: GridItem[],
  itemId: string,
  fredOptions: Partial<FredObservationOptions>
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId && item.type === 'fred-chart') {
      return {
        ...item,
        config: {
          ...item.config,
          fredOptions: {
            ...item.config.fredOptions,
            ...fredOptions,
          },
        },
      } as FredChartItem;
    }
    return item;
  });
}

/**
 * Update the series ID for a FRED chart item
 */
export function updateFredChartSeriesId(
  items: GridItem[],
  itemId: string,
  seriesId: string
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId && item.type === 'fred-chart') {
      return {
        ...item,
        config: {
          ...item.config,
          seriesId,
        },
      } as FredChartItem;
    }
    return item;
  });
}

/**
 * Update chart styling configuration for any chart item
 */
export function updateChartConfig(
  items: GridItem[],
  itemId: string,
  chartConfig: Partial<ChartConfig>
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId) {
      return {
        ...item,
        config: {
          ...item.config,
          chartConfig: {
            ...item.config.chartConfig,
            ...chartConfig,
          },
        },
      };
    }
    return item;
  });
}

// ============================================================================
// Batch Update Functions
// ============================================================================

/**
 * Update multiple properties of a grid item at once
 * Useful when updating multiple related properties in a single operation
 */
export function updateGridItemMultiple(
  items: GridItem[],
  itemId: string,
  updates: {
    title?: string;
    layout?: Partial<GridItemLayout>;
    config?: Partial<GridItem['config']>;
  }
): GridItem[] {
  return items.map(item => {
    if (item.id === itemId) {
      const updated: GridItem = { ...item };
      
      if (updates.title !== undefined) {
        updated.title = updates.title;
      }
      
      if (updates.layout) {
        updated.layout = {
          ...item.layout,
          ...updates.layout,
        };
      }
      
      if (updates.config) {
        updated.config = {
          ...item.config,
          ...updates.config,
        };
      }
      
      return updated;
    }
    return item;
  });
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Find a grid item by ID
 */
export function findGridItem(
  items: GridItem[],
  itemId: string
): GridItem | undefined {
  return items.find(item => item.id === itemId);
}

/**
 * Check if a grid item exists
 */
export function hasGridItem(
  items: GridItem[],
  itemId: string
): boolean {
  return items.some(item => item.id === itemId);
}

/**
 * Get all grid items of a specific type
 */
export function getGridItemsByType<T extends GridItem>(
  items: GridItem[],
  type: T['type']
): T[] {
  return items.filter(item => item.type === type) as T[];
}

/**
 * Get all FRED chart items
 */
export function getFredChartItems(
  items: GridItem[]
): FredChartItem[] {
  return getGridItemsByType<FredChartItem>(items, 'fred-chart');
}

