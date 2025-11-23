/**
 * Major FRED Economic Data Series Configuration
 * 
 * Each series includes:
 * - id: The FRED series identifier
 * - title: Human-readable title for display
 * - description: Detailed description of what the series represents
 * - tags: Array of tags for grouping and filtering (e.g., 'usa', 'japan', 'inflation', 'bond-yield')
 * 
 * @see https://fred.stlouisfed.org/
 */

export interface FredSeriesConfig {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const FRED_SERIES_CONFIG: Record<string, FredSeriesConfig> = {
  // Gross Domestic Product
  GDP: {
    id: 'GDP',
    title: 'Gross Domestic Product',
    description: 'The total value of all goods and services produced in the United States. GDP is the primary indicator of economic growth.',
    tags: ['usa', 'gdp', 'economic-growth'],
  },
  GDPC1: {
    id: 'GDPC1',
    title: 'Real Gross Domestic Product',
    description: 'GDP adjusted for inflation, providing a measure of economic output in constant dollars. This is the most commonly cited measure of economic growth.',
    tags: ['usa', 'gdp', 'economic-growth', 'real'],
  },
  GDPPOT: {
    id: 'GDPPOT',
    title: 'Real Potential GDP',
    description: 'An estimate of the level of GDP that would exist if the economy were operating at full employment and full capacity.',
    tags: ['usa', 'gdp', 'economic-growth', 'potential'],
  },
  
  // Unemployment
  UNRATE: {
    id: 'UNRATE',
    title: 'Unemployment Rate',
    description: 'The percentage of the labor force that is unemployed but actively seeking employment. A key indicator of labor market health.',
    tags: ['usa', 'unemployment', 'labor-market'],
  },
  U6RATE: {
    id: 'U6RATE',
    title: 'U-6 Unemployment Rate',
    description: 'A broader measure of unemployment that includes discouraged workers and those working part-time for economic reasons. Provides a more comprehensive view of labor market slack.',
    tags: ['usa', 'unemployment', 'labor-market'],
  },
  PAYEMS: {
    id: 'PAYEMS',
    title: 'Total Nonfarm Payroll Employment',
    description: 'The total number of employees on nonfarm payrolls. A key indicator of labor market strength and economic activity.',
    tags: ['usa', 'employment', 'labor-market'],
  },
  
  // Inflation & Prices
  CPIAUCSL: {
    id: 'CPIAUCSL',
    title: 'Consumer Price Index (All Items)',
    description: 'A measure of the average change over time in prices paid by urban consumers for a market basket of consumer goods and services. The primary measure of inflation.',
    tags: ['usa', 'inflation', 'cpi', 'prices'],
  },
  CPILFESL: {
    id: 'CPILFESL',
    title: 'Core CPI (Excluding Food & Energy)',
    description: 'Consumer Price Index excluding volatile food and energy components. Often considered a better measure of underlying inflation trends.',
    tags: ['usa', 'inflation', 'cpi', 'core', 'prices'],
  },
  PCEPI: {
    id: 'PCEPI',
    title: 'Personal Consumption Expenditures Price Index',
    description: 'The Federal Reserve\'s preferred measure of inflation. Measures price changes for goods and services purchased by consumers.',
    tags: ['usa', 'inflation', 'pce', 'prices'],
  },
  PCEPILFE: {
    id: 'PCEPILFE',
    title: 'Core PCE Price Index',
    description: 'PCE Price Index excluding food and energy. The Fed\'s preferred measure of core inflation.',
    tags: ['usa', 'inflation', 'pce', 'core', 'prices'],
  },
  JPNCPIALLMINMEI: {
    id: 'JPNCPIALLMINMEI',
    title: 'Consumer Price Index for Japan',
    description: 'A measure of the average change over time in prices paid by consumers in Japan for a market basket of goods and services. The primary measure of inflation in Japan.',
    tags: ['japan', 'inflation', 'cpi', 'prices'],
  },
  
