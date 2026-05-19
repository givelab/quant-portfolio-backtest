import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quant Portfolio Backtest Web",
  description: "教育・シミュレーション目的の投資ポートフォリオ長期試算ツール",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
