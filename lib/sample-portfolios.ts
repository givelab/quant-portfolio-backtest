import type { SamplePortfolio } from "@/types/portfolio";

export const samplePortfolios: SamplePortfolio[] = [
  {
    id: "stable",
    name: "安定型",
    description: "債券を厚めにし、値動きの抑制を重視した配分です。",
    products: [
      {
        id: "jp-bond",
        name: "国内債券",
        allocationPercent: 40,
        expectedAnnualReturn: 1.0,
        annualVolatility: 3.0,
        dividendYield: 0.5,
      },
      {
        id: "global-equity",
        name: "全世界株式",
        allocationPercent: 40,
        expectedAnnualReturn: 5.0,
        annualVolatility: 16.0,
        dividendYield: 1.8,
      },
      {
        id: "gold",
        name: "金",
        allocationPercent: 20,
        expectedAnnualReturn: 2.5,
        annualVolatility: 18.0,
        dividendYield: 0,
      },
    ],
  },
  {
    id: "balanced",
    name: "バランス型",
    description: "株式を中心に、REITと金で分散を補う配分です。",
    products: [
      {
        id: "global-equity-balanced",
        name: "全世界株式",
        allocationPercent: 60,
        expectedAnnualReturn: 5.0,
        annualVolatility: 16.0,
        dividendYield: 1.8,
      },
      {
        id: "jp-reit",
        name: "国内REIT",
        allocationPercent: 20,
        expectedAnnualReturn: 4.0,
        annualVolatility: 20.0,
        dividendYield: 3.5,
      },
      {
        id: "gold-balanced",
        name: "金",
        allocationPercent: 20,
        expectedAnnualReturn: 2.5,
        annualVolatility: 18.0,
        dividendYield: 0,
      },
    ],
  },
  {
    id: "growth",
    name: "成長型",
    description: "株式比率を高め、長期の成長を重視した配分です。",
    products: [
      {
        id: "us-equity",
        name: "米国株式",
        allocationPercent: 70,
        expectedAnnualReturn: 6.0,
        annualVolatility: 18.0,
        dividendYield: 1.5,
      },
      {
        id: "em-equity",
        name: "新興国株式",
        allocationPercent: 20,
        expectedAnnualReturn: 6.5,
        annualVolatility: 24.0,
        dividendYield: 2.0,
      },
      {
        id: "gold-growth",
        name: "金",
        allocationPercent: 10,
        expectedAnnualReturn: 2.5,
        annualVolatility: 18.0,
        dividendYield: 0,
      },
    ],
  },
];

export const defaultPortfolio = {
  initialAmount: 1000000,
  monthlyContribution: 50000,
  years: 20,
  products: samplePortfolios[1].products,
};
