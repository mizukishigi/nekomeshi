'use client'

import { cn } from '@/lib/utils'
import { InputHTMLAttributes, Ref } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  ref?: Ref<HTMLInputElement>
}

export function Input({ className, label, error, id, ref, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={cn(
          'w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5',
          'text-text placeholder:text-text-muted/50',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'transition-colors duration-200',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}
