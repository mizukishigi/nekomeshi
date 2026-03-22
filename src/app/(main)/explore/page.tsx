import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ExploreSearchBar } from '@/components/explore/explore-search-bar'
import { FOOD_TYPE_LABELS, TARGET_AGE_LABELS } from '@/lib/constants'
import { getAllFoodsPublic, type Food } from '@/actions/foods'

export const metadata: Metadata = {
  title: 'キャットフードを探す',
  description: 'みんなの記録から、うちの子に合うキャットフードを探そう。ドライ・ウェット・おやつ、子猫からシニアまで200種以上のフードを比較。',
}

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; age?: string }>
}) {
  const params = await searchParams
  const query = params.q || ''
  const typeFilter = params.type || ''
  const ageFilter = params.age || ''

  const hasFilter = !!query || !!typeFilter || !!ageFilter

  let foods: Food[] = []
  if (hasFilter) {
    const allFoods = await getAllFoodsPublic(query)
    foods = allFoods.filter((f) => f.brand !== 'その他')
    if (typeFilter && ['dry', 'wet', 'treat'].includes(typeFilter)) {
      foods = foods.filter((f) => f.type === typeFilter)
    }
    if (ageFilter && ['kitten', 'adult', 'senior', 'all_ages'].includes(ageFilter)) {
      foods = foods.filter((f) => f.target_age === ageFilter)
    }
  }

  const typeFilters = [
    { key: '', label: 'すべて' },
    { key: 'dry', label: 'ドライ' },
    { key: 'wet', label: 'ウェット' },
    { key: 'treat', label: 'おやつ' },
  ]

  const ageFilters = [
    { key: '', label: 'すべて' },
    { key: 'kitten', label: '子猫' },
    { key: 'adult', label: '成猫' },
    { key: 'senior', label: 'シニア' },
    { key: 'all_ages', label: '全年齢' },
  ]

  const buildFilterUrl = (overrides: { type?: string; age?: string }) => {
    const p = new URLSearchParams()
    if (query) p.set('q', query)
    const t = overrides.type ?? typeFilter
    const a = overrides.age ?? ageFilter
    if (t) p.set('type', t)
    if (a) p.set('age', a)
    const qs = p.toString()
    return `/explore${qs ? `?${qs}` : ''}`
  }

  return (
    <>
      <main className="px-4 py-4">
        <p className="text-center text-base font-bold text-text mb-3">
          みんなの記録から、うちの子に合うごはんを探そう
        </p>

        <ExploreSearchBar initialQuery={query} />

        <div className="mt-3 space-y-2">
          <div className="flex gap-2">
            <span className="text-xs text-text-muted py-1 w-10 shrink-0">種類</span>
            {typeFilters.map((f) => (
              <Link
                key={f.key}
                href={buildFilterUrl({ type: f.key })}
                style={{ minHeight: 0 }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  typeFilter === f.key
                    ? 'bg-primary text-white'
                    : 'bg-text-muted/10 text-text-muted hover:bg-text-muted/20'
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <span className="text-xs text-text-muted py-1 w-10 shrink-0">年齢</span>
            {ageFilters.map((f) => (
              <Link
                key={f.key}
                href={buildFilterUrl({ age: f.key })}
                style={{ minHeight: 0 }}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  ageFilter === f.key
                    ? 'bg-primary text-white'
                    : 'bg-text-muted/10 text-text-muted hover:bg-text-muted/20'
                }`}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>

        {!hasFilter ? (
          <div className="mt-8 text-center text-text-muted">
            <p className="text-sm">キーワードやフィルターで</p>
            <p className="text-sm">ごはんを検索してみましょう</p>
          </div>
        ) : foods.length === 0 ? (
          <div className="rounded-2xl bg-surface p-8 text-center shadow-sm mt-3">
            <p className="text-sm text-text-muted">
              該当するごはんが見つかりません
            </p>
          </div>
        ) : (
          <>
          <p className="mb-2 mt-3 text-xs text-text-muted">
            {foods.length}件のごはん
          </p>
          <div className="grid gap-3">
            {foods.map((food) => (
              <Link key={food.id} href={`/explore/${food.id}`} className="min-w-0">
                <Card className="active:scale-[0.98] transition-transform min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-text-muted">{food.brand}</p>
                      <p className="mt-0.5 text-base font-bold text-text truncate">
                        {food.product_name}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <Badge variant={food.type as 'dry' | 'wet' | 'treat'}>
                        {FOOD_TYPE_LABELS[food.type]}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-text-muted">
                    <span>
                      {TARGET_AGE_LABELS[food.target_age]}
                    </span>
                    {food.calories_per_100g && (
                      <span>{food.calories_per_100g}kcal/100g</span>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          </>
        )}
      </main>
    </>
  )
}
