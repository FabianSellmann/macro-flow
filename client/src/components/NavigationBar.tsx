'use client';

import {
  Box,
  Flex,
  Heading,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export interface NavigationBarProps {
  onAddPanelClick: () => void;
  dateFrom?: string;
  dateTo?: string;
  onDateFromChange: (date: string | undefined) => void;
  onDateToChange: (date: string | undefined) => void;
}

/**
 * NavigationBar Component
 * 
 * Sticky top navigation bar for the dashboard.
 * Contains the dashboard title, date range pickers, and action buttons like "Add Panel".
 */
export function NavigationBar({
  onAddPanelClick,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: NavigationBarProps) {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const shadow = useColorModeValue('sm', 'dark-lg');

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      shadow={shadow}
      py={4}
    >
      <Flex
        maxW="container.xl"
        mx="auto"
        px={8}
        align="center"
        justify="space-between"
        gap={4}
        flexWrap="wrap"
      >
        <Heading size="lg" fontWeight="bold">
          Macro Flow Dashboard
        </Heading>
        
        <HStack spacing={4} flexWrap="wrap">
          <HStack spacing={2}>
            <FormControl width="auto">
              <FormLabel fontSize="sm" mb={0} whiteSpace="nowrap">
                From:
              </FormLabel>
              <Input
                type="date"
                size="sm"
                value={dateFrom || ''}
                onChange={(e) => onDateFromChange(e.target.value || undefined)}
                width="150px"
              />
            </FormControl>
            <FormControl width="auto">
              <FormLabel fontSize="sm" mb={0} whiteSpace="nowrap">
                To:
              </FormLabel>
              <Input
                type="date"
                size="sm"
                value={dateTo || ''}
                onChange={(e) => onDateToChange(e.target.value || undefined)}
                width="150px"
              />
            </FormControl>
          </HStack>
          
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={onAddPanelClick}
            size="md"
          >
            Add Panel
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

