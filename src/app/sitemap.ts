import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: 'https://nekomeshi.app/', lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: 'https://nekomeshi.app/explore', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://nekomeshi.app/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://nekomeshi.app/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

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
  } catch {
    return staticPages
  }
}
