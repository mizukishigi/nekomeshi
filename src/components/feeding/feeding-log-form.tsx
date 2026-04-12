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

import { useActionState, useCallback, useEffect, useState } from 'react'
import { createFeedingLog, updateFeedingLog } from '@/actions/feeding-logs'
import type { FeedingLogWithFood } from '@/actions/feeding-logs'
import { searchFoods, getSonotaFood, type Food } from '@/actions/foods'
import type { Cat } from '@/actions/cats'
import { AmountPresets } from './amount-presets'
import { AppetiteRating } from './appetite-rating'
import { StoolRating } from './stool-rating'
import { FoodSearchBar } from '@/components/food/food-search-bar'
import { FoodSearchResults } from '@/components/food/food-search-results'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FOOD_TYPE_LABELS } from '@/lib/constants'

interface TemplateDefaults {
  food: { id: string; brand: string; product_name: string; type: string }
  amount_g: number
}

interface FeedingLogFormProps {
  cats: Cat[]
  defaultCatId?: string
  templateDefaults?: TemplateDefaults | null
  editLog?: FeedingLogWithFood
}

export function FeedingLogForm({ cats, defaultCatId, templateDefaults, editLog }: FeedingLogFormProps) {
  const isEditMode = !!editLog

  const updateAction = editLog
    ? updateFeedingLog.bind(null, editLog.id)
    : null

  const [state, formAction, isPending] = useActionState<{ error: string; success?: boolean } | null, FormData>(
    isEditMode ? updateAction! : createFeedingLog,
    null
  )

  const initialFood: Food | null = editLog
    ? {
        id: editLog.food_id,
        brand: editLog.foods.brand,
        product_name: editLog.foods.product_name,
        type: editLog.foods.type as Food['type'],
        target_age: 'all_ages',
        calories_per_100g: editLog.foods.calories_per_100g,
        created_by: '',
        created_at: '',
      }
    : templateDefaults
      ? {
          id: templateDefaults.food.id,
          brand: templateDefaults.food.brand,
          product_name: templateDefaults.food.product_name,
          type: templateDefaults.food.type as Food['type'],
          target_age: 'all_ages',
          calories_per_100g: null,
          created_by: '',
          created_at: '',
        }
      : null

  const [selectedCatId, setSelectedCatId] = useState(editLog?.cat_id || defaultCatId || cats[0]?.id || '')
  const [selectedFood, setSelectedFood] = useState<Food | null>(initialFood)
  const [amount, setAmount] = useState<number | null>(editLog?.amount_g ?? templateDefaults?.amount_g ?? null)
  const [appetiteRating, setAppetiteRating] = useState<number | null>(editLog?.appetite_rating ?? null)
  const [stoolCondition, setStoolCondition] = useState<number | null>(editLog?.stool_condition ?? null)
  const [hasVomited, setHasVomited] = useState(editLog?.has_vomited ?? false)
  const [memo, setMemo] = useState(editLog?.memo ?? '')
  const [fedAt, setFedAt] = useState(() => {
    if (editLog) {
      const d = new Date(editLog.fed_at)
      const offset = d.getTimezoneOffset()
      const local = new Date(d.getTime() - offset * 60 * 1000)
      return local.toISOString().slice(0, 16)
    }
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const local = new Date(now.getTime() - offset * 60 * 1000)
    return local.toISOString().slice(0, 16)
  })

  // Food search state
  const [foodResults, setFoodResults] = useState<Food[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showFoodSearch, setShowFoodSearch] = useState(!templateDefaults && !editLog)
  const [sonotaFood, setSonotaFood] = useState<Food | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  // Fetch the その他 food entry on mount
  useEffect(() => {
    getSonotaFood().then(setSonotaFood)
  }, [])

  const isSonotaSelected = selectedFood?.brand === 'その他'

  const handleFoodSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setFoodResults([])
      setHasSearched(false)
      return
    }
    setIsSearching(true)
    try {
      const results = await searchFoods(query)
      setFoodResults(results)
      setHasSearched(true)
    } catch {
      // silently handle
    } finally {
      setIsSearching(false)
    }
  }, [])

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food)
    setShowFoodSearch(false)
  }

  const handleClearFood = () => {
    setSelectedFood(null)
    setShowFoodSearch(true)
    setFoodResults([])
  }

  const isSuccess = state?.success === true

  if (isSuccess) {
    return (
      <div className="rounded-2xl bg-surface p-8 text-center shadow-sm">
        <p className="text-lg font-bold text-text mb-2">記録しました！</p>
        <Button
          type="button"
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          もう一件記録する
        </Button>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Hidden fields */}
      <input type="hidden" name="cat_id" value={selectedCatId} />
      <input type="hidden" name="food_id" value={selectedFood?.id ?? ''} />
      <input type="hidden" name="fed_at" value={fedAt ? new Date(fedAt).toISOString() : ''} />

      {/* Cat selector */}
      {cats.length > 1 && (
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">猫を選択</label>
          <div className="flex gap-3 overflow-x-auto py-1">
            {cats.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCatId(cat.id)
                  // Reload page to update template for selected cat
                  window.location.href = `/log?cat_id=${cat.id}`
                }}
                className={`flex flex-col items-center gap-1 min-w-[56px] ${
                  selectedCatId === cat.id ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className={`rounded-full ${selectedCatId === cat.id ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                  <Avatar alt={cat.name} src={cat.photo_url} size="md" />
                </div>
                <span className={`text-xs truncate max-w-[56px] ${
                  selectedCatId === cat.id ? 'text-primary font-bold' : 'text-text-muted'
                }`}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Food selector */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">ごはん <span className="text-error">*</span></label>
        {selectedFood ? (
          <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary/5 px-4 py-3">
            <div className="min-w-0 flex-1">
              <p className="text-xs text-text-muted">{selectedFood.brand}</p>
              <p className="truncate font-medium text-text">{selectedFood.product_name}</p>
              <span className="text-xs text-text-muted">
                {FOOD_TYPE_LABELS[selectedFood.type]}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearFood}
              className="shrink-0 rounded-lg p-1 text-text-muted hover:bg-text-muted/10"
              aria-label="ごはんを変更"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        ) : (
          showFoodSearch && (
            <div>
              <FoodSearchBar onSearch={handleFoodSearch} isLoading={isSearching} />
              <FoodSearchResults
                results={foodResults}
                onSelect={handleFoodSelect}
                sonotaFood={hasSearched ? sonotaFood : null}
              />
            </div>
          )
        )}
      </div>

      {/* Food name input for その他 */}
      {isSonotaSelected && (
        <div className="w-full">
          <label htmlFor="sonota_food_name" className="mb-1.5 block text-sm font-medium text-text">
            ごはん名 <span className="text-error">*</span>
          </label>
          <input
            id="sonota_food_name"
            name="memo_food_name"
            type="text"
            required
            placeholder="ごはん名を入力してください"
            className="w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          />
        </div>
      )}

      {/* Amount */}
      <AmountPresets value={amount} onChange={setAmount} />

      {/* Date/time */}
      <Input
        label="日時"
        type="datetime-local"
        value={fedAt}
        onChange={(e) => setFedAt(e.target.value)}
      />

      {/* Appetite rating */}
      <AppetiteRating value={appetiteRating} onChange={setAppetiteRating} />

      {/* Stool rating */}
      <StoolRating value={stoolCondition} onChange={setStoolCondition} />

      {/* Vomiting checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="has_vomited"
          name="has_vomited"
          checked={hasVomited}
          onChange={(e) => setHasVomited(e.target.checked)}
          className="h-5 w-5 rounded border-text-muted/30 text-primary accent-primary"
        />
        <label htmlFor="has_vomited" className="text-sm font-medium text-text">
          嘔吐あり
        </label>
      </div>

      {/* Memo */}
      <div className="w-full">
        <label htmlFor="memo" className="mb-1.5 block text-sm font-medium text-text">
          メモ
        </label>
        <textarea
          id="memo"
          name="memo"
          rows={2}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder={isSonotaSelected ? 'その他メモ' : '気になったことなど'}
          className="w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors resize-none"
        />
      </div>

      {/* Error message */}
      {state?.error && (
        <p className="text-sm text-error text-center">{state.error}</p>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        isLoading={isPending}
        disabled={!selectedFood || !amount || appetiteRating === null}
      >
        {isEditMode ? '更新する' : '記録する'}
      </Button>
    </form>
  )
}
