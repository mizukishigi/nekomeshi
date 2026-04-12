'use client'
/**
 * scenario-large-diff marker
 *
 * This comment block is intentionally added across many files to
 * simulate a medium-to-large refactor PR. The goal is to measure
 * the execution time and Anthropic API cost of the dynamic-judge
 * job when the changed diff is substantial.
 *
 * No functional change is made by this block.
 */

import Link from 'next/link'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { APPETITE_LABELS, STOOL_LABELS, FOOD_TYPE_LABELS } from '@/lib/constants'
import { formatTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { PawIcon } from '@/components/ui/icons'
import { deleteFeedingLog } from '@/actions/feeding-logs'
import type { FeedingLogWithFood } from '@/actions/feeding-logs'

interface FeedingLogCardProps {
  log: FeedingLogWithFood
}

export function FeedingLogCard({ log }: FeedingLogCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('この記録を削除しますか？')) return
    setIsDeleting(true)
    await deleteFeedingLog(log.id)
  }

  return (
    <Card className={`flex gap-3 ${isDeleting ? 'opacity-50' : ''}`}>
      {/* Time column */}
      <div className="shrink-0 pt-0.5">
        <span className="text-lg font-bold text-primary">
          {formatTime(log.fed_at)}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1.5">
        {/* Food info */}
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-muted">{log.foods.brand}</p>
            <p className="truncate font-medium text-text">{log.foods.product_name}</p>
          </div>
          <Badge variant={log.foods.type as 'dry' | 'wet' | 'treat'}>
            {FOOD_TYPE_LABELS[log.foods.type]}
          </Badge>
          <Link
            href={`/log/${log.id}/edit`}
            className="shrink-0 rounded-lg p-1 text-text-muted hover:bg-primary/15 hover:text-primary active:bg-primary/25 transition-colors"
            style={{ minHeight: 0 }}
            aria-label="編集"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="shrink-0 rounded-lg p-1 text-text-muted hover:bg-error/15 hover:text-error active:bg-error/25 transition-colors"
            style={{ minHeight: 0 }}
            aria-label="削除"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>

        {/* Amount */}
        <p className="text-sm text-text-muted">
          {log.amount_g}g
        </p>

        {/* Ratings row */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {/* Appetite */}
          {log.appetite_rating !== null && (
            <span className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={i < log.appetite_rating! ? 'text-primary' : 'text-text-muted/20'}
                >
                  <PawIcon size={14} />
                </span>
              ))}
              <span className="ml-1 text-xs text-text-muted">
                {APPETITE_LABELS[log.appetite_rating - 1]}
              </span>
            </span>
          )}

          {/* Stool */}
          {log.stool_condition !== null && (
            <span className="text-xs text-text-muted">
              便: {STOOL_LABELS[log.stool_condition - 1]}
            </span>
          )}

          {/* Vomiting */}
          {log.has_vomited && (
            <span className="text-xs font-medium text-error">
              嘔吐あり
            </span>
          )}
        </div>

        {/* Memo */}
        {log.memo && (
          <p className="text-xs text-text-muted italic">
            {log.memo}
          </p>
        )}
      </div>
    </Card>
  )
}
