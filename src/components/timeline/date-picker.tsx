'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

const DAY_NAMES = ['日', '月', '火', '水', '木', '金', '土'] as const

function formatJapaneseDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  const month = d.getMonth() + 1
  const day = d.getDate()
  const dayOfWeek = DAY_NAMES[d.getDay()]
  return `${month}月${day}日（${dayOfWeek}）`
}

function toDateString(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getTodayString(): string {
  return toDateString(new Date())
}

interface DatePickerProps {
  currentDate: string
}

export function DatePicker({ currentDate }: DatePickerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const today = getTodayString()
  const isToday = currentDate === today

  const navigateDate = (offset: number) => {
    const d = new Date(currentDate + 'T00:00:00')
    d.setDate(d.getDate() + offset)
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('date', toDateString(d))
    router.push(`?${params.toString()}`, { scroll: false })
  }

  const goToToday = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? '')
    params.set('date', today)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigateDate(-1)}
          aria-label="前の日"
        >
          &lt;
        </Button>
        <span className="min-w-[8rem] text-center text-base font-bold text-text">
          {formatJapaneseDate(currentDate)}
        </span>
        {!isToday && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateDate(1)}
            aria-label="次の日"
          >
            &gt;
          </Button>
        )}
      </div>

      {!isToday && (
        <Button variant="outline" size="sm" onClick={goToToday}>
          今日
        </Button>
      )}
    </div>
  )
}
