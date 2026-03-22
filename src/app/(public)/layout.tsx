import Link from 'next/link'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-30 border-b border-text-muted/10 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center px-4">
          <Link href="/" className="text-2xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>
            ねこ飯
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}
