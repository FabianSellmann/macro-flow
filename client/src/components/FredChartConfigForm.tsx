'use client';

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Switch,
  VStack,
  Heading,
  Text,
  HStack,
  FormHelperText,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import {
  FredObservationOptions,
  ChartConfig,
  FredChartConfig,
} from '@/types';
import { getFredSeriesConfig } from '@/constants/fred-series';
import { FredSeriesSelector } from './FredSeriesSelector';

export interface FredChartConfigFormData {
  seriesId: string;
  fredOptions: FredObservationOptions;
  chartConfig: ChartConfig;
}

export interface FredChartConfigFormProps {
  initialData?: Partial<FredChartConfigFormData>;
  onSubmit: (data: FredChartConfigFormData) => void;
  onCancel?: () => void;
  submitLabel?: string;
  isEditing?: boolean;
}

/**
 * FredChartConfigForm Component
 * 
 * Form for configuring a FRED chart panel.
 * Used in both the add panel flow (step 2) and the edit panel flow.
 */
export function FredChartConfigForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = 'Create Chart',
  isEditing = false,
}: FredChartConfigFormProps) {
  const [seriesId, setSeriesId] = useState(initialData?.seriesId || '');
  const [fredOptions, setFredOptions] = useState<FredObservationOptions>(
    initialData?.fredOptions || {}
  );
  const [chartConfig, setChartConfig] = useState<ChartConfig>(
    initialData?.chartConfig || {}
  );

  // Get series configuration when seriesId changes
  const seriesConfig = useMemo(() => {
    return seriesId ? getFredSeriesConfig(seriesId) : undefined;
  }, [seriesId]);

  // Update form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      if (initialData.seriesId) setSeriesId(initialData.seriesId);
      if (initialData.fredOptions) setFredOptions(initialData.fredOptions);
      if (initialData.chartConfig) setChartConfig(initialData.chartConfig);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!seriesId) {
      alert('Please select a FRED series');
      return;
    }

    onSubmit({
      seriesId,
      fredOptions,
      chartConfig,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={2}>
            {isEditing ? 'Edit FRED Chart' : 'Configure FRED Chart'}
          </Heading>
          <Text color="gray.600" fontSize="sm">
            {isEditing
              ? 'Update the chart configuration below'
              : 'Configure your FRED chart settings'}
          </Text>
        </Box>

        {/* Basic Settings */}
        <FredSeriesSelector
          value={seriesId}
          onChange={setSeriesId}
          label="FRED Series"
          helperText="Select the economic data series to display. The chart title will be automatically set based on your selection."
          isRequired
        />

        {/* Series Information */}
        {seriesConfig && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold" mb={1}>
                {seriesConfig.title}
              </Text>
              <Text fontSize="sm" color="gray.600">
                {seriesConfig.description}
              </Text>
            </Box>
          </Alert>
        )}

        {/* FRED Options */}
        <Box>
          <Heading size="sm" mb={4}>
            Data Options
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Limit</FormLabel>
              <NumberInput
                value={fredOptions.limit || ''}
                onChange={(_, value) =>
                  setFredOptions({
                    ...fredOptions,
                    limit: isNaN(value) ? undefined : value,
                  })
                }
                min={1}
                max={100000}
              >
                <NumberInputField placeholder="Default: 100000" />
              </NumberInput>
              <FormHelperText>Maximum number of observations (1-100000)</FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>Sort Order</FormLabel>
              <Select
                value={fredOptions.sortOrder || 'asc'}
                onChange={(e) =>
                  setFredOptions({
                    ...fredOptions,
                    sortOrder: e.target.value as 'asc' | 'desc',
                  })
                }
              >
                <option value="asc">Ascending (oldest first)</option>
                <option value="desc">Descending (newest first)</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Units</FormLabel>
              <Select
                value={fredOptions.units || 'lin'}
                onChange={(e) =>
                  setFredOptions({
                    ...fredOptions,
                    units: e.target.value as FredObservationOptions['units'],
                  })
                }
              >
                <option value="lin">Level (No transformation)</option>
                <option value="chg">Change</option>
                <option value="ch1">Change from Year Ago</option>
                <option value="pch">Percent Change</option>
                <option value="pc1">Percent Change from Year Ago</option>
                <option value="pca">Compounded Annual Rate of Change</option>
                <option value="cch">Continuously Compounded Rate of Change</option>
                <option value="cca">Continuously Compounded Annual Rate of Change</option>
                <option value="log">Natural Log</option>
              </Select>
            </FormControl>
          </VStack>
        </Box>

        {/* Chart Styling */}
        <Box>
          <Heading size="sm" mb={4}>
            Chart Styling
          </Heading>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Series Name</FormLabel>
              <Input
                value={chartConfig.seriesName || ''}
                onChange={(e) =>
                  setChartConfig({
                    ...chartConfig,
                    seriesName: e.target.value || undefined,
                  })
                }
                placeholder="Auto-generated from series ID"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Chart Color</FormLabel>
              <Input
                type="color"
                value={chartConfig.color || '#3182ce'}
                onChange={(e) =>
                  setChartConfig({
                    ...chartConfig,
                    color: e.target.value,
                  })
                }
                w="100px"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>Show Area Fill</FormLabel>
              <Switch
                isChecked={chartConfig.showArea !== false}
                onChange={(e) =>
                  setChartConfig({
                    ...chartConfig,
                    showArea: e.target.checked,
                  })
                }
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb={0}>Smooth Line</FormLabel>
              <Switch
                isChecked={chartConfig.smooth !== false}
                onChange={(e) =>
                  setChartConfig({
                    ...chartConfig,
                    smooth: e.target.checked,
                  })
                }
              />
            </FormControl>
          </VStack>
        </Box>

        {/* Actions */}
        <HStack spacing={4} justify="flex-end" pt={4}>
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" colorScheme="blue">
            {submitLabel}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

