import { BottomTabBar } from '@/components/layout/bottom-tab-bar'
import { FAB } from '@/components/layout/fab'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-dvh pb-36 overflow-x-hidden max-w-full">
      <header className="sticky top-0 z-30 border-b border-text-muted/10 bg-background/80 backdrop-blur-sm">
        <div className="flex h-12 items-center justify-center">
          <h1 className="text-xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            ねこ飯
          </h1>
        </div>
      </header>
      {children}
      <FAB />
      <BottomTabBar />
    </div>
  )
}
