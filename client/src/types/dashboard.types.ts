import { Layout } from 'react-grid-layout';
import { TimeSeriesData } from '@macro-flow/common';

/**
 * Dashboard Grid Item Types
 * 
 * This file contains all types related to the dashboard grid system,
 * including grid items, data sources, and serialization.
 */

// ============================================================================
// Base Grid Item Types
// ============================================================================

/**
 * Base layout configuration for a grid item
 */
export interface GridItemLayout {
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

/**
 * Base interface for all grid items
 */
export interface BaseGridItem {
  id: string;
  type: string;
  title: string;
  layout: GridItemLayout;
}

// ============================================================================
// FRED Chart Item Types
// ============================================================================

/**
 * FRED API observation options (client-side representation)
 * Note: observationStart and observationEnd are now managed at the dashboard level
 */
export interface FredObservationOptions {
  realtimeStart?: string; // YYYY-MM-DD
  realtimeEnd?: string; // YYYY-MM-DD
  limit?: number; // 1-100000
  offset?: number;
  sortOrder?: 'asc' | 'desc';
  units?: 'lin' | 'chg' | 'ch1' | 'pch' | 'pc1' | 'pca' | 'cch' | 'cca' | 'log';
  frequency?: string;
  aggregationMethod?: 'avg' | 'sum' | 'eop';
  outputType?: 1 | 2 | 3 | 4;
  vintageDates?: string;
}

/**
 * Chart styling configuration
 */
export interface ChartConfig {
  color?: string;
  showArea?: boolean;
  smooth?: boolean;
  seriesName?: string;
}

/**
 * FRED chart item configuration
 */
export interface FredChartConfig {
  seriesId: string;
  fredOptions: FredObservationOptions;
  chartConfig: ChartConfig;
}

/**
 * FRED chart grid item
 */
export interface FredChartItem extends BaseGridItem {
  type: 'fred-chart';
  dataSource: 'fred';
  config: FredChartConfig;
}

// ============================================================================
// Grid Item Union Type
// ============================================================================

/**
 * Union type of all possible grid items
 * Add new item types here as they are implemented
 */
export type GridItem = FredChartItem; // | OtherChartItem | TableItem | etc.

// ============================================================================
// Serialization Types
// ============================================================================

/**
 * Serializable representation of grid item (for persistence)
 * Excludes non-serializable fields like functions, React components, etc.
 */
export interface SerializableGridItem {
  id: string;
  type: string;
  title: string;
  layout: GridItemLayout;
  config: Record<string, any>; // Data source specific config
}

/**
 * Dashboard-level configuration (date range, etc.)
 */
export interface DashboardConfig {
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
}

/**
 * Complete dashboard configuration for serialization
 */
export interface SerializableDashboardConfig {
  version: string;
  items: SerializableGridItem[];
  config?: DashboardConfig;
}

// ============================================================================
// Data Source Types
// ============================================================================

/**
 * Data source definition metadata
 */
export interface DataSourceDefinition {
  id: string;
  name: string;
  description?: string;
  icon?: string; // Icon name or path
  supportedItemTypes: string[]; // e.g., ['fred-chart']
}

// ============================================================================
// Grid Layout Types
// ============================================================================

/**
 * Extended layout type that includes our custom properties
 */
export interface DashboardLayout extends Layout {
  // extend here if needed
}

// ============================================================================
// Chart Data Types
// ============================================================================

/**
 * Chart data with metadata
 */
export interface ChartData {
  data: TimeSeriesData<number>[];
  isLoading: boolean;
  error: Error | null;
}

// ============================================================================
// Modal/Dialog Types
// ============================================================================

/**
 * Add item modal state
 */
export interface AddItemModalState {
  isOpen: boolean;
  selectedDataSource?: string;
  step: 'select-source' | 'configure';
}

/**
 * Edit item modal state
 */
export interface EditItemModalState {
  isOpen: boolean;
  itemId?: string;
}

// ============================================================================
// Dashboard State Types
// ============================================================================

/**
 * Complete dashboard state
 */
export interface DashboardState {
  items: GridItem[];
  layout: DashboardLayout[];
  isLoaded: boolean;
  hasUnsavedChanges: boolean;
}

