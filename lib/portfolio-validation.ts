import { z } from "zod";
import { MAX_YEARS, MIN_YEARS, TARGET_ALLOCATION_PERCENT } from "@/lib/constants";

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "商品名を入力してください"),
  allocationPercent: z.coerce.number().min(0).max(100),
  expectedAnnualReturn: z.coerce.number().min(-50).max(50),
  annualVolatility: z.coerce.number().min(0).max(100),
  dividendYield: z.coerce.number().min(0).max(30),
});

export const portfolioSchema = z
  .object({
    initialAmount: z.coerce.number().min(0, "初期投資額は0以上で入力してください"),
    monthlyContribution: z.coerce.number().min(0, "毎月積立額は0以上で入力してください"),
    years: z.coerce
      .number()
      .int()
      .min(MIN_YEARS, "運用年数は1年以上で入力してください")
      .max(MAX_YEARS, "運用年数は40年以内で入力してください"),
    products: z.array(productSchema).min(1, "商品を1つ以上追加してください"),
  })
  .superRefine((value, ctx) => {
    const total = value.products.reduce((sum, product) => sum + product.allocationPercent, 0);
    if (Math.abs(total - TARGET_ALLOCATION_PERCENT) > 0.01) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `配分比率の合計を${TARGET_ALLOCATION_PERCENT}%にしてください`,
        path: ["products"],
      });
    }
  });

export function validatePortfolio(input: unknown) {
  return portfolioSchema.safeParse(input);
}
