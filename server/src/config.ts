import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export interface Config {
  // Server configuration
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  
  // API Keys
  fredApiKey: string | undefined;
  
  // CORS configuration
  corsOrigin: string;
  
  // Other configuration
  apiTimeout: number;
}

function getConfig(): Config {
  return {
    // Server configuration
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
    
    // API Keys
    fredApiKey: process.env.FRED_API_KEY,
    
    // CORS configuration
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    
    // Other configuration
    apiTimeout: parseInt(process.env.API_TIMEOUT || '30000', 10),
  };
}

export const config = getConfig();

// Validate required configuration in production
if (config.nodeEnv === 'production') {
  // Add validation for required production config here if needed
  // For example: if (!config.fredApiKey) throw new Error('FRED_API_KEY is required in production');
}

