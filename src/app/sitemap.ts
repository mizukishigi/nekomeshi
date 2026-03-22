import type { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://nekomeshi.app/', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://nekomeshi.app/explore', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]

  // Dynamic food pages
  const supabase = await createClient()
  const { data: foods } = await supabase
    .from('foods')
    .select('id')
    .neq('brand', 'その他')
    .order('brand', { ascending: true })

  const foodPages: MetadataRoute.Sitemap = (foods ?? []).map((food) => ({
    url: `https://nekomeshi.app/explore/${food.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...foodPages]
}
