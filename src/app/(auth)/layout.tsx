export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary" style={{ fontFamily: 'var(--font-display)' }}>ねこ飯</h1>
        </div>
        {children}
      </div>
    </div>
  )
}
