import { Header } from '@/components/layout/header'
import { CatForm } from '@/components/cat/cat-form'

export default function NewCatPage() {
  return (
    <>
      <Header title="猫を登録" />
      <main className="px-4 py-4">
        <CatForm />
      </main>
    </>
  )
}
