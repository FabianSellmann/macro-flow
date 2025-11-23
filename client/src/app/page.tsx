'use client';

import { Container, Box, Alert, AlertIcon, IconButton, HStack, Flex } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import { TimeSeriesData } from '@macro-flow/common';
import { TimeSeriesChart, NavigationBar, AddPanel, EditFredChart } from '@/components';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { GridItem, FredChartItem, DashboardConfig } from '@/types';
import { loadDashboardConfig, saveDashboardConfig } from '@/utils/serialization';
import { fetchFredData } from '@/services/api';

export default function Home() {
  const [gridWidth, setGridWidth] = useState(1200);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [editingItem, setEditingItem] = useState<FredChartItem | null>(null);
  const [dashboardConfig, setDashboardConfig] = useState<DashboardConfig>({});

  // Load saved dashboard configuration on mount
  useEffect(() => {
    const saved = loadDashboardConfig();
    if (saved) {
      if (saved.items && saved.items.length > 0) {
        setGridItems(saved.items);
      }
      if (saved.config) {
        setDashboardConfig(saved.config);
      }
    }
  }, []);

  // Save dashboard configuration when items or config change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        saveDashboardConfig(gridItems, dashboardConfig);
      } catch (error) {
        console.error('Failed to save dashboard configuration:', error);
      }
    }, 500); // Debounce by 500ms

    return () => clearTimeout(timeoutId);
  }, [gridItems, dashboardConfig]);

  const handleAddPanel = () => {
    setIsAddPanelOpen(true);
  };

  const handleAddItem = (item: GridItem) => {
    setGridItems((prev) => [...prev, item]);
  };

  const handleEditItem = (item: GridItem) => {
    if (item.type === 'fred-chart') {
      setEditingItem(item);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setGridItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleUpdateItems = (updatedItems: GridItem[]) => {
    setGridItems(updatedItems);
  };

  const handleDateFromChange = (date: string | undefined) => {
    setDashboardConfig((prev) => ({ ...prev, dateFrom: date }));
  };

  const handleDateToChange = (date: string | undefined) => {
    setDashboardConfig((prev) => ({ ...prev, dateTo: date }));
  };

  // Handle layout changes from react-grid-layout
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setGridItems((prev) =>
      prev.map((item) => {
        const layoutItem = newLayout.find((l) => l.i === item.id);
        if (layoutItem) {
          return {
            ...item,
            layout: {
              ...item.layout,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h,
            },
          };
        }
        return item;
      })
    );
  }, []);

  // Update grid width on window resize
  useEffect(() => {
    const updateWidth = () => {
      const container = document.querySelector('[data-container]');
      if (container) {
        setGridWidth(container.clientWidth - 64); // Account for padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Generate layout from gridItems
  const layout = useMemo(() => {
    return gridItems.map((item) => ({
      i: item.id,
      x: item.layout.x,
      y: item.layout.y,
      w: item.layout.w,
      h: item.layout.h,
      minW: item.layout.minW ?? 4,  // Default to 4 if undefined
      minH: item.layout.minH ?? 3,   // Default to 3 if undefined
    }));
  }, [gridItems]);

  return (
    <Box minH="100vh" bg="gray.50">
      <NavigationBar
        onAddPanelClick={handleAddPanel}
        dateFrom={dashboardConfig.dateFrom}
        dateTo={dashboardConfig.dateTo}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
      />
      
      <Container maxW="container.xl" py={8} data-container>
        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={80}
          width={gridWidth}
          isDraggable={true}
          isResizable={true}
          draggableHandle=".drag-handle"
          margin={[16, 16]}
          onLayoutChange={handleLayoutChange}
        >
          {gridItems
            .filter((item) => item.type === 'fred-chart')
            .map((item) => (
              <Box
                key={item.id}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                height="100%"
                display="flex"
                flexDirection="column"
                overflow="hidden"
              >
                <Flex
                  cursor="move"
                  mb={2}
                  align="center"
                  justify="space-between"
                  flexShrink={0}
                >
                  <Box
                    className="drag-handle"
                    fontWeight="semibold"
                    color="gray.600"
                    flex="1"
                  >
                    {item.title}
                  </Box>
                  <HStack 
                    spacing={2} 
                    onMouseDown={(e) => e.stopPropagation()}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <IconButton
                      aria-label="Edit chart"
                      icon={<EditIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditItem(item);
                      }}
                    />
                    <IconButton
                      aria-label="Remove chart"
                      icon={<DeleteIcon />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveItem(item.id);
                      }}
                    />
                  </HStack>
                </Flex>
                <Box flex="1" minH={0} w="100%">
                  <FredChartContent
                    item={item}
                    dateFrom={dashboardConfig.dateFrom}
                    dateTo={dashboardConfig.dateTo}
                  />
                </Box>
              </Box>
            ))}
        </GridLayout>
      </Container>

      <AddPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        onAdd={handleAddItem}
      />

      {editingItem && (
        <EditFredChart
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          item={editingItem}
          onUpdate={handleUpdateItems}
          currentItems={gridItems}
        />
      )}
    </Box>
  );
}

/**
 * Component to render FRED chart content (used inside the grid item Box)
 */
function FredChartContent({
  item,
  dateFrom,
  dateTo,
}: {
  item: FredChartItem;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: [
      'fred-chart',
      item.id,
      item.config.seriesId,
      item.config.fredOptions,
      dateFrom,
      dateTo,
    ],
    queryFn: () =>
      fetchFredData(item.config.seriesId, item.config.fredOptions, dateFrom, dateTo),
  });

  return (
    <>
      {error && (
        <Alert status="error" size="sm" mb={2}>
          <AlertIcon />
          {error instanceof Error ? error.message : 'Failed to load data'}
        </Alert>
      )}
      <TimeSeriesChart
        data={data || []}
        seriesName={item.config.chartConfig.seriesName || item.title}
        isLoading={isLoading}
        height="100%"
        color={item.config.chartConfig.color || '#3182ce'}
        showArea={item.config.chartConfig.showArea !== false}
        smooth={item.config.chartConfig.smooth !== false}
      />
    </>
  );
}

