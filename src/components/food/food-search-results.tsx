'use client'

import { Badge } from '@/components/ui/badge'
import { FOOD_TYPE_LABELS, TARGET_AGE_LABELS } from '@/lib/constants'
import type { Food } from '@/actions/foods'

interface FoodSearchResultsProps {
  results: Food[]
  onSelect?: (food: Food) => void
  sonotaFood?: Food | null
}

export function FoodSearchResults({ results, onSelect, sonotaFood }: FoodSearchResultsProps) {
  // Filter out その他 from regular results to avoid duplication
  const filteredResults = results.filter((food) => food.brand !== 'その他')

  return (
    <div className="mt-3">
      {filteredResults.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">
          ごはんが見つかりませんでした
        </p>
      ) : (
        <ul className="divide-y divide-text-muted/10">
          {filteredResults.map((food) => (
            <li key={food.id}>
              <button
                type="button"
                onClick={() => onSelect?.(food)}
                className="flex w-full items-center gap-3 px-2 py-3 text-left transition-colors hover:bg-text-muted/5 active:bg-text-muted/10"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-text-muted">{food.brand}</p>
                  <p className="truncate font-medium text-text">{food.product_name}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge variant={food.type as 'dry' | 'wet' | 'treat'}>
                    {FOOD_TYPE_LABELS[food.type]}
                  </Badge>
                  <span className="text-xs text-text-muted">
                    {TARGET_AGE_LABELS[food.target_age]}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* その他 is always visible as a permanent option */}
      {sonotaFood && (
        <div className="mt-2 border-t border-text-muted/20 pt-2">
          <button
            type="button"
            onClick={() => onSelect?.(sonotaFood)}
            className="flex w-full items-center gap-3 px-2 py-3 text-left text-text-muted transition-colors hover:bg-text-muted/5 active:bg-text-muted/10"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-muted">上記にない場合</p>
              <p className="font-medium">その他のごはん</p>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
