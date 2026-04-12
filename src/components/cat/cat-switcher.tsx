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

import { Avatar } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import type { Cat } from '@/actions/cats'

interface CatSwitcherProps {
  cats: Cat[]
  selectedCatId?: string
}

export function CatSwitcher({ cats, selectedCatId }: CatSwitcherProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCatId = selectedCatId || searchParams?.get('cat') || cats[0]?.id

  useEffect(() => {
    if (cats.length > 0 && !searchParams?.get('cat')) {
      const params = new URLSearchParams(searchParams?.toString() ?? '')
      params.set('cat', cats[0].id)
      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [cats, searchParams, router])

  const handleSelect = (catId: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('cat', catId)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex gap-5 overflow-x-auto px-4 py-3 scrollbar-hide">
      {cats.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.id)}
          className="flex flex-col items-center gap-1 flex-shrink-0"
        >
          <div
            className={cn(
              'rounded-full transition-transform duration-200',
              currentCatId === cat.id
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-115'
                : 'opacity-50'
            )}
          >
            <Avatar
              src={cat.photo_url}
              alt={cat.name}
              size="md"
              fallback={cat.name.charAt(0)}
            />
          </div>
          <span
            className={cn(
              'text-xs truncate max-w-[3.5rem]',
              currentCatId === cat.id
                ? 'font-bold text-primary mt-1'
                : 'text-text-muted'
            )}
          >
            {cat.name}
          </span>
        </button>
      ))}
      <Link
        href="/cats/new"
        className="flex flex-col items-center gap-1 flex-shrink-0"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-text-muted/30 text-text-muted hover:border-primary hover:text-primary transition-colors">
          <span className="text-xl">+</span>
        </div>
        <span className="text-xs text-text-muted">追加</span>
      </Link>
    </div>
  )
}
