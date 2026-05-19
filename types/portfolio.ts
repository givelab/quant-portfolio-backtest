export type InvestmentProduct = {
  id: string;
  name: string;
  allocationPercent: number;
  expectedAnnualReturn: number;
  annualVolatility: number;
  dividendYield: number;
};

export type PortfolioInput = {
  initialAmount: number;
  monthlyContribution: number;
  years: number;
  products: InvestmentProduct[];
};

export type MonthlyBacktestResult = {
  month: number;
  year: number;
  label: string;
  principal: number;
  totalValue: number;
  profit: number;
  drawdownPercent: number;
};

export type YearlyBacktestResult = {
  year: number;
  principal: number;
  totalValue: number;
  profit: number;
  drawdownPercent: number;
};

export type BacktestResult = {
  monthlyResults: MonthlyBacktestResult[];
  yearlyResults: YearlyBacktestResult[];
  finalAmount: number;
  principal: number;
  profit: number;
  profitRate: number;
  maxDrawdown: number;
  annualizedReturn: number;
};

export type SamplePortfolio = {
  id: "stable" | "balanced" | "growth";
  name: string;
  description: string;
  products: InvestmentProduct[];
};
