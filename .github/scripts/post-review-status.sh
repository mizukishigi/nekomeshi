#!/usr/bin/env bash
#
# Post PR review status: apply a label and a comment indicating whether this
# PR needs human review.
#
# Consumes upstream judgment outputs via environment variables and picks the
# first decisive gate (priority: static-deny > static-allow > dynamic-judge).
#
# Required env:
#   GH_TOKEN               — GitHub token with pull-requests:write + issues:write
#   PR_NUMBER              — Target PR number
#   HEAD_SHA               — PR head commit SHA (for short-sha display)
#   DENY_DENIED            — 'true' | 'false' (from static-deny.outputs.denied)
#   ALLOW_APPROVED         — 'true' | 'false' (from static-allow.outputs.approved)
# Optional env (dynamic branch):
#   DENY_MATCHED           — space-separated files matched by critical globs
#   DYNAMIC_NEEDS_REVIEW   — 'true' | 'false' (from Claude)
#   DYNAMIC_IMPACT         — 'low' | 'medium' | 'high'
#   DYNAMIC_REASON         — free-text reason from Claude

set -euo pipefail

: "${GH_TOKEN:?}"
: "${PR_NUMBER:?}"
: "${HEAD_SHA:?}"

# DENY_DENIED / ALLOW_APPROVED / DYNAMIC_NEEDS_REVIEW come from upstream job
# outputs. Any job that was skipped returns an empty string, so we default
# them to "false" instead of failing on unset.
: "${DENY_DENIED:=false}"
: "${ALLOW_APPROVED:=false}"

SHORT_SHA="${HEAD_SHA:0:7}"

# Ensure both labels exist (idempotent)
gh label create needs-human-review --color B60205 --description "人間レビュー必須" 2>/dev/null || true
gh label create skip-human-review  --color 0E8A16 --description "人間レビュー不要" 2>/dev/null || true

# Pick the winning gate in priority order.
if [ "$DENY_DENIED" = "true" ]; then
  NEEDS_REVIEW=true
  SOURCE="静的ファイルパス判定 (critical)"
  if [ -n "${DENY_MATCHED:-}" ]; then
    REASON="critical path への変更があります: ${DENY_MATCHED}"
  else
    REASON="critical path への変更があります"
  fi
elif [ "$ALLOW_APPROVED" = "true" ]; then
  NEEDS_REVIEW=false
  SOURCE="静的ファイルパス判定 (trivial)"
  REASON="全変更ファイルが trivial path whitelist に収まっています"
else
  NEEDS_REVIEW="${DYNAMIC_NEEDS_REVIEW:-}"
  if [ -z "$NEEDS_REVIEW" ]; then
    echo "No winning gate produced a decision" >&2
    exit 1
  fi
  IMPACT="${DYNAMIC_IMPACT:-unknown}"
  SOURCE="Claude判定 (影響レベル: $IMPACT)"
  REASON="${DYNAMIC_REASON:-}"
fi

echo "Winner: $SOURCE / needs_review=$NEEDS_REVIEW"

# Swap labels and pick the header message.
if [ "$NEEDS_REVIEW" = "true" ]; then
  gh pr edit "$PR_NUMBER" --remove-label skip-human-review 2>/dev/null || true
  gh pr edit "$PR_NUMBER" --add-label needs-human-review
  HEADER="⚠️ **このPRは人間レビューが必要です**"
else
  gh pr edit "$PR_NUMBER" --remove-label needs-human-review 2>/dev/null || true
  gh pr edit "$PR_NUMBER" --add-label skip-human-review
  HEADER="✅ **このPRはレビュー不要です**"
fi

# Build comment body. The HTML marker on line 1 is reserved for future dedup.
DETAILS="${DYNAMIC_DETAILS:-}"

{
  echo "<!-- pr-review-judge -->"
  echo "## レビュー要否チェック結果"
  echo ""
  echo "$HEADER"
  echo ""
  echo "- Commit: \`$SHORT_SHA\`"
  echo "- 判定: $SOURCE"
  echo "- 理由: $REASON"
  if [ -n "$DETAILS" ]; then
    echo ""
    echo "<details>"
    echo "<summary>判定の詳細 (Claude分析)</summary>"
    echo ""
    echo "$DETAILS"
    echo ""
    echo "</details>"
  fi
} > /tmp/pr-review-comment.md

cat /tmp/pr-review-comment.md

gh pr comment "$PR_NUMBER" --body-file /tmp/pr-review-comment.md
