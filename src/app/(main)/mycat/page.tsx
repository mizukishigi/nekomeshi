import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getCats } from '@/actions/cats'
import { getLogsByDateRange, getRecentLogs } from '@/actions/feeding-logs'
import { CatSwitcher } from '@/components/cat/cat-switcher'
import { FeedingLogCard } from '@/components/feeding/feeding-log-card'
import { DatePicker } from '@/components/timeline/date-picker'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CatEatingIcon, CatSittingIcon, PawIcon } from '@/components/ui/icons'
import { FOOD_TYPE_LABELS, APPETITE_LABELS } from '@/lib/constants'
import type { FeedingLogWithFood } from '@/actions/feeding-logs'

function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildFoodSummary(logs: FeedingLogWithFood[]) {
  const map = new Map<string, {
    food_id: string
    brand: string
    product_name: string
    type: string
    total_g: number
    count: number
    appetite_sum: number
    appetite_count: number
  }>()

  for (const log of logs) {
    const existing = map.get(log.food_id)
    if (existing) {
      existing.total_g += log.amount_g
      existing.count += 1
      if (log.appetite_rating !== null) {
        existing.appetite_sum += log.appetite_rating
        existing.appetite_count += 1
      }
    } else {
      map.set(log.food_id, {
        food_id: log.food_id,
        brand: log.foods.brand,
        product_name: log.foods.product_name,
        type: log.foods.type,
        total_g: log.amount_g,
        count: 1,
        appetite_sum: log.appetite_rating ?? 0,
        appetite_count: log.appetite_rating !== null ? 1 : 0,
      })
    }
  }

  return Array.from(map.values())
}

export default async function MyCatPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; date?: string }>
}) {
  const params = await searchParams

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const cats = await getCats(user.id)
  const selectedCatId = params.cat || cats[0]?.id

  // Date handling
  const today = toDateString(new Date())
  const selectedDate = params.date || today

  // Fetch logs for selected date
  const dayStart = new Date(selectedDate + 'T00:00:00')
  const dayEnd = new Date(selectedDate + 'T23:59:59')

  const dayLogs = selectedCatId
    ? await getLogsByDateRange(selectedCatId, dayStart.toISOString(), dayEnd.toISOString())
    : []

  // 食欲評価から実際に食べた割合を計算
  // 1=0%, 2=25%, 3=50%, 4=75%, 5=100%, 未入力=100%（完食扱い）
  const appetiteToRatio = (rating: number | null) => {
    if (rating === null) return 1
    return (rating - 1) / 4
  }

  const dayTotalGrams = Math.round(
    dayLogs.reduce((sum, log) => sum + log.amount_g * appetiteToRatio(log.appetite_rating), 0)
  )
  const dayTotalCalories = Math.round(
    dayLogs.reduce((sum, log) => {
      const cal = log.foods?.calories_per_100g
      const ratio = appetiteToRatio(log.appetite_rating)
      return sum + (cal ? (cal * log.amount_g * ratio) / 100 : 0)
    }, 0)
  )

  // All-time logs for food summary
  const allLogs = selectedCatId
    ? await getRecentLogs(selectedCatId, 1000)
    : []

  const foodSummary = buildFoodSummary(allLogs)

  return (
    <>
      <main className="px-4 py-4 space-y-5 pb-24">
        {cats.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent className="space-y-4 flex flex-col items-center">
              <CatSittingIcon className="text-text" size={64} />
              <p className="text-text font-bold text-lg">
                まずは猫ちゃんを登録しましょう
              </p>
              <p className="text-text-muted text-sm">
                猫のプロフィールを登録すると、ごはんの記録ができます
              </p>
              <Link href="/cats/new">
                <Button variant="primary" size="lg" className="mt-2">
                  猫を登録する
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Cat switcher + edit link */}
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0">
                <CatSwitcher cats={cats} selectedCatId={selectedCatId} />
              </div>
              {selectedCatId && (
                <Link
                  href={`/cats/${selectedCatId}/edit`}
                  className="text-xs text-primary hover:underline shrink-0 pb-1"
                >
                  プロフィール編集
                </Link>
              )}
            </div>

            {/* ごはんの記録 section */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-text">ごはんの記録</h2>
              <DatePicker currentDate={selectedDate} />

              {/* Day total card */}
              <Card>
                <CardContent className="flex items-center justify-around py-3">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {dayTotalGrams}<span className="text-sm font-normal text-text-muted ml-0.5">g</span>
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">合計量</p>
                  </div>
                  <div className="h-8 w-px bg-text-muted/20" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {dayTotalCalories}<span className="text-sm font-normal text-text-muted ml-0.5">kcal</span>
                    </p>
                    <p className="text-[10px] text-text-muted mt-0.5">合計カロリー</p>
                  </div>
                </CardContent>
              </Card>
              {dayLogs.length > 0 ? (
                dayLogs.map((log) => (
                  <FeedingLogCard key={log.id} log={log} />
                ))
              ) : (
                <Card className="py-8 text-center">
                  <p className="text-text-muted text-sm">記録がありません</p>
                </Card>
              )}
            </section>

            {/* All-time food summary */}
            {foodSummary.length > 0 && (
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-text">ごはんまとめ</h2>
                {foodSummary.map((food) => {
                  const avgAppetite = food.appetite_count > 0
                    ? food.appetite_sum / food.appetite_count
                    : null
                  return (
                    <Card key={food.food_id}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-text-muted">{food.brand}</p>
                          <p className="mt-0.5 text-sm font-bold text-text truncate">
                            {food.product_name}
                          </p>
                        </div>
                        <Badge variant={food.type as 'dry' | 'wet' | 'treat'}>
                          {FOOD_TYPE_LABELS[food.type as keyof typeof FOOD_TYPE_LABELS]}
                        </Badge>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-text-muted">
                        <span>{food.count}回</span>
                        <span>{food.total_g}g</span>
                        {avgAppetite !== null && (
                          <span className="flex items-center gap-0.5">
                            {Array.from({ length: Math.round(avgAppetite) }, (_, i) => (
                              <span key={i} className="text-primary"><PawIcon size={12} /></span>
                            ))}
                            <span className="ml-1">
                              {APPETITE_LABELS[Math.round(avgAppetite) - 1]}
                            </span>
                          </span>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}
