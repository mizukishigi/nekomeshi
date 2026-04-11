# PR Review 判定基準 (MVP)

このファイルは GitHub Actions `pr-review-judge` ワークフローの **dynamic-judge** ジョブが参照する判断基準です。Claude はこのファイルと PR diff を読み、以下の基準に従って「人間レビューが必要かどうか」を判定します。

> static-deny (critical paths) または static-allow (trivial paths) に該当した PR はこのフェーズに到達しません。ここに来るのは両方を通過した PR のみです。

## 影響レベル

### Low (needs_review: false)
- コメント追加・タイポ修正のみ
- `src/lib/constants.ts` の日本語ラベル軽微修正
- `e2e/**` のテストファイルのみの追加・修正

### Medium (needs_review: true)
- `src/components/**` のロジック変更
- 認証 / DB 書き込みを伴わない新規 Server Action の追加
- Tailwind クラス調整を伴う UI の意味的変更
- `src/lib/utils.ts` 等ユーティリティ関数の変更

### High (needs_review: true)
- 認証関連: `src/middleware.ts`, `src/actions/auth.ts`, `src/lib/supabase/**`
- DB 関連: `supabase/migrations/**`, RLS ポリシーを含む SQL
- インフラ: `terraform/**`
- 依存関係: `package.json`, `pnpm-lock.yaml` の追加・更新
- 30 行を超えるロジック変更 (テスト・ドキュメント行は除外してカウント)
- 環境変数・シークレット関連ファイル (`.env.*`, Secrets 参照追加等)

## 安全側に倒す原則

- 複数レベルにまたがる場合は **常に高い方** を採用する
- 判断に迷う場合は **必ず `needs_review: true`** を選ぶ
- MVP 段階では false positive (過剰な人間レビュー要求) を許容し、false negative (見逃し) を避ける
