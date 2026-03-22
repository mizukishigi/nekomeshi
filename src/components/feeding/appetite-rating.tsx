'use client'

import { cn } from '@/lib/utils'
import { APPETITE_LABELS } from '@/lib/constants'
import { PawIcon } from '@/components/ui/icons'
import { useState } from 'react'

interface AppetiteRatingProps {
  value: number | null
  onChange: (value: number | null) => void
}

export function AppetiteRating({ value, onChange }: AppetiteRatingProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const displayValue = hoveredIndex ?? value

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-text">食欲 <span className="text-error">*</span></label>
      <div className="flex justify-center gap-3">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(value === rating ? null : rating)}
            onMouseEnter={() => setHoveredIndex(rating)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-full transition-all',
              value !== null && rating <= value
                ? 'text-primary scale-110'
                : 'text-text-muted/30'
            )}
            aria-label={`食欲: ${APPETITE_LABELS[rating - 1]}`}
          >
            <PawIcon size={24} />
          </button>
        ))}
      </div>
      {displayValue !== null && (
        <p className="mt-1 text-center text-sm text-text-muted">
          {APPETITE_LABELS[(displayValue) - 1]}
        </p>
      )}
      <input type="hidden" name="appetite_rating" value={value ?? ''} />
    </div>
  )
}
