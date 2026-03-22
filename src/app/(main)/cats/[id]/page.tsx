import { getCat } from '@/actions/cats'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import Link from 'next/link'
import { notFound } from 'next/navigation'

function formatSex(sex: string | null) {
  switch (sex) {
    case 'male': return 'オス'
    case 'female': return 'メス'
    case 'unknown': return '不明'
    default: return '未設定'
  }
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between py-2 border-b border-text-muted/10 last:border-0">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text">{value || '—'}</span>
    </div>
  )
}

export default async function CatProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cat = await getCat(id)

  if (!cat) {
    notFound()
  }

  return (
    <main className="px-4 py-4 space-y-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar
            src={cat.photo_url}
            alt={cat.name}
            size="lg"
            fallback={cat.name.charAt(0)}
          />
          <h2 className="text-xl font-bold text-text">{cat.name}</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoRow label="品種" value={cat.breed} />
            <InfoRow label="誕生日" value={cat.birthday} />
            <InfoRow label="体重" value={cat.weight_kg ? `${cat.weight_kg} kg` : null} />
            <InfoRow label="性別" value={formatSex(cat.sex)} />
            <InfoRow label="避妊・去勢済み" value={cat.is_neutered ? 'はい' : 'いいえ'} />
          </CardContent>
        </Card>

        {(cat.allergies || cat.conditions) && (
          <Card>
            <CardHeader>
              <CardTitle>健康情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {cat.allergies && (
                <div>
                  <p className="text-sm text-text-muted mb-1">アレルギー</p>
                  <p className="text-sm text-text">{cat.allergies}</p>
                </div>
              )}
              {cat.conditions && (
                <div>
                  <p className="text-sm text-text-muted mb-1">持病・既往歴</p>
                  <p className="text-sm text-text">{cat.conditions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Link
          href={`/cats/${cat.id}/edit`}
          className="block w-full rounded-xl bg-primary px-4 py-2.5 text-center font-medium text-white hover:bg-primary/90 transition-colors"
        >
          編集
        </Link>
      </main>
  )
}
