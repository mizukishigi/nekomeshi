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
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { CatFoodIcon, CatEatingIcon } from '@/components/ui/icons'

function ExploreTabIcon() {
  return (
    <span className="flex items-center justify-center h-6 w-10 -mb-0.5">
      <CatFoodIcon size={32} />
    </span>
  )
}

function MyCatTabIcon() {
  return (
    <span className="flex items-center justify-center h-6 w-10 -mb-1">
      <CatEatingIcon size={34} />
    </span>
  )
}

function SettingsIcon() {
  return (
    <svg className="h-6 w-6 -mb-0.5" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd">
      <path d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.448 7.448 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.448 7.448 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  )
}

const tabs = [
  { href: '/explore', label: 'ごはんを探す', icon: ExploreTabIcon },
  { href: '/mycat', label: 'うちの子', icon: MyCatTabIcon },
  { href: '/settings', label: '設定', icon: SettingsIcon },
]

export function BottomTabBar() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-text-muted/10 bg-surface pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center">
        {tabs.map((tab) => {
          const isActive = pathname?.startsWith(tab.href) ?? false
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs transition-colors',
                isActive ? 'text-primary' : 'text-text-muted'
              )}
            >
              <tab.icon />
              <span className="font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
