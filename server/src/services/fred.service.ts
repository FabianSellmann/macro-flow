import { config } from '../config';
import { FredObservationsResponse } from '../types/fred.types';
import axios, { AxiosError } from 'axios';
import snakecaseKeys from 'snakecase-keys';

const FRED_API_BASE_URL = 'https://api.stlouisfed.org/fred';

export interface GetObservationsOptions {
  realtimeStart?: string; // YYYY-MM-DD
  realtimeEnd?: string; // YYYY-MM-DD
  limit?: number; // 1-100000, default: 100000
  offset?: number; // default: 0
  sortOrder?: 'asc' | 'desc'; // default: asc
  observationStart?: string; // YYYY-MM-DD, default: 1776-07-04
  observationEnd?: string; // YYYY-MM-DD, default: 9999-12-31
  units?: 'lin' | 'chg' | 'ch1' | 'pch' | 'pc1' | 'pca' | 'cch' | 'cca' | 'log'; // default: lin
  frequency?: string; // d, w, bw, m, q, sa, a, etc.
  aggregationMethod?: 'avg' | 'sum' | 'eop'; // default: avg
  outputType?: 1 | 2 | 3 | 4; // default: 1
  vintageDates?: string; // comma-separated YYYY-MM-DD dates
}

export class FredService {
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = config.fredApiKey;
  }

  /**
   * Check if FRED API key is configured
   */
  isConfigured(): boolean {
    return !!this.apiKey;
  }

  /**
   * Get observations (data values) for a FRED economic data series
   * @param seriesId - FRED series ID (required)
   * @param options - Optional parameters for filtering and transforming the data
   * @returns FRED observations response with time series data
   * @throws Error if API key is not configured or API request fails
   * 
   * @see https://fred.stlouisfed.org/docs/api/fred/series_observations.html
   */
  async getObservations(
    seriesId: string,
    options?: GetObservationsOptions
  ): Promise<FredObservationsResponse> {
    if (!this.apiKey) {
      throw new Error('FRED API key is not configured');
    }

    try {
      // Build params object - axios will handle URL encoding
      const params: Record<string, any> = {
        api_key: this.apiKey,
        series_id: seriesId,
        file_type: 'json',
      };

      // Add options if provided, converting camelCase to snake_case
      if (options) {
        Object.assign(params, snakecaseKeys(options, { deep: false }));
      }

      const response = await axios.get<FredObservationsResponse>(
        `${FRED_API_BASE_URL}/series/observations`,
        {
          params,
          timeout: config.apiTimeout,
          headers: {
            'Accept': 'application/json',
          },
        }
      );

      return response.data;
    } catch (err) {
      const error = err as AxiosError | Error | unknown;
      
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw new Error(`FRED API request timed out after ${config.apiTimeout}ms`);
        }
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          const statusText = error.response.statusText;
          const data = error.response.data;
          throw new Error(
            `FRED API error: ${status} ${statusText}. ${JSON.stringify(data)}`
          );
        }
        if (error.request) {
          // Request was made but no response received
          throw new Error('FRED API request failed: No response received');
        }
        // Axios error but no request/response info
        throw new Error(`FRED API request failed: ${error.message}`);
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('Unknown error occurred while fetching FRED data');
    }
  }

  /**
   * Fetch time series data from FRED API
   * @param seriesId - FRED series ID
   * @param startDate - Start date (optional)
   * @param endDate - End date (optional)
   */
  async getTimeSeries(
    seriesId: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    // TODO: Implement FRED API integration
    throw new Error('FRED service not yet implemented');
  }

  /**
   * Search for FRED series
   * @param searchText - Search query
   */
  async searchSeries(searchText: string): Promise<any> {
    // TODO: Implement FRED series search
    throw new Error('FRED service not yet implemented');
  }
}

