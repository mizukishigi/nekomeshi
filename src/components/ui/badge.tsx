import { cn } from '@/lib/utils'

// scenario-d: comment-only edit to verify dynamic-judge classifies as low
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
