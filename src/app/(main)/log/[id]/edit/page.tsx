import { createClient } from '@/lib/supabase/server'
import { getCats } from '@/actions/cats'
import { getFeedingLog } from '@/actions/feeding-logs'
import { Header } from '@/components/layout/header'
import { FeedingLogForm } from '@/components/feeding/feeding-log-form'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default async function FeedingLogEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const log = await getFeedingLog(id)

  if (!log) {
    notFound()
  }

  // Verify the log belongs to the current user
  const cats = await getCats(user.id)
  const userCatIds = cats.map((cat) => cat.id)

  if (!userCatIds.includes(log.cat_id)) {
    notFound()
  }

  return (
    <>
      <Header title="記録を編集" />
      <main className="px-4 py-4">
        <FeedingLogForm
          cats={cats}
          defaultCatId={log.cat_id}
          editLog={log}
        />
      </main>
    </>
  )
}
