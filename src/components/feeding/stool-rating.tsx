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

import { cn } from '@/lib/utils'
import { STOOL_LABELS } from '@/lib/constants'

interface StoolRatingProps {
  value: number | null
  onChange: (value: number | null) => void
}

export function StoolRating({ value, onChange }: StoolRatingProps) {
  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-text">便の状態</label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(value === rating ? null : rating)}
            className={cn(
              'flex-1 rounded-xl py-2 text-center text-xs font-medium transition-colors',
              value === rating
                ? 'bg-primary text-white'
                : 'bg-text-muted/10 text-text-muted hover:bg-text-muted/20'
            )}
          >
            {STOOL_LABELS[rating - 1]}
          </button>
        ))}
      </div>
      <input type="hidden" name="stool_condition" value={value ?? ''} />
    </div>
  )
}
