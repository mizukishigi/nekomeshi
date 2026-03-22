import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { createClient } from '@/lib/supabase/server'
import { getCats } from '@/actions/cats'
import { getLatestLogForTemplate } from '@/actions/feeding-logs'
import { getFood } from '@/actions/foods'
import { FeedingLogForm } from '@/components/feeding/feeding-log-form'
import { TemplateButton } from '@/components/feeding/template-button'
import { CatSwitcher } from '@/components/cat/cat-switcher'
import { redirect } from 'next/navigation'
import { CatSittingIcon } from '@/components/ui/icons'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface LogPageProps {
  searchParams: Promise<{ template?: string; cat_id?: string }>
}

export default async function LogPage({ searchParams }: LogPageProps) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const cats = await getCats(user.id)

  if (cats.length === 0) {
    return (
      <>

        <main className="px-4 py-4">
          <Card className="p-8 text-center">
            <CardContent className="space-y-4 flex flex-col items-center">
              <CatSittingIcon className="text-text" size={64} />
              <p className="text-text font-bold text-lg">
                まずは猫ちゃんを登録しましょう
              </p>
              <p className="text-text-muted text-sm">
                猫のプロフィールを登録すると、ごはんの記録ができます
              </p>
              <Link href="/cats/new">
                <Button variant="primary" size="lg" className="mt-2">
                  猫を登録する
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </>
    )
  }

  const params = await searchParams
  const isTemplate = params.template === 'true'
  const defaultCatId = params.cat_id || cats[0].id
  const template = await getLatestLogForTemplate(defaultCatId)

  // If template=true, load the food details for pre-filling
  let templateDefaults: {
    food: { id: string; brand: string; product_name: string; type: string }
    amount_g: number
  } | null = null

  if (isTemplate && template) {
    const food = await getFood(template.food_id)
    if (food) {
      templateDefaults = {
        food: {
          id: food.id,
          brand: food.brand,
          product_name: food.product_name,
          type: food.type,
        },
        amount_g: template.amount_g,
      }
    }
  }

  return (
    <>
      <Header title="ごはんを記録" />
      <main className="px-4 py-4 space-y-4">
        {/* Cat switcher */}
        <CatSwitcher cats={cats} selectedCatId={defaultCatId} />

        {/* Template button */}
        <TemplateButton catId={defaultCatId} template={template} />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-text-muted/20" />
          <span className="text-xs text-text-muted">または詳しく記録</span>
          <div className="h-px flex-1 bg-text-muted/20" />
        </div>

        {/* Full form */}
        <FeedingLogForm
          cats={cats}
          defaultCatId={defaultCatId}
          templateDefaults={templateDefaults}
        />
      </main>
    </>
  )
}
