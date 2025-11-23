import {
  GridItem,
  FredChartItem,
  SerializableGridItem,
  SerializableDashboardConfig,
  GridItemLayout,
  DashboardConfig,
} from '@/types';

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'macro-flow-dashboard';
const CURRENT_VERSION = '1.0.0';

// ============================================================================
// Serialization Functions
// ============================================================================

/**
 * Convert a GridItem to its serializable representation
 */
export function serializeGridItem(item: GridItem): SerializableGridItem {
  return {
    id: item.id,
    type: item.type,
    title: item.title,
    layout: item.layout,
    config: item.config, // Already JSON-serializable
  };
}

/**
 * Convert a serialized grid item back to a GridItem
 * Uses type discrimination to reconstruct the correct type
 */
export function deserializeGridItem(
  serialized: SerializableGridItem
): GridItem {
  switch (serialized.type) {
    case 'fred-chart':
      return {
        id: serialized.id,
        type: 'fred-chart',
        dataSource: 'fred',
        title: serialized.title,
        layout: serialized.layout,
        config: serialized.config as FredChartItem['config'],
      } as FredChartItem;

    // Future: Add other item types here
    // case 'other-chart':
    //   return deserializeOtherChart(serialized);

    default:
      throw new Error(
        `Unknown grid item type: ${serialized.type}. Cannot deserialize.`
      );
  }
}

/**
 * Serialize entire dashboard configuration
 */
export function serializeDashboardConfig(
  items: GridItem[],
  config?: DashboardConfig
): SerializableDashboardConfig {
  return {
    version: CURRENT_VERSION,
    items: items.map(serializeGridItem),
    config,
  };
}

/**
 * Deserialize dashboard configuration
 */
export function deserializeDashboardConfig(
  serialized: SerializableDashboardConfig
): { items: GridItem[]; config?: DashboardConfig } {
  // Handle version migration if needed
  if (serialized.version !== CURRENT_VERSION) {
    const migrated = migrateDashboardConfig(serialized);
    return {
      items: migrated.items.map(deserializeGridItem),
      config: migrated.config,
    };
  }

  return {
    items: serialized.items.map(deserializeGridItem),
    config: serialized.config,
  };
}

// ============================================================================
// Persistence Functions
// ============================================================================

/**
 * Save dashboard configuration to localStorage
 */
export function saveDashboardConfig(
  items: GridItem[],
  config?: DashboardConfig
): void {
  try {
    const serialized = serializeDashboardConfig(items, config);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized));
  } catch (error) {
    console.error('Failed to save dashboard configuration:', error);
    throw new Error('Failed to save dashboard configuration');
  }
}

/**
 * Load dashboard configuration from localStorage
 * Returns null if no saved configuration exists or if loading fails
 */
export function loadDashboardConfig(): {
  items: GridItem[];
  config?: DashboardConfig;
} | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }

    const parsed = JSON.parse(stored) as SerializableDashboardConfig;
    return deserializeDashboardConfig(parsed);
  } catch (error) {
    console.error('Failed to load dashboard configuration:', error);
    // Optionally: clear corrupted data
    // localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

/**
 * Clear saved dashboard configuration
 */
export function clearDashboardConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if a saved dashboard configuration exists
 */
export function hasSavedDashboardConfig(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

// ============================================================================
// Version Migration
// ============================================================================

/**
 * Migrate dashboard configuration from older versions to current version
 */
function migrateDashboardConfig(
  config: SerializableDashboardConfig
): SerializableDashboardConfig {
  // Example migration logic
  if (config.version === '1.0.0') {
    // Already current version, no migration needed
    return config;
  }

  // Future: Add migration logic for version upgrades
  // if (config.version === '0.9.0') {
  //   return migrateFromV0_9_0ToV1_0_0(config);
  // }

  // If version is newer than current, log warning
  if (compareVersions(config.version, CURRENT_VERSION) > 0) {
    console.warn(
      `Dashboard config version (${config.version}) is newer than current version (${CURRENT_VERSION}). Some features may not work.`
    );
  }

  return config;
}

/**
 * Compare two version strings
 * Returns: -1 if v1 < v2, 0 if v1 === v2, 1 if v1 > v2
 */
function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }

  return 0;
}

// ============================================================================
// Validation Functions
// ============================================================================

/**
 * Validate that a serialized grid item has the required structure
 */
export function isValidSerializedGridItem(
  item: any
): item is SerializableGridItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.type === 'string' &&
    typeof item.title === 'string' &&
    isValidGridItemLayout(item.layout) &&
    typeof item.config === 'object'
  );
}

/**
 * Validate grid item layout structure
 */
function isValidGridItemLayout(layout: any): layout is GridItemLayout {
  return (
    typeof layout === 'object' &&
    layout !== null &&
    typeof layout.x === 'number' &&
    typeof layout.y === 'number' &&
    typeof layout.w === 'number' &&
    typeof layout.h === 'number'
  );
}

/**
 * Validate entire dashboard configuration structure
 */
export function isValidDashboardConfig(
  config: any
): config is SerializableDashboardConfig {
  return (
    typeof config === 'object' &&
    config !== null &&
    typeof config.version === 'string' &&
    Array.isArray(config.items) &&
    config.items.every(isValidSerializedGridItem)
  );
}

