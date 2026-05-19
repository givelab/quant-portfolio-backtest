# agents.md

## Project Name
Quant Portfolio Backtest Web

## Goal
個人投資家が、運用金額・運用年数・投資商品・配分比率を入力し、長期の資産推移を視覚化できるWebアプリを作る。

## MVP Scope
- 初期投資額を入力できる
- 毎月積立額を入力できる
- 運用年数を1〜40年で指定できる
- 商品を複数追加できる
- 各商品の期待リターン、年率ボラティリティ、配当利回り、比率を入力できる
- 配分比率の合計が100%になるようバリデーションする
- 年次・月次の資産推移を計算する
- Rechartsで資産推移グラフを表示する
- 最終資産額、元本、運用益、最大下落率を表示する
- 入力条件をローカルストレージに保存する

## Out of Scope
- 証券会社API連携
- 実際の売買助言
- 個別銘柄の推奨
- 有料決済
- 高度なモンテカルロ法
- ログイン必須機能
- AI APIの強制利用

## Tech Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui style local components
- Recharts
- Zod
- localStorage
- Vercel deploy

## Architecture
- フロントエンド中心
- バックテスト計算はTypeScriptの純粋関数として実装
- DBはMVPでは不要
- 保存はlocalStorage
- SupabaseはPhase 2で追加

## Important Rules
- 投資助言ではなく、シミュレーションツールとして表現する
- 「必ず儲かる」「おすすめ銘柄」などの断定は禁止
- UIには免責文を表示する
- 計算ロジックは `/lib/backtest.ts` に分離する
- テスト可能な純粋関数で実装する
- 画面コンポーネントと計算ロジックを混ぜない
- まずMVPを完成させてからAI機能を追加する

## Directory Structure
```txt
/app
  /page.tsx
/components
  /portfolio-form.tsx
  /product-allocation-table.tsx
  /backtest-chart.tsx
  /result-summary.tsx
/lib
  /backtest.ts
  /portfolio-validation.ts
  /sample-portfolios.ts
/types
  /portfolio.ts
```

## AI Feature Phase 2
- 入力されたPFに対して、リスク・集中度・分散度をコメントする
- AI APIキーはサーバー環境変数で管理
- AIが投資判断を断定しないようにする
