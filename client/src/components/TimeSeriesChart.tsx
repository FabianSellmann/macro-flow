'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { TimeSeriesData } from '@macro-flow/common';
import { useMemo } from 'react';

// Helper function to convert hex color to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export interface TimeSeriesChartProps extends Omit<BoxProps, 'children'> {
  data: TimeSeriesData<number>[];
  title?: string;
  seriesName?: string;
  height?: string | number;
  color?: string;
  showArea?: boolean;
  smooth?: boolean;
  isLoading?: boolean;
}

export function TimeSeriesChart({
  data,
  title,
  seriesName = 'Value',
  height = '400px',
  color = '#3182ce',
  showArea = true,
  smooth = true,
  isLoading = false,
  ...boxProps
}: TimeSeriesChartProps) {
  const chartOption = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        title: {
          text: title || 'No Data',
          left: 'center',
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: 'No data available',
            fontSize: 16,
            fill: '#999',
          },
        },
      };
    }

    const chartConfig: any = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
        formatter: (params: any) => {
          const param = Array.isArray(params) ? params[0] : params;
          return `
            <div style="padding: 8px;">
              <div style="font-weight: bold; margin-bottom: 4px;">${param.name}</div>
              <div>
                <span style="display: inline-block; width: 10px; height: 10px; background-color: ${param.color}; border-radius: 50%; margin-right: 4px;"></span>
                ${param.seriesName}: <strong>${param.value}</strong>
              </div>
            </div>
          `;
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '3%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map((item) => item.date),
        axisLabel: {
          rotate: 45,
          formatter: (value: string) => {
            // Format date for better readability
            const date = new Date(value);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            // Format large numbers
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1)}M`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1)}K`;
            }
            return value.toFixed(0);
          },
        },
      },
      series: [
        {
          name: seriesName,
          type: 'line',
          data: data.map((item) => item.value),
          smooth,
          itemStyle: {
            color,
          },
          lineStyle: {
            width: 2,
          },
          areaStyle: showArea
            ? {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: hexToRgba(color, 0.3) },
                    { offset: 1, color: hexToRgba(color, 0.1) },
                  ],
                },
              }
            : undefined,
          emphasis: {
            focus: 'series',
          },
        },
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 0,
          end: 100,
        },
        {
          type: 'slider',
          start: 0,
          end: 100,
          height: 20,
        },
      ],
    };

    // Only add title if provided
    if (title) {
      chartConfig.title = {
        text: title,
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      };
    }

    return chartConfig;
  }, [data, title, seriesName, color, showArea, smooth]);

  if (isLoading) {
    return (
      <Box
        {...boxProps}
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH={height}
      >
        Loading chart data...
      </Box>
    );
  }

  return (
    <Box {...boxProps} minH={height} h={typeof height === 'string' && height.endsWith('%') ? height : undefined}>
      <ReactECharts
        option={chartOption}
        style={{ height, width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </Box>
  );
}

