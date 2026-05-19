"use client";

import { Layers3 } from "lucide-react";
import type { SamplePortfolio } from "@/types/portfolio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type SamplePortfolioButtonsProps = {
  samples: SamplePortfolio[];
  onApply: (sample: SamplePortfolio) => void;
};

export function SamplePortfolioButtons({ samples, onApply }: SamplePortfolioButtonsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>サンプルPF</CardTitle>
        <CardDescription>配分の出発点として読み込めます。読み込み後も各数値は編集できます。</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-3">
        {samples.map((sample) => (
          <Button
            key={sample.id}
            type="button"
            variant="outline"
            className="h-auto justify-start p-4 text-left"
            onClick={() => onApply(sample)}
          >
            <Layers3 className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block font-semibold">{sample.name}</span>
              <span className="block whitespace-normal text-xs text-muted-foreground">{sample.description}</span>
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
