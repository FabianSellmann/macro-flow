'use client';

import { SidePanel } from './SidePanel';
import { FredChartConfigForm, FredChartConfigFormData } from './FredChartConfigForm';
import { FredChartItem } from '@/types';
import {
  updateFredChartOptions,
  updateFredChartSeriesId,
  updateChartConfig,
  updateGridItemTitle,
} from '@/utils/grid-item-updates';
import { GridItem } from '@/types';
import { getFredSeriesTitle } from '@/constants/fred-series';

export interface EditFredChartProps {
  isOpen: boolean;
  onClose: () => void;
  item: FredChartItem | null;
  onUpdate: (items: GridItem[]) => void;
  currentItems: GridItem[];
}

/**
 * EditFredChart Component
 * 
 * Panel for editing an existing FRED chart configuration.
 * Pre-fills the form with the current chart settings.
 */
export function EditFredChart({
  isOpen,
  onClose,
  item,
  onUpdate,
  currentItems,
}: EditFredChartProps) {
  if (!item) {
    return null;
  }

  const handleSubmit = (data: FredChartConfigFormData) => {
    let updatedItems = currentItems;

    // Update series ID if changed (this will also require updating the title)
    if (data.seriesId !== item.config.seriesId) {
      updatedItems = updateFredChartSeriesId(updatedItems, item.id, data.seriesId);
      // Update title based on new series config
      const newTitle = getFredSeriesTitle(data.seriesId);
      updatedItems = updateGridItemTitle(updatedItems, item.id, newTitle);
    }

    // Update FRED options
    updatedItems = updateFredChartOptions(updatedItems, item.id, data.fredOptions);

    // Update chart config
    updatedItems = updateChartConfig(updatedItems, item.id, data.chartConfig);

    onUpdate(updatedItems);
    onClose();
  };

  const initialData: FredChartConfigFormData = {
    seriesId: item.config.seriesId,
    fredOptions: item.config.fredOptions,
    chartConfig: item.config.chartConfig,
  };

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Edit FRED Chart"
      size="md"
      placement="right"
    >
      <FredChartConfigForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={onClose}
        submitLabel="Save Changes"
        isEditing={true}
      />
    </SidePanel>
  );
}

