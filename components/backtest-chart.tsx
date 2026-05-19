"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BacktestResult } from "@/types/portfolio";
import { formatCompactCurrency, formatCurrency } from "@/lib/format";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type BacktestChartProps = {
  result: BacktestResult | null;
};

export function BacktestChart({ result }: BacktestChartProps) {
  const data =
    result?.yearlyResults.map((item) => ({
      year: `${item.year}年`,
      totalValue: Math.round(item.totalValue),
      principal: Math.round(item.principal),
      profit: Math.round(item.profit),
    })) ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>資産推移</CardTitle>
        <CardDescription>年次の資産総額、元本、運用益を表示します。</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[360px] w-full">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ left: 0, right: 12, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d7dee8" />
                <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={10} />
                <YAxis
                  tickFormatter={(value) => formatCompactCurrency(Number(value))}
                  tickLine={false}
                  axisLine={false}
                  width={58}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ borderRadius: 8, borderColor: "#d7dee8" }}
                />
                <Area
                  type="monotone"
                  dataKey="totalValue"
                  name="資産総額"
                  fill="#0f766e"
                  fillOpacity={0.14}
                  stroke="#0f766e"
                  strokeWidth={3}
                />
                <Line type="monotone" dataKey="principal" name="元本" stroke="#475569" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="profit" name="運用益" stroke="#b45309" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
              配分合計を100%にするとチャートを表示します
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
