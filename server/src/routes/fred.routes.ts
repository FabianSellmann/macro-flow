import { Router, Request, Response } from 'express';
import { ZodError } from 'zod';
import { services } from '../services';
import { TimeSeriesData } from '@macro-flow/common';
import {
  GetObservationsQuerySchema,
  GetObservationsSimpleQuerySchema,
} from './fred.schemas';

const router = Router();

// Helper function to transform FRED observations to TimeSeriesData
function transformFredObservationsToTimeSeries(
  observations: Array<{ date: string; value: string }>
): TimeSeriesData<number>[] {
  return observations
    .filter(obs => obs.value !== '.')
    .map(obs => ({
      date: obs.date,
      value: parseFloat(obs.value),
    }));
}

// FRED series observations endpoint (returns TimeSeriesData format)
router.get('/series/:seriesId/observations', async (req: Request, res: Response) => {
  try {
    const { seriesId } = req.params;

    // Validate and transform query parameters using Zod
    const options = GetObservationsQuerySchema.parse(req.query);

    const fredData = await services.fred.getObservations(seriesId, options);

    // Transform to TimeSeriesData format
    const timeSeriesData = transformFredObservationsToTimeSeries(fredData.observations);

    res.json(timeSeriesData);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: 'Invalid query parameters',
        message: err.errors.map((e: { path: (string | number)[]; message: string }) => 
          `${e.path.join('.')}: ${e.message}`
        ).join(', '),
      });
      return;
    }
    
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to fetch FRED data',
        message: err.message,
      });
    } else {
      res.status(500).json({
        error: 'Failed to fetch FRED data',
        message: 'Unknown error occurred',
      });
    }
  }
});

// FRED series observations endpoint (returns TimeSeriesData format with common options)
router.get('/series/:seriesId', async (req: Request, res: Response) => {
  try {
    const { seriesId } = req.params;

    // Validate and transform query parameters using Zod
    const options = GetObservationsSimpleQuerySchema.parse(req.query);

    const fredData = await services.fred.getObservations(seriesId, options);

    // Transform to TimeSeriesData format
    const timeSeriesData = transformFredObservationsToTimeSeries(fredData.observations);

    res.json(timeSeriesData);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      res.status(400).json({
        error: 'Invalid query parameters',
        message: err.errors.map((e: { path: (string | number)[]; message: string }) => 
          `${e.path.join('.')}: ${e.message}`
        ).join(', '),
      });
      return;
    }
    
    if (err instanceof Error) {
      res.status(500).json({
        error: 'Failed to fetch FRED data',
        message: err.message,
      });
    } else {
      res.status(500).json({
        error: 'Failed to fetch FRED data',
        message: 'Unknown error occurred',
      });
    }
  }
});

export default router;

