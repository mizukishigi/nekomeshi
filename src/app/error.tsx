'use client'

export default function Error() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-text">エラーが発生しました</h1>
      <p className="mt-2 text-text-muted">もう一度お試しください</p>
    </div>
  )
}
