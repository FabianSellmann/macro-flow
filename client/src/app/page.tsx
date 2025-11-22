'use client';

import { Container, Heading, VStack, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { TimeSeriesData } from '@macro-flow/common';
import { TimeSeriesChart } from '@/components';

const M2_SERIES_ID = 'M2SL'; // M2 Money Stock

async function fetchM2MoneySupply(): Promise<TimeSeriesData<number>[]> {
  const response = await fetch(
    `http://localhost:3001/api/fred/series/${M2_SERIES_ID}?limit=500&sort_order=asc`
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to fetch M2 data: ${response.statusText}`);
  }
  return response.json();
}

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['m2-money-supply', M2_SERIES_ID],
    queryFn: fetchM2MoneySupply,
  });

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Macro Flow Dashboard</Heading>
        
        {error && (
          <Alert status="error">
            <AlertIcon />
            Error loading data: {error instanceof Error ? error.message : 'Unknown error'}
          </Alert>
        )}

        <Box
          bg="white"
          p={6}
          borderRadius="lg"
          boxShadow="md"
        >
          <TimeSeriesChart
            data={data || []}
            title="M2 Money Stock (Billions of Dollars)"
            seriesName="M2 Money Stock"
            isLoading={isLoading}
            height="500px"
            color="#3182ce"
          />
        </Box>
      </VStack>
    </Container>
  );
}

