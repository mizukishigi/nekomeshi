import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-surface p-4 shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('mb-3', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3 className={cn('text-lg font-bold text-text', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}
