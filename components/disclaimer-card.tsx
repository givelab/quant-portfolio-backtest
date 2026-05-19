import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function DisclaimerCard() {
  return (
    <Alert className="border-amber-200 bg-amber-50 text-amber-950">
      <ShieldCheck className="mb-2 h-5 w-5" aria-hidden="true" />
      <AlertTitle>教育・シミュレーション目的</AlertTitle>
      <AlertDescription className="text-amber-900">
        このツールは入力条件に基づく資産推移の試算であり、投資助言や個別商品の推奨ではありません。実際の投資判断はご自身の責任で行ってください。
      </AlertDescription>
    </Alert>
  );
}
