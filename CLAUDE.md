# ねこ飯 (nekomeshi)

猫のごはん記録 & フード検索Webアプリ。みんなの記録からうちの子に合うフードを探せる。

## Tech Stack

- **Next.js 15** (App Router) + TypeScript + React 19
- **Tailwind CSS v4** (CSS-first theme, `@theme` ディレクティブ)
- **Supabase** (PostgreSQL + Auth + Storage)
- **pnpm** パッケージマネージャー

## 開発コマンド

```bash
pnpm dev          # 開発サーバー起動 (port 54331)
pnpm build        # プロダクションビルド
pnpm lint         # ESLint実行
npx supabase db push  # マイグレーション適用
npx supabase db query --linked < file.sql  # リモートDBにSQL実行
```

## 環境変数 (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # サーバー専用（公開フード統計用）
```

## アーキテクチャ方針

- **Server Components** がデフォルト。`'use client'` はインタラクティブな部分のみ
- **Server Actions** (`src/actions/`) でフォーム送信・データ操作
- **useActionState** パターンでフォーム処理（`login-form.tsx` が参考実装）
- **RLS** (Row Level Security) で全テーブルのアクセス制御
- **モバイルファースト** (375px基準)、44px最小タッチターゲット
- **UI言語は全て日本語**

## プロジェクト構造

```
src/
├── app/
│   ├── (auth)/        # 認証画面（タブバーなし）
│   │   ├── login/
│   │   └── signup/
│   ├── (main)/        # メイン画面（タブバー+FAB付き）
│   │   ├── explore/   # ごはんを探す（公開・ログイン不要）
│   │   ├── mycat/     # うちの子（記録+タイムライン統合）
│   │   ├── log/       # ごはんを記録
│   │   ├── cats/      # 猫プロフィール管理
│   │   └── settings/  # 設定
│   ├── robots.ts      # SEO: robots.txt
│   └── sitemap.ts     # SEO: 動的サイトマップ
├── actions/           # Server Actions
│   ├── auth.ts        # ログイン・サインアップ・ログアウト
│   ├── cats.ts        # 猫CRUD
│   ├── foods.ts       # フード検索・作成・公開統計
│   └── feeding-logs.ts # 給餌記録CRUD・集計・テンプレート
├── components/
│   ├── ui/            # Button, Card, Input, Select, Badge, Avatar, icons
│   ├── layout/        # BottomTabBar, FAB, Header
│   ├── cat/           # CatForm, CatSwitcher, CatPhotoUpload
│   ├── food/          # FoodCard, FoodSearchBar, FoodStatsCard
│   ├── feeding/       # FeedingLogForm, AmountPresets, AppetiteRating, StoolRating
│   └── auth/          # LoginForm, SignupForm
├── lib/
│   ├── supabase/      # client.ts, server.ts, middleware.ts, admin.ts
│   ├── constants.ts   # 日本語ラベル定義
│   ├── utils.ts       # 日付・体重フォーマッター、cn()
│   └── cat-breeds.ts  # 猫種マスタ（72種）
└── middleware.ts      # 認証リダイレクト（/exploreは除外）
```

## DB設計（4テーブル）

| テーブル | 概要 | RLS |
|----------|------|-----|
| `profiles` | ユーザー (auth.users連携、signup時自動作成) | 本人のみ |
| `cats` | 猫プロフィール | 所有者のみ |
| `foods` | フードマスタ (全ユーザー共有、212種シード) | 全員SELECT可、作成者のみUPDATE |
| `feeding_logs` | 給餌記録+評価 (統合テーブル) | 猫の所有者のみ |

## テーマカラー

| 用途 | カラー |
|------|--------|
| Primary | `#F97316` (オレンジ) |
| Accent | `#6366F1` (インディゴ) |
| Background | `#FFFBF5` (ウォームホワイト) |
| Text | `#1C1917` |
| Text Muted | `#78716C` |

フォント: Noto Sans JP (本文), Zen Maru Gothic (タイトル `--font-display`)

## カスタムSVGアイコン (src/components/ui/icons.tsx)

- `CatEatingIcon` — ごはんを食べる猫（FAB、うちの子タブ）
- `CatSittingIcon` — 座る猫（空状態表示）
- `CatFoodIcon` — フードボウル（ごはんを探すタブ）
- `PawIcon` — 肉球（食欲評価）

## 画面構成

- **ごはんを探す** (`/explore`) — フード検索+フィルター（種類・年齢）、ログイン不要
- **うちの子** (`/mycat`) — 猫切替+日別記録+フード別サマリー
- **設定** (`/settings`) — 問い合わせ(Google Form)、ログアウト
- **FAB** — 「ごはんを記録」ボタン（/log, /log/*/edit では非表示）
- **ボトムタブ** — 3タブ（ごはんを探す、うちの子、設定）

## コーディング規約

- 絵文字は使わない（肉球はPawIcon SVGを使用）
- 「フード」ではなく「ごはん」を使う（UI上の表記）
- フード手動登録はユーザーにさせない（管理者が投入、ユーザーは「その他」を選択）
- 「いつもの」ボタンは自動登録ではなくフォーム入力を埋めるだけ
- 記録完了後はタイムライン（/mycat）にリダイレクト
- 合計量・カロリーは食欲評価の割合で計算（完食=100%, 少し=25%等）

## Supabase設定

- **Auth**: Email/Password + Google OAuth
- **Storage**: `cat-photos` バケット（公開読み取り、認証ユーザーのみ書き込み）
- **RPC**: `get_public_food_stats()`, `get_all_food_stats()` (SECURITY DEFINER, anon可)
- **Email確認**: 開発中はOFF
