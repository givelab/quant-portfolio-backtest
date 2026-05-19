"use client";

import type { PortfolioInput } from "@/types/portfolio";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PortfolioFormProps = {
  portfolio: PortfolioInput;
  onChange: <K extends keyof PortfolioInput>(key: K, value: PortfolioInput[K]) => void;
};

export function PortfolioForm({ portfolio, onChange }: PortfolioFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>運用条件</CardTitle>
        <CardDescription>初期投資、毎月積立、運用年数を入力します。</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="initialAmount">初期投資額</Label>
          <Input
            id="initialAmount"
            inputMode="numeric"
            min={0}
            type="number"
            value={portfolio.initialAmount}
            onChange={(event) => onChange("initialAmount", Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="monthlyContribution">毎月積立額</Label>
          <Input
            id="monthlyContribution"
            inputMode="numeric"
            min={0}
            type="number"
            value={portfolio.monthlyContribution}
            onChange={(event) => onChange("monthlyContribution", Number(event.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="years">運用年数</Label>
          <Input
            id="years"
            inputMode="numeric"
            max={40}
            min={1}
            type="number"
            value={portfolio.years}
            onChange={(event) => onChange("years", Number(event.target.value))}
          />
        </div>
      </CardContent>
    </Card>
  );
}
