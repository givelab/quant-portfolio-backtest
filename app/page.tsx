"use client";

import { Calculator } from "lucide-react";
import { BacktestChart } from "@/components/backtest-chart";
import { DisclaimerCard } from "@/components/disclaimer-card";
import { PortfolioForm } from "@/components/portfolio-form";
import { ProductAllocationTable } from "@/components/product-allocation-table";
import { ResultSummary } from "@/components/result-summary";
import { SamplePortfolioButtons } from "@/components/sample-portfolio-buttons";
import { usePortfolioSimulator } from "@/hooks/use-portfolio-simulator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const simulator = usePortfolioSimulator();
  const errorMessages = simulator.validation.success
    ? []
    : simulator.validation.error.issues.map((issue) => issue.message);

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Calculator className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-medium text-teal-700">Quant Portfolio Backtest Web</p>
              <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
                ポートフォリオ長期シミュレーション
              </h1>
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            初期投資、毎月積立、商品配分、期待リターンを入力し、最大40年の資産推移を試算します。
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <DisclaimerCard />
        <SamplePortfolioButtons samples={simulator.samplePortfolios} onApply={simulator.applySample} />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)]">
          <div className="space-y-5">
            <PortfolioForm portfolio={simulator.portfolio} onChange={simulator.updatePortfolio} />
            <ProductAllocationTable
              products={simulator.portfolio.products}
              allocationTotal={simulator.allocationTotal}
              onUpdate={simulator.updateProduct}
              onAdd={simulator.addProduct}
              onRemove={simulator.removeProduct}
            />
          </div>
          <div className="space-y-5">
            {errorMessages.length > 0 ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertTitle>入力条件を確認してください</AlertTitle>
                <AlertDescription>{Array.from(new Set(errorMessages)).join(" / ")}</AlertDescription>
              </Alert>
            ) : null}
            <ResultSummary result={simulator.result} />
          </div>
        </div>
        <BacktestChart result={simulator.result} />
      </div>
    </main>
  );
}
