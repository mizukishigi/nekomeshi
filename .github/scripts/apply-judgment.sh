#!/usr/bin/env bash
#
# Apply PR review judgment to a pull request.
#
# Consumes judgment outputs from the static-deny / static-allow / dynamic-judge
# jobs via environment variables, picks the winning verdict, and mutates the
# PR (labels + judge comment).
#
# Required env:
#   GH_TOKEN          — GitHub token with pull-requests:write + issues:write
#   PR_NUMBER         — Target PR number
#   HEAD_SHA          — PR head commit SHA (for short-sha display)
#   DENY_DENIED       — 'true' | 'false'  (from static-deny.outputs.denied)
#   ALLOW_APPROVED    — 'true' | 'false'  (from static-allow.outputs.approved)
# Optional env (dynamic-judge branch):
#   DENY_REASON       — needed when DENY_DENIED=true
#   DYNAMIC_VERDICT   — 'skip-human-review' | 'needs-human-review'
#   DYNAMIC_IMPACT    — 'low' | 'medium' | 'high'
#   DYNAMIC_REASON    — free-text reason from Claude

set -euo pipefail

: "${GH_TOKEN:?}"
: "${PR_NUMBER:?}"
: "${HEAD_SHA:?}"
: "${DENY_DENIED:?}"
: "${ALLOW_APPROVED:?}"

SHORT_SHA="${HEAD_SHA:0:7}"

# Ensure both labels exist (idempotent)
gh label create needs-human-review --color B60205 --description "人間レビュー必須" 2>/dev/null || true
gh label create skip-human-review  --color 0E8A16 --description "人間レビュー不要" 2>/dev/null || true

# Determine winner in priority order: static-deny > static-allow > dynamic-judge
if [ "$DENY_DENIED" = "true" ]; then
  VERDICT="needs-human-review"
  SOURCE="🔒 Static deny (critical paths)"
  REASON="${DENY_REASON:-ワークフローファイル変更のため人間レビュー必須}"
  IMPACT=""
elif [ "$ALLOW_APPROVED" = "true" ]; then
  VERDICT="skip-human-review"
  SOURCE="✅ Static allow (trivial paths)"
  REASON="全変更ファイルが \`.github/pr-review/allow-paths.txt\` の whitelist に収まっています"
  IMPACT=""
else
  VERDICT="${DYNAMIC_VERDICT:?}"
  SOURCE="🤖 Dynamic judge (Claude)"
  REASON="${DYNAMIC_REASON:-}"
  IMPACT="${DYNAMIC_IMPACT:-}"
fi

echo "Winner: $SOURCE / verdict=$VERDICT"

# Swap labels: remove the opposite label then add the verdict label.
if [ "$VERDICT" = "skip-human-review" ]; then
  gh pr edit "$PR_NUMBER" --remove-label needs-human-review 2>/dev/null || true
  gh pr edit "$PR_NUMBER" --add-label skip-human-review
else
  gh pr edit "$PR_NUMBER" --remove-label skip-human-review 2>/dev/null || true
  gh pr edit "$PR_NUMBER" --add-label needs-human-review
fi

# Build comment body (marker on line 1 for future-proofing even though dedup is off)
{
  echo "<!-- pr-review-judge -->"
  echo "**$SOURCE**"
  echo "- Commit: \`$SHORT_SHA\`"
  [ -n "$IMPACT" ] && echo "- 影響レベル: $IMPACT"
  echo "- 判定: \`$VERDICT\`"
  echo "- 理由: $REASON"
} > /tmp/pr-review-judge-comment.md

cat /tmp/pr-review-judge-comment.md

gh pr comment "$PR_NUMBER" --body-file /tmp/pr-review-judge-comment.md