  // Interest Rates
  FEDFUNDS: {
    id: 'FEDFUNDS',
    title: 'Federal Funds Rate',
    description: 'The interest rate at which depository institutions trade federal funds (balances held at Federal Reserve Banks) with each other overnight. The primary tool of monetary policy.',
    tags: ['usa', 'interest-rate', 'federal-funds-rate', 'monetary-policy'],
  },
  DGS10: {
    id: 'DGS10',
    title: '10-Year Treasury Rate',
    description: 'The yield on 10-year U.S. Treasury securities. A key benchmark for long-term interest rates and mortgage rates.',
    tags: ['usa', 'bond-yield', 'treasury', 'interest-rate', '10-year'],
  },
  DGS30: {
    id: 'DGS30',
    title: '30-Year Treasury Rate',
    description: 'The yield on 30-year U.S. Treasury securities. The longest-term government bond rate, often used as a benchmark for long-term investments.',
    tags: ['usa', 'bond-yield', 'treasury', 'interest-rate', '30-year'],
  },
  PRIME: {
    id: 'PRIME',
    title: 'Bank Prime Loan Rate',
    description: 'The interest rate that commercial banks charge their most creditworthy customers. Often used as a benchmark for consumer and business loans.',
    tags: ['usa', 'interest-rate', 'prime-rate', 'lending'],
  },
  IRLTLT01JPM156N: {
    id: 'IRLTLT01JPM156N',
    title: 'Long-Term Government Bond Yields: 10-year (Japan)',
    description: 'Long-Term Government Bond Yield (10-Year). This is the benchmark usually referenced when discussing the Bank of Japan\'s "Yield Curve Control." A key indicator of long-term interest rates and monetary policy expectations in Japan.',
    tags: ['japan', 'bond-yield', 'government-bonds', 'interest-rate', '10-year', 'yield-curve-control'],
  },
  IR3TIB01JPM156N: {
    id: 'IR3TIB01JPM156N',
    title: '3-Month Interbank Rate (Japan)',
    description: '3-Month Interbank Rate. Useful for short-term liquidity analysis and understanding money market conditions in Japan.',
    tags: ['japan', 'interest-rate', 'interbank-rate', 'short-term', 'liquidity'],
  },
  INTDSRJPM193N: {
    id: 'INTDSRJPM193N',
    title: 'Central Bank Discount Rate (Japan)',
    description: 'Central Bank Discount Rate. The official policy rate set by the Bank of Japan, used as a key tool for monetary policy.',
    tags: ['japan', 'interest-rate', 'policy-rate', 'central-bank', 'monetary-policy'],
  },
  
  // Consumer & Business Confidence
  UMCSENT: {
    id: 'UMCSENT',
    title: 'University of Michigan Consumer Sentiment',
    description: 'A monthly survey of consumer confidence based on telephone interviews regarding personal finances, business conditions, and buying conditions.',
    tags: ['usa', 'consumer-confidence', 'sentiment'],
  },
  CONCCONF: {
    id: 'CONCCONF',
    title: 'Consumer Confidence Index',
    description: 'A measure of consumer optimism about the economy, based on surveys of consumer attitudes and expectations.',
    tags: ['usa', 'consumer-confidence'],
  },
  BCI: {
    id: 'BCI',
    title: 'Business Confidence Index',
    description: 'A measure of business optimism about economic conditions, based on surveys of business leaders.',
    tags: ['usa', 'business-confidence'],
  },
  
  // Industrial Production
  INDPRO: {
    id: 'INDPRO',
    title: 'Industrial Production Index',
    description: 'A measure of the output of the industrial sector of the economy, including manufacturing, mining, and utilities. Indicates economic activity and capacity utilization.',
    tags: ['usa', 'industrial-production', 'manufacturing'],
  },
  TCU: {
    id: 'TCU',
    title: 'Capacity Utilization',
    description: 'The percentage of industrial capacity that is currently being used. High utilization can indicate inflationary pressures.',
    tags: ['usa', 'capacity-utilization', 'industrial-production'],
  },
  
  // Housing
  HOUST: {
    id: 'HOUST',
    title: 'Housing Starts',
    description: 'The number of new residential construction projects that have begun. A leading indicator of economic activity and consumer confidence.',
    tags: ['usa', 'housing', 'construction'],
  },
  PERMIT: {
    id: 'PERMIT',
    title: 'Building Permits',
    description: 'The number of new building permits issued for residential construction. A leading indicator of future housing starts.',
    tags: ['usa', 'housing', 'construction'],
  },
  MSPUS: {
    id: 'MSPUS',
    title: 'Median Home Sales Price',
    description: 'The median sales price of houses sold in the United States. An indicator of housing market strength and affordability.',
    tags: ['usa', 'housing', 'prices'],
  },
  
