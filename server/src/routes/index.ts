import { Router } from 'express';
import fredRoutes from './fred.routes';
import timeSeriesRoutes from './timeSeries.routes';

const router = Router();

// Mount route handlers
router.use('/fred', fredRoutes);
router.use('/time-series', timeSeriesRoutes);

export default router;

