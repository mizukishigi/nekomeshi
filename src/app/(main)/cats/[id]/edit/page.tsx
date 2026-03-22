import { getCat } from '@/actions/cats'
import { Header } from '@/components/layout/header'
import { CatForm } from '@/components/cat/cat-form'
import { notFound } from 'next/navigation'

export default async function CatEditPage({
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
    <>
      <Header title={`${cat.name}を編集`} />
      <main className="px-4 py-4">
        <CatForm cat={cat} />
      </main>
    </>
  )
}
