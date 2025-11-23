'use client';

import { SidePanel } from './SidePanel';
import { PanelTypeSelector, PanelType } from './PanelTypeSelector';
import { FredChartConfigForm, FredChartConfigFormData } from './FredChartConfigForm';
import { GridItem, FredChartItem, GridItemLayout } from '@/types';
import { useState } from 'react';
import { Box, Button, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getFredSeriesTitle } from '@/constants/fred-series';

export interface AddPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: GridItem) => void;
}

type AddPanelStep = 'select-type' | 'configure';

/**
 * AddPanel Component
 * 
 * Two-step panel for adding new dashboard items:
 * 1. Select panel type (e.g., FRED Chart)
 * 2. Configure the selected panel type
 */
export function AddPanel({ isOpen, onClose, onAdd }: AddPanelProps) {
  const [step, setStep] = useState<AddPanelStep>('select-type');
  const [selectedType, setSelectedType] = useState<PanelType | undefined>();

  const handleTypeSelect = (type: PanelType) => {
    setSelectedType(type);
    setStep('configure');
  };

  const handleBack = () => {
    setStep('select-type');
    setSelectedType(undefined);
  };

  const handleClose = () => {
    setStep('select-type');
    setSelectedType(undefined);
    onClose();
  };

  const handleFredChartSubmit = (data: FredChartConfigFormData) => {
    // Generate a unique ID for the new item
    const id = `fred-chart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Default layout - will be positioned automatically or user can drag
    const defaultLayout: GridItemLayout = {
      x: 0,
      y: 0,
      w: 6,
      h: 4,
      minW: 4,
      minH: 3,
    };

    // Get title from series config
    const title = getFredSeriesTitle(data.seriesId);

    const newItem: FredChartItem = {
      id,
      type: 'fred-chart',
      dataSource: 'fred',
      title,
      layout: defaultLayout,
      config: {
        seriesId: data.seriesId,
        fredOptions: data.fredOptions,
        chartConfig: data.chartConfig,
      },
    };

    onAdd(newItem);
    handleClose();
  };

  const getPanelTitle = () => {
    if (step === 'configure' && selectedType === 'fred-chart') {
      return 'Configure FRED Chart';
    }
    return 'Add New Panel';
  };

  const getHeaderContent = () => {
    if (step === 'configure') {
      return (
        <Box display="flex" alignItems="center" gap={4}>
          <IconButton
            icon={<ArrowBackIcon />}
            aria-label="Back"
            variant="ghost"
            size="sm"
            onClick={handleBack}
          />
          <Box flex="1">
            {getPanelTitle()}
          </Box>
        </Box>
      );
    }
    return getPanelTitle();
  };

  return (
    <SidePanel
      isOpen={isOpen}
      onClose={handleClose}
      title={getPanelTitle()}
      headerContent={step === 'configure' ? getHeaderContent() : undefined}
      size="md"
      placement="right"
    >
      {step === 'select-type' && (
        <PanelTypeSelector
          onSelect={handleTypeSelect}
          selectedType={selectedType}
        />
      )}

      {step === 'configure' && selectedType === 'fred-chart' && (
        <FredChartConfigForm
          onSubmit={handleFredChartSubmit}
          onCancel={handleBack}
          submitLabel="Create Chart"
        />
      )}
    </SidePanel>
  );
}

