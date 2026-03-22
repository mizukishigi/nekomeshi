import { cn } from '@/lib/utils'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
  className?: string
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
}

export function Avatar({ src, alt, size = 'md', fallback, className }: AvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          'rounded-full object-cover',
          sizeStyles[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/20 font-bold text-primary',
        sizeStyles[size],
        className
      )}
    >
      {fallback || alt?.charAt(0) || '?'}
    </div>
  )
}