  // Retail & Sales
  RETAILSMNSA: {
    id: 'RETAILSMNSA',
    title: 'Retail Sales',
    description: 'The total sales of goods and services by retail establishments. A key indicator of consumer spending and economic activity.',
    tags: ['usa', 'retail-sales', 'consumer-spending'],
  },
  RSXFS: {
    id: 'RSXFS',
    title: 'Real Retail and Food Services Sales',
    description: 'Retail sales adjusted for inflation, providing a measure of real consumer spending power.',
    tags: ['usa', 'retail-sales', 'consumer-spending', 'real'],
  },
  
  // Trade
  BOPGSTB: {
    id: 'BOPGSTB',
    title: 'Trade Balance',
    description: 'The difference between exports and imports of goods and services. A positive balance indicates a trade surplus, negative indicates a deficit.',
    tags: ['usa', 'trade', 'trade-balance'],
  },
  EXPGS: {
    id: 'EXPGS',
    title: 'Exports of Goods and Services',
    description: 'The total value of goods and services exported from the United States. Indicates international demand for U.S. products.',
    tags: ['usa', 'trade', 'exports'],
  },
  IMPGS: {
    id: 'IMPGS',
    title: 'Imports of Goods and Services',
    description: 'The total value of goods and services imported into the United States. Indicates domestic demand for foreign products.',
    tags: ['usa', 'trade', 'imports'],
  },
  
  // Money Supply
  M1SL: {
    id: 'M1SL',
    title: 'M1 Money Stock',
    description: 'The most liquid measure of money supply, including currency in circulation and checkable deposits. M1 represents money that can be spent immediately.',
    tags: ['usa', 'money-supply', 'm1'],
  },
  M2SL: {
    id: 'M2SL',
    title: 'M2 Money Stock',
    description: 'A broader measure of money supply that includes M1 plus savings deposits, money market funds, and other near-money assets. The most commonly cited measure of money supply.',
    tags: ['usa', 'money-supply', 'm2'],
  },
  M1V: {
    id: 'M1V',
    title: 'M1 Velocity of Money',
    description: 'The rate at which M1 money supply is used in transactions. Calculated as GDP divided by M1. Indicates how quickly money circulates in the economy.',
    tags: ['usa', 'money-supply', 'velocity', 'm1'],
  },
  M2V: {
    id: 'M2V',
    title: 'M2 Velocity of Money',
    description: 'The rate at which M2 money supply is used in transactions. Calculated as GDP divided by M2. A measure of money circulation speed.',
    tags: ['usa', 'money-supply', 'velocity', 'm2'],
  },
  MANMM101JPM189S: {
    id: 'MANMM101JPM189S',
    title: 'M1 Money Supply (Japan)',
    description: 'M1 Money Supply for Japan. Correlated with yields and inflation. The most liquid measure of money supply, including currency in circulation and checkable deposits.',
    tags: ['japan', 'money-supply', 'm1'],
  },
  
  // Stock Market
  SP500: {
    id: 'SP500',
    title: 'S&P 500 Index',
    description: 'A stock market index measuring the stock performance of 500 large companies listed on U.S. stock exchanges. A key indicator of stock market performance.',
    tags: ['usa', 'stock-market', 'equities'],
  },
  DJIA: {
    id: 'DJIA',
    title: 'Dow Jones Industrial Average',
    description: 'A price-weighted average of 30 significant stocks traded on the New York Stock Exchange and NASDAQ. One of the oldest and most widely followed stock market indices.',
    tags: ['usa', 'stock-market', 'equities'],
  },
  NIKKEI225: {
    id: 'NIKKEI225',
    title: 'Nikkei Stock Average (Nikkei 225)',
    description: 'A stock market index for the Tokyo Stock Exchange, tracking 225 large Japanese companies. One of the most widely followed stock indices in Asia.',
    tags: ['japan', 'stock-market', 'equities'],
  },
  
