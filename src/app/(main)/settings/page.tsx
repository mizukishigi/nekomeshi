import { LogoutButton } from './logout-button'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <>
      <main className="px-4 py-4 space-y-3">
        <a href="https://forms.gle/rUafhPMXA2st3nGr8" target="_blank" rel="noopener noreferrer" className="block">
          <div className="rounded-2xl bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-text">お問い合わせ</h3>
              <span className="text-text-muted text-sm">›</span>
            </div>
          </div>
        </a>

        <div className="rounded-2xl bg-surface p-4 shadow-sm">
          <h3 className="font-medium text-text mb-2">アカウント</h3>
          <LogoutButton />
        </div>
      </main>
    </>
  )
}
