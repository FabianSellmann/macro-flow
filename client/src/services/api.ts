/**
 * API Service
 * 
 * Centralized service for making API calls to the server.
 * This represents the client-side interface to the server API.
 */

import { TimeSeriesData } from '@macro-flow/common';
import { FredObservationOptions } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * FRED API Service
 * 
 * Handles all FRED-related API calls
 */
export class FredApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Fetch FRED series observations
   * 
   * @param seriesId - The FRED series identifier
   * @param options - Optional FRED observation parameters
   * @param dateFrom - Optional start date (YYYY-MM-DD)
   * @param dateTo - Optional end date (YYYY-MM-DD)
   * @returns Promise resolving to time series data
   */
  async getSeriesObservations(
    seriesId: string,
    options?: FredObservationOptions,
    dateFrom?: string,
    dateTo?: string
  ): Promise<TimeSeriesData<number>[]> {
    const params = new URLSearchParams({
      limit: String(options?.limit || 500),
      sort_order: options?.sortOrder || 'asc',
    });

    // Add date filters if provided
    if (dateFrom) {
      params.append('observation_start', dateFrom);
    }
    
    if (dateTo) {
      params.append('observation_end', dateTo);
    }
    
    // Add optional FRED parameters
    if (options?.units) {
      params.append('units', options.units);
    }

    const response = await fetch(
      `${this.baseUrl}/api/fred/series/${seriesId}?${params.toString()}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch FRED data: ${response.statusText}`
      );
    }

    return response.json();
  }
}

// Export a singleton instance
export const fredApi = new FredApiService();

// Export convenience function for backward compatibility
export async function fetchFredData(
  seriesId: string,
  options?: FredObservationOptions,
  dateFrom?: string,
  dateTo?: string
): Promise<TimeSeriesData<number>[]> {
  return fredApi.getSeriesObservations(seriesId, options, dateFrom, dateTo);
}

