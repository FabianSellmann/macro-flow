'use client';

import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';

export type PanelType = 'fred-chart';

export interface PanelTypeOption {
  type: PanelType;
  name: string;
  description: string;
  icon?: string;
}

const PANEL_TYPES: PanelTypeOption[] = [
  {
    type: 'fred-chart',
    name: 'FRED Chart',
    description: 'Create a time series chart using data from the Federal Reserve Economic Data (FRED) API',
  },
];

export interface PanelTypeSelectorProps {
  onSelect: (type: PanelType) => void;
  selectedType?: PanelType;
}

/**
 * PanelTypeSelector Component
 * 
 * Step 1 of the add panel flow - allows users to select which type of panel they want to create.
 */
export function PanelTypeSelector({
  onSelect,
  selectedType,
}: PanelTypeSelectorProps) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const selectedBorderColor = useColorModeValue('blue.500', 'blue.400');

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Heading size="md" mb={2}>
          Select Panel Type
        </Heading>
        <Text color="gray.600" fontSize="sm">
          Choose the type of panel you want to add to your dashboard
        </Text>
      </Box>

      <SimpleGrid columns={1} spacing={4}>
        {PANEL_TYPES.map((panelType) => {
          const isSelected = selectedType === panelType.type;
          
          return (
            <Box
              key={panelType.type}
              as="button"
              onClick={() => onSelect(panelType.type)}
              p={4}
              borderRadius="lg"
              border="2px solid"
              borderColor={isSelected ? selectedBorderColor : borderColor}
              bg={isSelected ? cardHoverBg : cardBg}
              _hover={{
                bg: cardHoverBg,
                borderColor: isSelected ? selectedBorderColor : 'gray.400',
              }}
              transition="all 0.2s"
              textAlign="left"
              cursor="pointer"
            >
              <VStack align="start" spacing={2}>
                <Heading size="sm">{panelType.name}</Heading>
                <Text fontSize="sm" color="gray.600">
                  {panelType.description}
                </Text>
              </VStack>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
}

