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

import { Button } from '@/components/ui/button'

interface TemplateButtonProps {
  catId: string
  template: {
    food_name: string
    amount_g: number
  } | null
}

export function TemplateButton({ catId, template }: TemplateButtonProps) {
  if (!template) {
    return (
      <Button
        variant="outline"
        size="lg"
        className="w-full opacity-50 justify-start"
        disabled
      >
        <span>
          <span className="block font-bold text-left">いつもの</span>
          <span className="block text-xs font-normal text-text-muted text-left">
            まだ記録がありません
          </span>
        </span>
      </Button>
    )
  }

  const handleClick = () => {
    // Force full page navigation to trigger server re-render
    window.location.href = `/log?template=true&cat_id=${catId}`
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex w-full items-center justify-start font-medium transition-colors bg-primary text-white hover:bg-primary/90 active:bg-primary/80 px-6 py-3 text-lg rounded-2xl"
    >
      <span>
        <span className="block font-bold text-left">いつもの</span>
        <span className="block text-xs font-normal text-white/80 text-left">
          {template.food_name} / {template.amount_g}g
        </span>
      </span>
    </button>
  )
}
