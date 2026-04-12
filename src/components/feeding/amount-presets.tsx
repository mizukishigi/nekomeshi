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
import { AMOUNT_PRESETS } from '@/lib/constants'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

interface AmountPresetsProps {
  value: number | null
  onChange: (value: number | null) => void
}

export function AmountPresets({ value, onChange }: AmountPresetsProps) {
  const [isManual, setIsManual] = useState(false)
  const [manualValue, setManualValue] = useState('')

  const handlePresetClick = (preset: number) => {
    setIsManual(false)
    setManualValue('')
    onChange(preset)
  }

  const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setManualValue(val)
    setIsManual(true)
    const num = parseFloat(val)
    onChange(num > 0 ? num : null)
  }

  const handleManualFocus = () => {
    setIsManual(true)
    if (!manualValue) {
      onChange(null)
    }
  }

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-text">量 (g) <span className="text-error">*</span></label>
      <div className="flex gap-2 mb-2">
        {AMOUNT_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => handlePresetClick(preset)}
            className={cn(
              'flex-1 rounded-xl py-2.5 text-sm font-medium transition-colors',
              !isManual && value === preset
                ? 'bg-primary text-white'
                : 'bg-text-muted/10 text-text hover:bg-text-muted/20'
            )}
          >
            {preset}g
          </button>
        ))}
      </div>
      <Input
        type="number"
        inputMode="decimal"
        placeholder="その他の量を入力"
        value={isManual ? manualValue : ''}
        onChange={handleManualChange}
        onFocus={handleManualFocus}
        className={cn(
          isManual && 'border-primary ring-2 ring-primary/20'
        )}
      />
      <input type="hidden" name="amount_g" value={value ?? ''} />
    </div>
  )
}
