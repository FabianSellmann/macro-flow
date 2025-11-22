/**
 * Major FRED Economic Data Series Identifiers
 * 
 * Common economic indicators available from the Federal Reserve Economic Data (FRED) API
 * @see https://fred.stlouisfed.org/
 */
export const FRED_SERIES = {
  // Gross Domestic Product
  GDP: 'GDP', // Gross Domestic Product
  GDPC1: 'GDPC1', // Real Gross Domestic Product
  GDPPOT: 'GDPPOT', // Real Potential GDP
  
  // Unemployment
  UNRATE: 'UNRATE', // Unemployment Rate
  U6RATE: 'U6RATE', // Total Unemployed, Plus All Persons Marginally Attached to the Labor Force, Plus Total Employed Part Time for Economic Reasons
  PAYEMS: 'PAYEMS', // All Employees, Total Nonfarm
  
  // Inflation & Prices
  CPIAUCSL: 'CPIAUCSL', // Consumer Price Index for All Urban Consumers: All Items
  CPILFESL: 'CPILFESL', // Consumer Price Index for All Urban Consumers: All Items Less Food & Energy
  PCEPI: 'PCEPI', // Personal Consumption Expenditures: Chain-type Price Index
  PCEPILFE: 'PCEPILFE', // Personal Consumption Expenditures Excluding Food and Energy
  
  // Interest Rates
  FEDFUNDS: 'FEDFUNDS', // Effective Federal Funds Rate
  DGS10: 'DGS10', // 10-Year Treasury Constant Maturity Rate
  DGS30: 'DGS30', // 30-Year Treasury Constant Maturity Rate
  PRIME: 'PRIME', // Bank Prime Loan Rate
  
  // Consumer & Business Confidence
  UMCSENT: 'UMCSENT', // University of Michigan: Consumer Sentiment
  CONCCONF: 'CONCCONF', // Consumer Confidence Index
  BCI: 'BCI', // Business Confidence Index
  
  // Industrial Production
  INDPRO: 'INDPRO', // Industrial Production Index
  TCU: 'TCU', // Capacity Utilization: Total Industry
  
  // Housing
  HOUST: 'HOUST', // Housing Starts: Total New Privately Owned
  PERMIT: 'PERMIT', // New Private Housing Units Authorized by Building Permits
  MSPUS: 'MSPUS', // Median Sales Price of Houses Sold for the United States
  
  // Retail & Sales
  RETAILSMNSA: 'RETAILSMNSA', // Advance Retail Sales: Retail Trade
  RSXFS: 'RSXFS', // Advance Real Retail and Food Services Sales
  
  // Trade
  BOPGSTB: 'BOPGSTB', // Trade Balance: Goods and Services, Balance of Payments Basis
  EXPGS: 'EXPGS', // Exports of Goods and Services
  IMPGS: 'IMPGS', // Imports of Goods and Services
  
  // Money Supply
  M1SL: 'M1SL', // M1 Money Stock
  M2SL: 'M2SL', // M2 Money Stock
  M1V: 'M1V', // Velocity of M1 Money Stock
  M2V: 'M2V', // Velocity of M2 Money Stock
  
  // Stock Market
  SP500: 'SP500', // S&P 500
  DJIA: 'DJIA', // Dow Jones Industrial Average
  
  // Exchange Rates
  DEXUSEU: 'DEXUSEU', // U.S. / Euro Foreign Exchange Rate
  DEXCHUS: 'DEXCHUS', // China / U.S. Foreign Exchange Rate
  
  // Government Finance
  GFDEGDQ188S: 'GFDEGDQ188S', // Federal Debt: Total Public Debt as Percent of GDP
  FYGFD: 'FYGFD', // Federal Surplus or Deficit
  
  // Personal Income & Spending
  PI: 'PI', // Personal Income
  PCE: 'PCE', // Personal Consumption Expenditures
  PSAVE: 'PSAVE', // Personal Saving Rate
} as const;

/**
 * Type for FRED series ID values
 */
export type FredSeriesId = typeof FRED_SERIES[keyof typeof FRED_SERIES];

