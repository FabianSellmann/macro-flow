import { Router, Request, Response } from 'express';
import { TimeSeriesData } from '@macro-flow/common';

const router = Router();

// Mock time series data endpoint
router.get('/', (req: Request, res: Response) => {
  // Generate mock time series data
  const data: TimeSeriesData<number>[] = [];
  const startDate = new Date('2024-01-01');
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split('T')[0],
      value: Math.random() * 100 + 50 + Math.sin(i / 5) * 20
    });
  }
  
  res.json(data);
});

export default router;

