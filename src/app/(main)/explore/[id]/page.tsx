import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { PawIcon } from '@/components/ui/icons'
import { FOOD_TYPE_LABELS, TARGET_AGE_LABELS, APPETITE_LABELS, STOOL_LABELS } from '@/lib/constants'
import { getFood, getPublicFoodStats } from '@/actions/foods'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const food = await getFood(id)
  if (!food) return { title: 'フード詳細' }

  const title = `${food.brand} ${food.product_name}`
  const description = `${food.brand} ${food.product_name}の評価・レビュー。食いつきや健康への影響をチェック。`

  return {
    title,
    description,
    alternates: {
      canonical: `/explore/${id}`,
    },
    openGraph: {
      title: `${title} | ねこ飯`,
      description,
    },
  }
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

export default async function ExploreFoodDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const food = await getFood(id)

  if (!food) {
    notFound()
  }

  const stats = await getPublicFoodStats(id)

  const typeLabel = FOOD_TYPE_LABELS[food.type]
  const ageLabel = TARGET_AGE_LABELS[food.target_age]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: `${food.brand} ${food.product_name}`,
            brand: { '@type': 'Brand', name: food.brand },
            category: 'キャットフード',
            description: `${food.brand} ${food.product_name} - ${typeLabel} / ${ageLabel}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://nekomeshi.app/' },
              { '@type': 'ListItem', position: 2, name: 'フードを探す', item: 'https://nekomeshi.app/explore' },
              { '@type': 'ListItem', position: 3, name: `${food.brand} ${food.product_name}` },
            ],
          }),
        }}
      />
      <main className="px-4 py-4 space-y-4">
        {/* Food info card */}
        <Card>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-muted">{food.brand}</p>
              <h1 className="mt-0.5 text-lg font-bold text-text">
                {food.product_name}
              </h1>
            </div>
            <Badge variant={food.type as 'dry' | 'wet' | 'treat'}>
              {FOOD_TYPE_LABELS[food.type]}
            </Badge>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <p className="text-[10px] text-text-muted">対象年齢</p>
              <p className="text-sm font-semibold text-text">
                {TARGET_AGE_LABELS[food.target_age]}
              </p>
            </div>
            {food.calories_per_100g && (
              <div>
                <p className="text-[10px] text-text-muted">カロリー</p>
                <p className="text-sm font-semibold text-text">
                  {food.calories_per_100g}kcal/100g
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Aggregate stats card */}
        <Card>
          <h2 className="text-base font-bold text-text mb-3">
            みんなの記録
          </h2>

          {stats.totalRecords === 0 ? (
            <div className="py-6 text-center space-y-3">
              <p className="text-sm text-text-muted">
                まだ記録がありません
              </p>
              <p className="text-xs text-text-muted">
                このごはんをあげたことがある方は、ぜひ記録してみてください
              </p>
              <a
                href="/log"
                className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white"
              >
                ごはんを記録する
              </a>
            </div>
          ) : (
            <>
              <div className="mb-3 flex gap-4">
                <div className="flex-1 rounded-xl bg-primary/5 p-3 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stats.totalRecords}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">記録数</p>
                </div>
                <div className="flex-1 rounded-xl bg-primary/5 p-3 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {stats.totalCats}
                  </p>
                  <p className="text-[10px] text-text-muted mt-0.5">匹の猫</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <div>
                  <p className="text-[10px] text-text-muted">平均食いつき</p>
                  {stats.avgAppetite !== null ? (
                    <div className="mt-0.5">
                      <p className="text-sm font-semibold text-text flex items-center gap-0.5 flex-wrap">
                        {Array.from(
                          { length: Math.round(stats.avgAppetite) },
                          (_, i) => (
                            <span key={i} className="text-primary">
                              <PawIcon size={14} />
                            </span>
                          )
                        )}
                      </p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {stats.avgAppetite.toFixed(1)} -{' '}
                        {getAppetiteLabel(stats.avgAppetite)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-text-muted">--</p>
                  )}
                </div>

                <div>
                  <p className="text-[10px] text-text-muted">平均うんち</p>
                  {stats.avgStool !== null ? (
                    <p className="text-sm font-semibold text-text mt-0.5">
                      {stats.avgStool.toFixed(1)}{' '}
                      <span className="text-xs font-normal text-text-muted">
                        - {getStoolLabel(stats.avgStool)}
                      </span>
                    </p>
                  ) : (
                    <p className="text-sm text-text-muted">--</p>
                  )}
                </div>

                <div>
                  <p className="text-[10px] text-text-muted">嘔吐率</p>
                  <p className="text-sm font-semibold text-text mt-0.5">
                    {stats.vomitRate}%
                    {stats.vomitCount > 0 && (
                      <span className="text-xs font-normal text-text-muted">
                        {' '}
                        ({stats.vomitCount}/{stats.totalRecords})
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </>
          )}
        </Card>

        {/* Breed distribution card */}
        {stats.breedDistribution.length > 0 && (
          <Card>
            <h2 className="text-base font-bold text-text mb-3">
              食べている猫の品種
            </h2>
            <div className="space-y-2">
              {stats.breedDistribution.map(({ breed, count }) => (
                <div
                  key={breed}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-text">{breed}</span>
                  <span className="text-text-muted">{count}匹</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>
    </>
  )
}
