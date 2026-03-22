import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { APPETITE_LABELS, STOOL_LABELS, FOOD_TYPE_LABELS } from '@/lib/constants'
import { formatTime } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { PawIcon } from '@/components/ui/icons'
import type { FeedingLogWithFood } from '@/actions/feeding-logs'

interface FeedingLogCardProps {
  log: FeedingLogWithFood
}

export function FeedingLogCard({ log }: FeedingLogCardProps) {
  return (
    <Card className="flex gap-3">
      {/* Time column */}
      <div className="shrink-0 pt-0.5">
        <span className="text-lg font-bold text-primary">
          {formatTime(log.fed_at)}
        </span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-1.5">
        {/* Food info */}
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-text-muted">{log.foods.brand}</p>
            <p className="truncate font-medium text-text">{log.foods.product_name}</p>
          </div>
          <Badge variant={log.foods.type as 'dry' | 'wet' | 'treat'}>
            {FOOD_TYPE_LABELS[log.foods.type]}
          </Badge>
          <Link
            href={`/log/${log.id}/edit`}
            className="shrink-0 rounded-lg p-1 text-text-muted hover:bg-text-muted/10 transition-colors"
            aria-label="編集"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </Link>
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
