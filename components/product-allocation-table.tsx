"use client";

import { Plus, Trash2 } from "lucide-react";
import type { InvestmentProduct } from "@/types/portfolio";
import { formatPercent } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type ProductAllocationTableProps = {
  products: InvestmentProduct[];
  allocationTotal: number;
  onUpdate: (id: string, patch: Partial<InvestmentProduct>) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
};

export function ProductAllocationTable({
  products,
  allocationTotal,
  onUpdate,
  onAdd,
  onRemove,
}: ProductAllocationTableProps) {
  const isAllocationValid = Math.abs(allocationTotal - 100) <= 0.01;

  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-3">
        <div className="space-y-1.5">
          <CardTitle>商品配分</CardTitle>
          <CardDescription>期待値は仮定です。配分合計が100%になるように編集してください。</CardDescription>
        </div>
        <Button type="button" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          追加
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-36">商品名</TableHead>
              <TableHead className="min-w-24">配分%</TableHead>
              <TableHead className="min-w-28">期待リターン%</TableHead>
              <TableHead className="min-w-28">ボラ%</TableHead>
              <TableHead className="min-w-28">配当%</TableHead>
              <TableHead className="w-12 text-right">削除</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Input value={product.name} onChange={(event) => onUpdate(product.id, { name: event.target.value })} />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={product.allocationPercent}
                    onChange={(event) => onUpdate(product.id, { allocationPercent: Number(event.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.1"
                    value={product.expectedAnnualReturn}
                    onChange={(event) => onUpdate(product.id, { expectedAnnualReturn: Number(event.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.1"
                    value={product.annualVolatility}
                    onChange={(event) => onUpdate(product.id, { annualVolatility: Number(event.target.value) })}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.1"
                    value={product.dividendYield}
                    onChange={(event) => onUpdate(product.id, { dividendYield: Number(event.target.value) })}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`${product.name}を削除`}
                    onClick={() => onRemove(product.id)}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={isAllocationValid ? "text-sm text-emerald-700" : "text-sm font-medium text-destructive"}>
          配分合計: {formatPercent(allocationTotal, 1)}
        </div>
      </CardContent>
    </Card>
  );
}
