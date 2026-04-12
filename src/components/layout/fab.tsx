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

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { CatEatingIcon } from '@/components/ui/icons'

export function FAB() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const catId = searchParams.get('cat')

  // /log と /log/[id]/edit では非表示
  if (pathname?.startsWith('/log')) return null

  return (
    <Link
      href={catId ? `/log?cat=${catId}` : '/log'}
      className="fixed bottom-20 right-4 z-50 flex items-center gap-1 rounded-full bg-accent px-4 h-11 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 mb-[env(safe-area-inset-bottom)]"
      aria-label="給餌記録を追加"
    >
      <CatEatingIcon className="text-white" size={20} />
      <span className="text-xs font-bold">ごはんを記録</span>
    </Link>
  )
}
