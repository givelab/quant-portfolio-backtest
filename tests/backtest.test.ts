import { describe, expect, it } from "vitest";
import { runBacktest } from "@/lib/backtest";
import type { PortfolioInput } from "@/types/portfolio";

const baseInput: PortfolioInput = {
  initialAmount: 1000000,
  monthlyContribution: 50000,
  years: 2,
  products: [
    {
      id: "cash-like",
      name: "低リスク商品",
      allocationPercent: 100,
      expectedAnnualReturn: 0,
      annualVolatility: 0,
      dividendYield: 0,
    },
  ],
};

describe("runBacktest", () => {
  it("returns monthly and yearly results for the requested period", () => {
    const result = runBacktest(baseInput);

    expect(result.monthlyResults).toHaveLength(24);
    expect(result.yearlyResults).toHaveLength(2);
  });

  it("only increases by principal when return and volatility are zero", () => {
    const result = runBacktest(baseInput);

    expect(result.finalAmount).toBeCloseTo(2200000, 6);
    expect(result.principal).toBeCloseTo(2200000, 6);
    expect(result.profit).toBeCloseTo(0, 6);
    expect(result.maxDrawdown).toBeCloseTo(0, 6);
  });

  it("uses weighted return and dividend yield", () => {
    const result = runBacktest({
      ...baseInput,
      monthlyContribution: 0,
      years: 1,
      products: [
        {
          id: "a",
          name: "A",
          allocationPercent: 50,
          expectedAnnualReturn: 4,
          annualVolatility: 0,
          dividendYield: 1,
        },
        {
          id: "b",
          name: "B",
          allocationPercent: 50,
          expectedAnnualReturn: 2,
          annualVolatility: 0,
          dividendYield: 1,
        },
      ],
    });

    expect(result.finalAmount).toBeCloseTo(1040000, 2);
  });
});
