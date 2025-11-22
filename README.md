# Macro Flow

A dashboard that tracks major global macroeconomic data.

## Project Structure

- `server/` - Express.js API server
- `client/` - Next.js frontend application
- `common/` - Shared TypeScript types and utilities used by both client and server

## Getting Started

### Setup

First, build the common package:

```bash
cd common
npm install
npm run build
```

### Server

1. Copy the example environment file:

   ```bash
   cd server
   cp .env.example .env
   ```

2. Edit `.env` and add your API keys (e.g., FRED API key)

3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

The server will run on http://localhost:3001

**Configuration:**

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production/test)
- `CORS_ORIGIN` - Allowed CORS origin (default: http://localhost:3000)
- `FRED_API_KEY` - FRED API key for economic data
- `API_TIMEOUT` - API request timeout in milliseconds (default: 30000)

### Client

```bash
cd client
npm install
npm run dev
```

The client will run on http://localhost:3000

## Tech Stack

**Server:**

- Node.js with Express
- TypeScript

**Client:**

- Next.js 14
- React
- TypeScript
- ECharts for data visualization
- ChakraUI for UI components
- React Query for data fetching

## Data Sources'

**FRED**

- https://fredaccount.stlouisfed.org/
