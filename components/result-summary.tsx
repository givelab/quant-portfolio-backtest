"use client";

import { ArrowDownRight, BarChart3, CircleDollarSign, Percent, PiggyBank, TrendingUp } from "lucide-react";
import type { BacktestResult } from "@/types/portfolio";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ResultSummaryProps = {
  result: BacktestResult | null;
};

const items = [
  { key: "finalAmount", label: "最終資産額", icon: CircleDollarSign },
  { key: "principal", label: "元本合計", icon: PiggyBank },
  { key: "profit", label: "運用益", icon: TrendingUp },
  { key: "profitRate", label: "運用益率", icon: Percent },
  { key: "maxDrawdown", label: "最大下落率", icon: ArrowDownRight },
  { key: "annualizedReturn", label: "年平均成長率", icon: BarChart3 },
] as const;

export function ResultSummary({ result }: ResultSummaryProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;
        const value = result ? result[item.key] : 0;
        const formatted =
          item.key === "finalAmount" || item.key === "principal" || item.key === "profit"
            ? formatCurrency(value)
            : formatPercent(value);

        return (
          <Card key={item.key}>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="break-words text-2xl font-semibold tracking-normal">{formatted}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
