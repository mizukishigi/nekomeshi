# PR Review Judge ワークフロー

## フロー図

```mermaid
flowchart TD
    %% ── トリガー ──
    trigger(["🔔 pull_request イベント<br/>(opened / synchronize / reopened / ready_for_review)"])

    %% ── Job 1: check-draft ──
    trigger --> draft_job

    subgraph draft_job ["Job 1: Check draft (gate)"]
        draft{"github.event<br/>.pull_request<br/>.draft == false?"}
    end

    draft -- "draft: true" --> skip_all(["全後続ジョブスキップ<br/>ワークフロー終了"])

    %% ── Job 2: static-deny ──
    draft -- "draft: false" --> deny_job

    subgraph deny_job ["Job 2: Static deny (critical paths)"]
        deny_filter["dorny/paths-filter@v3<br/>list-files: shell"]
        deny_filter --> deny_check{"変更ファイルが<br/>critical glob に該当?"}
    end

    deny_check -- "denied: true" --> deny_result

    subgraph deny_result ["Critical path 該当"]
        deny_files["該当ファイル一覧を<br/>outputs.matched に出力"]
    end

    %% ── Job 3: static-allow ──
    deny_check -- "denied: false" --> allow_job

    subgraph allow_job ["Job 3: Static allow (trivial paths)"]
        allow_filter["dorny/paths-filter@v3<br/>list-files: json<br/>filters: all + trivial"]
        allow_filter --> subset_check["Subset check<br/>jq で件数比較<br/>ALL_COUNT == TRIVIAL_COUNT ?"]
        subset_check --> allow_result{"全ファイルが<br/>trivial に収まる?"}
    end

    allow_result -- "approved: true" --> trivial_result["全ファイル trivial"]

    %% ── Job 4: dynamic-judge ──
    allow_result -- "approved: false" --> claude_job

    subgraph claude_job ["Job 4: Dynamic judge (Claude)"]
        checkout_1["actions/checkout@v4<br/>fetch-depth: 0"]
        checkout_1 --> load_prompt["Load prompt<br/>cat dynamic-judge.md<br/>→ GITHUB_OUTPUT"]
        load_prompt --> claude_run

        subgraph claude_run ["claude-code-action@v1"]
            claude_input["prompt:<br/>  REPO + PR NUMBER<br/>  + dynamic-judge.md<br/>model: claude-haiku-4-5<br/>allowed-tools: Read, Bash(gh pr diff:*)<br/>output: --json-schema"]
            claude_input --> claude_step1["1. Read pr-tiers.md<br/>   判定基準を把握"]
            claude_step1 --> claude_step2["2. gh pr diff N<br/>   変更差分を取得"]
            claude_step2 --> claude_step3["3. 基準に沿って判定"]
        end

        claude_step3 --> claude_output["structured_output (JSON)<br/>impact: low | medium | high<br/>needs_review: true | false<br/>reason: 1行の日本語<br/>details: Markdown 詳細分析"]
    end

    claude_output --> impact_check{impact レベル}

    impact_check -- "Low<br/>needs_review: false" --> low_result["判定: レビュー不要"]
    impact_check -- "Medium<br/>needs_review: true" --> medium_result["判定: レビュー必要"]
    impact_check -- "High<br/>needs_review: true" --> high_result["判定: レビュー必要"]

    %% ── Job 5: post-review-status ──
    deny_result --> post_job
    trivial_result --> post_job
    low_result --> post_job
    medium_result --> post_job
    high_result --> post_job

    subgraph post_job ["Job 5: Post review status to PR"]
        post_checkout["actions/checkout@v4"]
        post_checkout --> post_script["post-review-status.sh"]

        post_script --> gate_priority["判定ゲート優先順位<br/>1. static-deny<br/>2. static-allow<br/>3. dynamic-judge"]

        gate_priority --> label_swap{"needs_review?"}

        label_swap -- "true" --> label_need["ラベル: needs-human-review<br/>(skip-human-review を削除)"]
        label_swap -- "false" --> label_skip["ラベル: skip-human-review<br/>(needs-human-review を削除)"]

        label_need --> comment_build
        label_skip --> comment_build

        comment_build["コメント構築"]
        comment_build --> comment_header["ヘッダー:<br/>⚠️ このPRは人間レビューが必要です<br/>or ✅ このPRはレビュー不要です"]
        comment_header --> comment_meta["Commit SHA / 判定元 / 理由"]
        comment_meta --> comment_details{"Claude の<br/>details あり?"}
        comment_details -- Yes --> comment_fold["&lt;details&gt; 折りたたみで<br/>判定詳細を表示"]
        comment_details -- No --> comment_post
        comment_fold --> comment_post["gh pr comment で投稿"]
    end

    %% ── スタイル ──
    style skip_all fill:#9e9e9e,color:#fff
    style deny_result fill:#b71c1c,color:#fff
    style trivial_result fill:#2e7d32,color:#fff
    style low_result fill:#2e7d32,color:#fff
    style medium_result fill:#e65100,color:#fff
    style high_result fill:#b71c1c,color:#fff
    style claude_run fill:#6366f1,color:#fff
    style label_need fill:#b71c1c,color:#fff
    style label_skip fill:#2e7d32,color:#fff
```

## 判定基準 (pr-tiers.md)

| レベル | needs_review | 対象 |
|--------|:---:|------|
| **Low** | `false` | コメント・タイポ修正、constants.ts の軽微な日本語ラベル修正、テストファイルのみ |
| **Medium** | `true` | components のロジック変更、Server Action 追加、Tailwind UI 変更、utils 関数変更 |
| **High** | `true` | 認証・DB・インフラ、依存関係更新、30行超のロジック変更、環境変数関連 |

> 複数レベルにまたがる場合は常に高い方を採用。迷ったら `needs_review: true`。

## ファイル構成

```
.github/
├── pr-review-judge/
│   ├── dynamic-judge.md       # Claude へのプロンプト
│   ├── pr-tiers.md            # 判定基準 (Low / Medium / High)
│   ├── post-review-status.sh  # ラベル・コメント投稿スクリプト
│   └── diagram.md             # このファイル
└── workflows/
    └── pr-review-judge.yml    # ワークフロー本体
```

## パス設定の変更方法

| 変更したいこと | 編集先 |
|---|---|
| critical path の追加 | `pr-review-judge.yml` → static-deny の `filters.critical` |
| trivial path の追加 | `pr-review-judge.yml` → static-allow の `filters.trivial` |
| Claude の判定基準変更 | `pr-review-judge/pr-tiers.md` |
| Claude へのプロンプト変更 | `pr-review-judge/dynamic-judge.md` |
| コメント・ラベルの出力変更 | `pr-review-judge/post-review-status.sh` |
