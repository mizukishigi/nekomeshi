import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PawIcon } from '@/components/ui/icons'
import { FOOD_TYPE_LABELS, APPETITE_LABELS, STOOL_LABELS } from '@/lib/constants'
import type { FoodStat } from '@/actions/feeding-logs'

interface FoodStatsCardProps {
  stat: FoodStat
}

function getAppetiteLabel(avg: number): string {
  const index = Math.round(avg)
  const clamped = Math.max(0, Math.min(index, APPETITE_LABELS.length - 1))
  return APPETITE_LABELS[clamped]
}

function getStoolLabel(avg: number): string {
  const index = Math.round(avg)
  const clamped = Math.max(0, Math.min(index, STOOL_LABELS.length - 1))
  return STOOL_LABELS[clamped]
}

export function FoodStatsCard({ stat }: FoodStatsCardProps) {
  const vomitRate = stat.total_logs > 0
    ? Math.round((stat.vomit_count / stat.total_logs) * 100)
    : 0

  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-text-muted">{stat.brand}</p>
          <p className="mt-0.5 text-base font-bold text-text truncate">
            {stat.product_name}
          </p>
        </div>
        <Badge variant={stat.type as 'dry' | 'wet' | 'treat'}>
          {FOOD_TYPE_LABELS[stat.type as keyof typeof FOOD_TYPE_LABELS]}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-[10px] text-text-muted">平均食いつき</p>
          {stat.avg_appetite !== null ? (
            <p className="text-sm font-semibold text-text flex items-center gap-0.5 flex-wrap">
              {Array.from({ length: Math.round(stat.avg_appetite) }, (_, i) => (
                <span key={i} className="text-primary"><PawIcon size={14} /></span>
              ))}
              <span className="text-xs font-normal text-text-muted">
                {stat.avg_appetite.toFixed(1)} - {getAppetiteLabel(stat.avg_appetite)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-text-muted">--</p>
          )}
        </div>

        <div>
          <p className="text-[10px] text-text-muted">平均うんち</p>
          {stat.avg_stool !== null ? (
            <p className="text-sm font-semibold text-text">
              {stat.avg_stool.toFixed(1)}{' '}
              <span className="text-xs font-normal text-text-muted">
                - {getStoolLabel(stat.avg_stool)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-text-muted">--</p>
          )}
        </div>

        <div>
          <p className="text-[10px] text-text-muted">嘔吐率</p>
          <p className="text-sm font-semibold text-text">
            {vomitRate}%
            {vomitRate > 0 && (
              <span className="text-xs font-normal text-text-muted">
                {' '}({stat.vomit_count}/{stat.total_logs})
              </span>
            )}
          </p>
        </div>

        <div>
          <p className="text-[10px] text-text-muted">記録回数</p>
          <p className="text-sm font-semibold text-text">
            {stat.total_logs}回
          </p>
        </div>
      </div>
    </Card>
  )
}
