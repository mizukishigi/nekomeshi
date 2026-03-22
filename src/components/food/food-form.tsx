'use client'

import { useActionState } from 'react'
import { createFood } from '@/actions/foods'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { FOOD_TYPE_LABELS, TARGET_AGE_LABELS } from '@/lib/constants'

const typeOptions = Object.entries(FOOD_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

const targetAgeOptions = Object.entries(TARGET_AGE_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export function FoodForm() {
  const [state, formAction, isPending] = useActionState(createFood, null)

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
          {state.error}
        </div>
      )}

      <Input
        id="brand"
        name="brand"
        label="ブランド名"
        placeholder="例: ロイヤルカナン"
        required
      />

      <Input
        id="product_name"
        name="product_name"
        label="商品名"
        placeholder="例: インドア 成猫用"
        required
      />

      <Select
        id="type"
        name="type"
        label="タイプ"
        options={typeOptions}
        defaultValue="dry"
      />

      <Select
        id="target_age"
        name="target_age"
        label="対象年齢"
        options={targetAgeOptions}
        defaultValue="adult"
      />

      <Input
        id="calories_per_100g"
        name="calories_per_100g"
        label="カロリー (100gあたり)"
        type="number"
        placeholder="例: 375"
        min="0"
        step="0.1"
      />

      <Button type="submit" className="w-full" isLoading={isPending}>
        登録する
      </Button>
    </form>
  )
}