  // Exchange Rates
  DEXUSEU: {
    id: 'DEXUSEU',
    title: 'U.S. Dollar / Euro Exchange Rate',
    description: 'The exchange rate between the U.S. dollar and the euro. Indicates the relative strength of the dollar against the euro.',
    tags: ['usa', 'europe', 'exchange-rate', 'forex'],
  },
  DEXCHUS: {
    id: 'DEXCHUS',
    title: 'Chinese Yuan / U.S. Dollar Exchange Rate',
    description: 'The exchange rate between the Chinese yuan and the U.S. dollar. Important for trade relations and global economic dynamics.',
    tags: ['usa', 'china', 'exchange-rate', 'forex'],
  },
  DEXJPUS: {
    id: 'DEXJPUS',
    title: 'Japan / U.S. Foreign Exchange Rate',
    description: 'Japanese Yen to 1 U.S. Dollar. This is the most popular daily series for tracking USD/JPY exchange rates.',
    tags: ['usa', 'japan', 'exchange-rate', 'forex'],
  },
  
  // Government Finance
  GFDEGDQ188S: {
    id: 'GFDEGDQ188S',
    title: 'Federal Debt as % of GDP',
    description: 'The ratio of total federal debt to GDP. A measure of government debt sustainability and fiscal health.',
    tags: ['usa', 'government-finance', 'debt', 'fiscal'],
  },
  FYGFD: {
    id: 'FYGFD',
    title: 'Federal Surplus or Deficit',
    description: 'The difference between federal government revenues and expenditures. A deficit means spending exceeds revenue.',
    tags: ['usa', 'government-finance', 'fiscal', 'budget'],
  },
  
  // Personal Income & Spending
  PI: {
    id: 'PI',
    title: 'Personal Income',
    description: 'The total income received by individuals from all sources, including wages, salaries, dividends, interest, and government transfers.',
    tags: ['usa', 'personal-income', 'income'],
  },
  PCE: {
    id: 'PCE',
    title: 'Personal Consumption Expenditures',
    description: 'The total value of goods and services purchased by individuals. The largest component of GDP and a key driver of economic growth.',
    tags: ['usa', 'consumer-spending', 'personal-consumption'],
  },
  PSAVE: {
    id: 'PSAVE',
    title: 'Personal Saving Rate',
    description: 'The percentage of disposable personal income that is saved rather than spent. Indicates consumer financial health and future spending capacity.',
    tags: ['usa', 'savings', 'personal-income'],
  },
} as const;

/**
 * Type for FRED series ID values
 */
export type FredSeriesId = typeof FRED_SERIES_CONFIG[keyof typeof FRED_SERIES_CONFIG]['id'];

/**
 * Get a FRED series configuration by ID
 */
export function getFredSeriesConfig(seriesId: string): FredSeriesConfig | undefined {
  return Object.values(FRED_SERIES_CONFIG).find(config => config.id === seriesId);
}

/**
 * Get the title for a FRED series
 */
export function getFredSeriesTitle(seriesId: string): string {
  const config = getFredSeriesConfig(seriesId);
  return config?.title || seriesId;
}

/**
 * Get the description for a FRED series
 */
export function getFredSeriesDescription(seriesId: string): string {
  const config = getFredSeriesConfig(seriesId);
  return config?.description || '';
}

/**
 * Get tags for a FRED series
 */
export function getFredSeriesTags(seriesId: string): string[] {
  const config = getFredSeriesConfig(seriesId);
  return config?.tags || [];
}

/**
 * Get all unique tags across all FRED series
 */
export function getAllFredSeriesTags(): string[] {
  const allTags = new Set<string>();
  Object.values(FRED_SERIES_CONFIG).forEach((config) => {
    config.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags).sort();
}

/**
 * Get all FRED series that have a specific tag
 */
export function getFredSeriesByTag(tag: string): FredSeriesConfig[] {
  return Object.values(FRED_SERIES_CONFIG).filter((config) =>
    config.tags.includes(tag)
  );
}

/**
 * FRED series options for select dropdowns
 * Format: { value: seriesId, label: title }
 */
export const FRED_SERIES_OPTIONS = Object.values(FRED_SERIES_CONFIG).map((config) => ({
  value: config.id,
  label: `${config.id} - ${config.title}`,
}));
