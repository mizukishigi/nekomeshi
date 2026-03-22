import { FeedingLogCard } from '@/components/feeding/feeding-log-card'
import type { FeedingLogWithFood } from '@/actions/feeding-logs'

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土'] as const

function formatSectionDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.getMonth() + 1
  const day = d.getDate()
  const dayOfWeek = DAY_NAMES[d.getDay()]
  return `${month}月${day}日（${dayOfWeek}）`
}

interface DailySectionProps {
  date: string
  logs: FeedingLogWithFood[]
}

export function DailySection({ date, logs }: DailySectionProps) {
  const totalCount = logs.length
  const totalGrams = logs.reduce((sum, log) => sum + log.amount_g, 0)

  return (
    <section className="space-y-3">
      {/* Date header with summary */}
      <div className="flex items-baseline justify-between px-4">
        <h2 className="text-sm font-bold text-text">
          {formatSectionDate(date)}
        </h2>
        {totalCount > 0 && (
          <span className="text-xs text-text-muted">
            {totalCount}回 / {totalGrams}g
          </span>
        )}
      </div>

      {/* Logs or empty state */}
      <div className="space-y-2 px-4">
        {logs.length > 0 ? (
          logs.map((log) => (
            <FeedingLogCard key={log.id} log={log} />
          ))
        ) : (
          <p className="py-4 text-center text-sm text-text-muted">
            記録なし
          </p>
        )}
      </div>
    </section>
  )
}
