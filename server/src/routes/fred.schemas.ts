import { z } from 'zod';
import { GetObservationsOptions } from '../services/fred.service';

/**
 * Zod schema for parsing and validating FRED API query parameters
 * Transforms snake_case query params to camelCase options
 */
export const GetObservationsQuerySchema = z
  .object({
    realtime_start: z.string().optional(),
    realtime_end: z.string().optional(),
    limit: z.coerce.number().int().positive().max(100000).optional(),
    offset: z.coerce.number().int().nonnegative().optional(),
    sort_order: z.enum(['asc', 'desc']).optional(),
    observation_start: z.string().optional(),
    observation_end: z.string().optional(),
    units: z
      .enum(['lin', 'chg', 'ch1', 'pch', 'pc1', 'pca', 'cch', 'cca', 'log'])
      .optional(),
    frequency: z.string().optional(),
    aggregation_method: z.enum(['avg', 'sum', 'eop']).optional(),
    output_type: z
      .union([
        z.literal('1'),
        z.literal('2'),
        z.literal('3'),
        z.literal('4'),
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.undefined(),
      ])
      .transform((val): 1 | 2 | 3 | 4 | undefined => 
        val === undefined ? undefined : (typeof val === 'string' ? parseInt(val, 10) : val) as 1 | 2 | 3 | 4
      )
      .optional(),
    vintage_dates: z.string().optional(),
  })
  .transform(
    (data): Partial<GetObservationsOptions> => ({
      realtimeStart: data.realtime_start,
      realtimeEnd: data.realtime_end,
      limit: data.limit,
      offset: data.offset,
      sortOrder: data.sort_order,
      observationStart: data.observation_start,
      observationEnd: data.observation_end,
      units: data.units,
      frequency: data.frequency,
      aggregationMethod: data.aggregation_method,
      outputType: data.output_type,
      vintageDates: data.vintage_dates,
    })
  );

/**
 * Simplified schema for common query parameters
 */
export const GetObservationsSimpleQuerySchema = z
  .object({
    observation_start: z.string().optional(),
    observation_end: z.string().optional(),
    limit: z.coerce.number().int().positive().max(100000).optional(),
    sort_order: z.enum(['asc', 'desc']).optional(),
  })
  .transform(
    (data): Partial<GetObservationsOptions> => ({
      observationStart: data.observation_start,
      observationEnd: data.observation_end,
      limit: data.limit,
      sortOrder: data.sort_order,
    })
  );

