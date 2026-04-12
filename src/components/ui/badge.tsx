import { cn } from '@/lib/utils'
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

type BadgeVariant = 'default' | 'dry' | 'wet' | 'treat'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-text-muted/10 text-text-muted',
  dry: 'bg-amber-100 text-amber-800',
  wet: 'bg-blue-100 text-blue-800',
  treat: 'bg-pink-100 text-pink-800',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
