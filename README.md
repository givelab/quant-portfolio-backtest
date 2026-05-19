# Quant Portfolio Backtest Web

個人投資家向けの教育・シミュレーション目的のポートフォリオ長期試算Webアプリです。バックエンドは使わず、Next.js内のTypeScript関数で計算し、入力条件はlocalStorageに保存します。

<img width="1376" height="874" alt="Image" src="https://github.com/user-attachments/assets/16298124-4de4-47f4-b8be-1c6e2a871e69" />

<img width="1276" height="896" alt="Image" src="https://github.com/user-attachments/assets/ed667714-6d82-4247-a162-0e5cb3f25e23" />


## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui風のローカルUIコンポーネント
- Recharts
- Zod
- Vitest
- localStorage

## Getting Started

```bash
npm install
npm run dev
```

開発サーバー起動後、`http://localhost:3000` を開いてください。

## Scripts

```bash
npm run dev
npm run build
npm run test
npm run lint
```

## MVP Scope

- 初期投資額、毎月積立額、運用年数の入力
- 複数商品の追加、削除、編集
- 配分比率100%チェック
- 年次・月次の資産推移計算
- Rechartsによる資産総額、元本、運用益の表示
- 最終資産額、元本、運用益、運用益率、最大下落率、年平均成長率の表示
- 安定型、バランス型、成長型のサンプルPF
- localStorage保存

## Notes

このアプリは投資助言ではありません。期待リターン、ボラティリティ、配当利回りはユーザーが入力する仮定値であり、将来の成果を保証しません。

## TODO

- 月次チャートと年次チャートの切り替え
- リバランス頻度の選択
- CSVエクスポート
- Supabaseによるログインと条件保存
- AIによるリスク、集中度、分散度のコメント生成
- 実データ取り込み用のデータソース検討
