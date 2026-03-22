'use client'

import { createCat, updateCat, type Cat } from '@/actions/cats'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { CatPhotoUpload } from '@/components/cat/cat-photo-upload'
import { CAT_BREEDS } from '@/lib/cat-breeds'
import { useActionState, useState } from 'react'

interface CatFormProps {
  cat?: Cat
}

const sexOptions = [
  { value: 'male', label: 'オス' },
  { value: 'female', label: 'メス' },
  { value: 'unknown', label: '不明' },
]

function BirthdayInput({ defaultValue }: { defaultValue: string }) {
  // Parse existing value: "2020", "2020-03", or "2020-03-15"
  const parts = defaultValue ? defaultValue.split('-') : []
  const [year, setYear] = useState(parts[0] || '')
  const [month, setMonth] = useState(parts[1] || '')
  const [day, setDay] = useState(parts[2] || '')

  // Build birthday as full DATE, defaulting month to 01 and day to 01
  const birthdayValue = year
    ? `${year}-${month || '01'}-${day || '01'}`
    : ''

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <div className="w-full">
      <label className="mb-1.5 block text-sm font-medium text-text">誕生日</label>
      <div className="flex gap-2">
        <select
          value={year}
          onChange={(e) => {
            setYear(e.target.value)
            if (!e.target.value) { setMonth(''); setDay('') }
          }}
          className="flex-1 rounded-xl border border-text-muted/30 bg-surface px-3 py-2.5 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">年</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>{y}年</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => {
            setMonth(e.target.value)
            if (!e.target.value) setDay('')
          }}
          disabled={!year}
          className="flex-1 rounded-xl border border-text-muted/30 bg-surface px-3 py-2.5 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-40"
        >
          <option value="">月</option>
          {months.map((m) => (
            <option key={m} value={String(m).padStart(2, '0')}>{m}月</option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          disabled={!month}
          className="flex-1 rounded-xl border border-text-muted/30 bg-surface px-3 py-2.5 text-text focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-40"
        >
          <option value="">日</option>
          {days.map((d) => (
            <option key={d} value={String(d).padStart(2, '0')}>{d}日</option>
          ))}
        </select>
      </div>
      <input type="hidden" name="birthday" value={birthdayValue} />
    </div>
  )
}

export function CatForm({ cat }: CatFormProps) {
  const action = cat
    ? updateCat.bind(null, cat.id)
    : createCat

  const [photoUrl, setPhotoUrl] = useState<string>(cat?.photo_url ?? '')

  const [state, formAction, isPending] = useActionState(
    async (_prevState: { error: string } | null, formData: FormData) => {
      const result = await action(_prevState, formData)
      return result ?? null
    },
    null
  )

  return (
    <form action={formAction} className="space-y-4">
      <CatPhotoUpload
        currentUrl={cat?.photo_url}
        catId={cat?.id}
        onChange={setPhotoUrl}
      />
      <input type="hidden" name="photo_url" value={photoUrl} />
      <Input
        id="name"
        name="name"
        type="text"
        label="名前"
        placeholder="ミケ"
        required
        defaultValue={cat?.name ?? ''}
      />
      <div className="w-full">
        <label htmlFor="breed" className="mb-1.5 block text-sm font-medium text-text">
          品種
        </label>
        <input
          id="breed"
          name="breed"
          list="breeds"
          placeholder="スコティッシュフォールド"
          defaultValue={cat?.breed ?? ''}
          className="w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
        <datalist id="breeds">
          {CAT_BREEDS.map((breed) => (
            <option key={breed} value={breed} />
          ))}
        </datalist>
      </div>
      <BirthdayInput defaultValue={cat?.birthday ?? ''} />
      <Input
        id="weight_kg"
        name="weight_kg"
        type="number"
        label="体重(kg)"
        placeholder="4.5"
        step="0.01"
        min="0"
        defaultValue={cat?.weight_kg?.toString() ?? ''}
      />
      <Select
        id="sex"
        name="sex"
        label="性別"
        options={sexOptions}
        placeholder="選択してください"
        defaultValue={cat?.sex ?? ''}
      />
      <div className="flex items-center gap-3">
        <input
          id="is_neutered"
          name="is_neutered"
          type="checkbox"
          defaultChecked={cat?.is_neutered ?? false}
          className="h-5 w-5 rounded border-text-muted/30 text-primary focus:ring-primary/20"
        />
        <label htmlFor="is_neutered" className="text-sm font-medium text-text">
          避妊・去勢済み
        </label>
      </div>
      <div className="w-full">
        <label htmlFor="allergies" className="mb-1.5 block text-sm font-medium text-text">
          アレルギー
        </label>
        <textarea
          id="allergies"
          name="allergies"
          rows={3}
          placeholder="例: チキン、穀物"
          defaultValue={cat?.allergies ?? ''}
          className="w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>
      <div className="w-full">
        <label htmlFor="conditions" className="mb-1.5 block text-sm font-medium text-text">
          持病・既往歴
        </label>
        <textarea
          id="conditions"
          name="conditions"
          rows={3}
          placeholder="例: 腎臓病"
          defaultValue={cat?.conditions ?? ''}
          className="w-full rounded-xl border border-text-muted/30 bg-surface px-4 py-2.5 text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-error">{state.error}</p>
      )}
      <Button type="submit" className="w-full" isLoading={isPending}>
        {cat ? '更新する' : '登録する'}
      </Button>
    </form>
  )
}
