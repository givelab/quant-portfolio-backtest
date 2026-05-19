"use client";

import { useEffect, useMemo, useState } from "react";
import { runBacktest } from "@/lib/backtest";
import { defaultPortfolio, samplePortfolios } from "@/lib/sample-portfolios";
import { loadPortfolio, savePortfolio } from "@/lib/storage";
import { validatePortfolio } from "@/lib/portfolio-validation";
import type { InvestmentProduct, PortfolioInput, SamplePortfolio } from "@/types/portfolio";

function cloneProducts(products: InvestmentProduct[]) {
  return products.map((product) => ({ ...product }));
}

export function usePortfolioSimulator() {
  const [portfolio, setPortfolio] = useState<PortfolioInput>({
    ...defaultPortfolio,
    products: cloneProducts(defaultPortfolio.products),
  });

  useEffect(() => {
    const saved = loadPortfolio();
    if (saved) {
      setPortfolio(saved);
    }
  }, []);

  useEffect(() => {
    const validation = validatePortfolio(portfolio);
    if (validation.success) {
      savePortfolio(validation.data);
    }
  }, [portfolio]);

  const allocationTotal = useMemo(
    () => portfolio.products.reduce((sum, product) => sum + Number(product.allocationPercent || 0), 0),
    [portfolio.products],
  );

  const validation = useMemo(() => validatePortfolio(portfolio), [portfolio]);
  const result = useMemo(() => (validation.success ? runBacktest(validation.data) : null), [validation]);

  function updatePortfolio<K extends keyof PortfolioInput>(key: K, value: PortfolioInput[K]) {
    setPortfolio((current) => ({ ...current, [key]: value }));
  }

  function updateProduct(id: string, patch: Partial<InvestmentProduct>) {
    setPortfolio((current) => ({
      ...current,
      products: current.products.map((product) => (product.id === id ? { ...product, ...patch } : product)),
    }));
  }

  function addProduct() {
    setPortfolio((current) => ({
      ...current,
      products: [
        ...current.products,
        {
          id: crypto.randomUUID(),
          name: "新規商品",
          allocationPercent: 0,
          expectedAnnualReturn: 3,
          annualVolatility: 12,
          dividendYield: 0,
        },
      ],
    }));
  }

  function removeProduct(id: string) {
    setPortfolio((current) => ({
      ...current,
      products: current.products.filter((product) => product.id !== id),
    }));
  }

  function applySample(sample: SamplePortfolio) {
    setPortfolio((current) => ({
      ...current,
      products: cloneProducts(sample.products),
    }));
  }

  return {
    portfolio,
    result,
    validation,
    allocationTotal,
    samplePortfolios,
    updatePortfolio,
    updateProduct,
    addProduct,
    removeProduct,
    applySample,
  };
}
