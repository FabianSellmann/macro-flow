import express from 'express';
import cors from 'cors';
import { config } from './config';
import routes from './routes';

const app = express();

app.use(cors({
  origin: config.corsOrigin,
}));
app.use(express.json());

// Mount API routes
app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  if (config.fredApiKey) {
    console.log('FRED API key configured');
  }
});

