'use client';

import {
  Box,
  Input,
  VStack,
  HStack,
  Text,
  Badge,
  InputGroup,
  InputLeftElement,
  Icon,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState, useMemo } from 'react';
import {
  FRED_SERIES_CONFIG,
  getAllFredSeriesTags,
  getFredSeriesConfig,
  FredSeriesConfig,
} from '@/constants/fred-series';

export interface FredSeriesSelectorProps {
  value: string;
  onChange: (seriesId: string) => void;
  label?: string;
  helperText?: string;
  isRequired?: boolean;
}

// Prominent tags to show as filter buttons
const PROMINENT_TAGS = {
  country: ['usa', 'japan'],
  data: ['inflation', 'bond-yield'],
};

export function FredSeriesSelector({
  value,
  onChange,
  label = 'FRED Series',
  helperText,
  isRequired = false,
}: FredSeriesSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  // Get all available tags
  const allTags = useMemo(() => getAllFredSeriesTags(), []);

  // Filter series based on search and tags
  const filteredSeries = useMemo(() => {
    let filtered = Object.values(FRED_SERIES_CONFIG);

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (config) =>
          config.id.toLowerCase().includes(query) ||
          config.title.toLowerCase().includes(query) ||
          config.description.toLowerCase().includes(query) ||
          config.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected tags
    if (selectedTags.size > 0) {
      filtered = filtered.filter((config) =>
        Array.from(selectedTags).every((tag) => config.tags.includes(tag))
      );
    }

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [searchQuery, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) {
        next.delete(tag);
      } else {
        next.add(tag);
      }
      return next;
    });
  };

  const handleSeriesSelect = (seriesId: string) => {
    onChange(seriesId);
  };

  const selectedSeries = value ? getFredSeriesConfig(value) : undefined;

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>

      {/* Search Input */}
      <InputGroup mb={3}>
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search by ID, title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      {/* Prominent Tag Filters */}
      <VStack align="stretch" spacing={2} mb={3}>
        {/* Country Tags */}
        <Box>
          <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={1}>
            Country
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {PROMINENT_TAGS.country.map((tag) => {
              const isSelected = selectedTags.has(tag);
              return (
                <Badge
                  key={tag}
                  as="button"
                  type="button"
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme={isSelected ? 'blue' : 'gray'}
                  variant={isSelected ? 'solid' : 'outline'}
                  cursor="pointer"
                  onClick={() => handleTagToggle(tag)}
                  textTransform="capitalize"
                  fontSize="xs"
                >
                  {tag}
                </Badge>
              );
            })}
          </HStack>
        </Box>

        {/* Data Type Tags */}
        <Box>
          <Text fontSize="xs" fontWeight="semibold" color="gray.600" mb={1}>
            Data Type
          </Text>
          <HStack spacing={2} flexWrap="wrap">
            {PROMINENT_TAGS.data.map((tag) => {
              const isSelected = selectedTags.has(tag);
              return (
                <Badge
                  key={tag}
                  as="button"
                  type="button"
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme={isSelected ? 'blue' : 'gray'}
                  variant={isSelected ? 'solid' : 'outline'}
                  cursor="pointer"
                  onClick={() => handleTagToggle(tag)}
                  textTransform="capitalize"
                  fontSize="xs"
                >
                  {tag.replace('-', ' ')}
                </Badge>
              );
            })}
          </HStack>
        </Box>

        {/* Show selected tags count if any */}
        {selectedTags.size > 0 && (
          <HStack spacing={1} fontSize="xs" color="gray.500">
            <Text>{selectedTags.size} filter(s) active</Text>
            <Text
              as="button"
              color="blue.500"
              onClick={() => setSelectedTags(new Set())}
              _hover={{ textDecoration: 'underline' }}
            >
              Clear all
            </Text>
          </HStack>
        )}
      </VStack>

      {/* Selected Series Display */}
      {selectedSeries && (
        <Box
          p={3}
          mb={3}
          bg="blue.50"
          border="1px solid"
          borderColor="blue.200"
          borderRadius="md"
        >
          <Text fontWeight="semibold" fontSize="sm" mb={1}>
            Selected: {selectedSeries.id} - {selectedSeries.title}
          </Text>
          <HStack spacing={1} flexWrap="wrap" mt={1}>
            {selectedSeries.tags.map((tag) => (
              <Badge key={tag} fontSize="xs" colorScheme="blue" variant="subtle">
                {tag}
              </Badge>
            ))}
          </HStack>
        </Box>
      )}

      {/* Series List */}
      <Box
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        maxH="300px"
        overflowY="auto"
        bg="white"
      >
        {filteredSeries.length === 0 ? (
          <Box p={4} textAlign="center" color="gray.500">
            <Text fontSize="sm">No series found matching your criteria</Text>
          </Box>
        ) : (
          <VStack align="stretch" spacing={0} divider={<Box borderColor="gray.100" />}>
            {filteredSeries.map((config) => {
              const isSelected = config.id === value;
              return (
                <Box
                  key={config.id}
                  as="button"
                  type="button"
                  p={3}
                  textAlign="left"
                  bg={isSelected ? 'blue.50' : 'transparent'}
                  borderLeft={isSelected ? '3px solid' : '3px solid transparent'}
                  borderColor={isSelected ? 'blue.500' : 'transparent'}
                  _hover={{ bg: isSelected ? 'blue.50' : 'gray.50' }}
                  cursor="pointer"
                  onClick={() => handleSeriesSelect(config.id)}
                  transition="all 0.2s"
                >
                  <HStack justify="space-between" align="start" mb={1}>
                    <VStack align="start" spacing={0} flex="1">
                      <Text fontWeight="semibold" fontSize="sm">
                        {config.id}
                      </Text>
                      <Text fontSize="xs" color="gray.600" noOfLines={1}>
                        {config.title}
                      </Text>
                    </VStack>
                    {isSelected && (
                      <Badge colorScheme="blue" fontSize="xs">
                        Selected
                      </Badge>
                    )}
                  </HStack>
                  <HStack spacing={1} flexWrap="wrap" mt={2}>
                    {config.tags.slice(0, 5).map((tag) => (
                      <Badge
                        key={tag}
                        fontSize="xs"
                        colorScheme="gray"
                        variant="subtle"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {config.tags.length > 5 && (
                      <Badge fontSize="xs" colorScheme="gray" variant="subtle">
                        +{config.tags.length - 5}
                      </Badge>
                    )}
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        )}
      </Box>

      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

