import type { BacktestResult, MonthlyBacktestResult, PortfolioInput, YearlyBacktestResult } from "@/types/portfolio";

function weightedAnnualReturn(input: PortfolioInput) {
  return input.products.reduce((sum, product) => {
    const weight = product.allocationPercent / 100;
    const totalAnnualReturn = product.expectedAnnualReturn + product.dividendYield;
    return sum + weight * (totalAnnualReturn / 100);
  }, 0);
}

function weightedAnnualVolatility(input: PortfolioInput) {
  const variance = input.products.reduce((sum, product) => {
    const weight = product.allocationPercent / 100;
    const volatility = product.annualVolatility / 100;
    return sum + weight * weight * volatility * volatility;
  }, 0);

  return Math.sqrt(variance);
}

function deterministicCycle(month: number) {
  return Math.sin(month * 1.7) * 0.55 + Math.sin(month * 0.47) * 0.35 + Math.cos(month * 0.23) * 0.1;
}

export function runBacktest(input: PortfolioInput): BacktestResult {
  const totalMonths = input.years * 12;
  const annualReturn = weightedAnnualReturn(input);
  const annualVolatility = weightedAnnualVolatility(input);
  const monthlyBaseReturn = Math.pow(1 + annualReturn, 1 / 12) - 1;
  const monthlyVolatility = annualVolatility / Math.sqrt(12);

  let totalValue = input.initialAmount;
  let principal = input.initialAmount;
  let peak = totalValue;
  let maxDrawdown = 0;
  const monthlyResults: MonthlyBacktestResult[] = [];
  const yearlyResults: YearlyBacktestResult[] = [];

  for (let month = 1; month <= totalMonths; month += 1) {
    principal += input.monthlyContribution;
    totalValue += input.monthlyContribution;

    const cycleShock = deterministicCycle(month) * monthlyVolatility * 0.45;
    totalValue *= 1 + monthlyBaseReturn + cycleShock;
    totalValue = Math.max(totalValue, 0);

    peak = Math.max(peak, totalValue);
    const drawdownPercent = peak > 0 ? ((peak - totalValue) / peak) * 100 : 0;
    maxDrawdown = Math.max(maxDrawdown, drawdownPercent);

    const result: MonthlyBacktestResult = {
      month,
      year: Math.ceil(month / 12),
      label: `${Math.ceil(month / 12)}年${((month - 1) % 12) + 1}月`,
      principal,
      totalValue,
      profit: totalValue - principal,
      drawdownPercent,
    };

    monthlyResults.push(result);

    if (month % 12 === 0) {
      yearlyResults.push({
        year: month / 12,
        principal: result.principal,
        totalValue: result.totalValue,
        profit: result.profit,
        drawdownPercent: result.drawdownPercent,
      });
    }
  }

  const finalAmount = monthlyResults.at(-1)?.totalValue ?? input.initialAmount;
  const finalPrincipal = monthlyResults.at(-1)?.principal ?? input.initialAmount;
  const profit = finalAmount - finalPrincipal;
  const profitRate = finalPrincipal > 0 ? (profit / finalPrincipal) * 100 : 0;
  const annualizedReturn =
    input.years > 0 && input.initialAmount > 0
      ? (Math.pow(finalAmount / input.initialAmount, 1 / input.years) - 1) * 100
      : 0;

  return {
    monthlyResults,
    yearlyResults,
    finalAmount,
    principal: finalPrincipal,
    profit,
    profitRate,
    maxDrawdown,
    annualizedReturn,
  };
}
