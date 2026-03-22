import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { FOOD_TYPE_LABELS, TARGET_AGE_LABELS } from '@/lib/constants'
import type { Food } from '@/actions/foods'

interface FoodCardProps {
  food: Food
}

export function FoodCard({ food }: FoodCardProps) {
  return (
    <Card>
      <p className="text-xs text-text-muted">{food.brand}</p>
      <p className="mt-0.5 text-base font-bold text-text">{food.product_name}</p>
      <div className="mt-2 flex items-center gap-2">
        <Badge variant={food.type as 'dry' | 'wet' | 'treat'}>
          {FOOD_TYPE_LABELS[food.type]}
        </Badge>
        <span className="text-xs text-text-muted">
          {TARGET_AGE_LABELS[food.target_age]}
        </span>
      </div>
      {food.calories_per_100g != null && (
        <p className="mt-2 text-xs text-text-muted">
          {food.calories_per_100g} kcal / 100g
        </p>
      )}
    </Card>
  )
}
