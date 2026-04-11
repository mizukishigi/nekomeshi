# PR Review 判定基準 (MVP)

このファイルは GitHub Actions `pr-review-judge` ワークフローの **allow-gate** が参照する判断基準です。Claude はこのファイルと PR diff を読み、以下の基準に従って「自動承認可か人間レビュー必須か」を判定します。

> deny-gate (決定的ルール) に該当した PR はこのフェーズに到達しません。ここに来るのは deny-gate を通過した PR のみです。

## 影響レベル

### Low — auto-approve 可
- `*.md` (README, ドキュメント) のみの変更
- コメント追加・タイポ修正のみ
- `src/lib/constants.ts` の日本語ラベル軽微修正
- `e2e/**` のテストファイルのみの追加・修正
- `public/**` の静的アセット差し替え (画像・アイコン等)

### Medium — 原則 needs-human-review
- `src/components/**` のロジック変更
- 認証 / DB 書き込みを伴わない新規 Server Action の追加
- Tailwind クラス調整を伴う UI の意味的変更
- `src/lib/utils.ts` 等ユーティリティ関数の変更

### High — 必ず needs-human-review
- 認証関連: `src/middleware.ts`, `src/actions/auth.ts`, `src/lib/supabase/**`
- DB 関連: `supabase/migrations/**`, RLS ポリシーを含む SQL
- インフラ: `terraform/**`
- 依存関係: `package.json`, `pnpm-lock.yaml` の追加・更新
- 30 行を超えるロジック変更 (テスト・ドキュメント行は除外してカウント)
- 環境変数・シークレット関連ファイル (`.env.*`, Secrets 参照追加等)

## 出力ルール

判定後、Claude は必ず以下を実行してください。

1. 対応するラベルを 1 つだけ付与する
   - Low → `claude-auto-approved`
   - Medium / High → `needs-human-review`
2. PR コメントを日本語で 1 件投稿する。以下を必ず含めること:
   - 影響レベル (`low` / `medium` / `high`)
   - 判定 (`auto-approve` / `needs-human-review`)
   - 理由 (2-3 行で簡潔に、どのファイル・どの変更が判断根拠かを明示)

## 安全側に倒す原則

- 複数レベルにまたがる場合は **常に高い方** を採用する
- 判断に迷う場合は **必ず needs-human-review** を選ぶ
- MVP 段階では false positive (過剰な人間レビュー要求) を許容し、false negative (見逃し) を避ける
