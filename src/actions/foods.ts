'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type Food = {
  id: string
  brand: string
  product_name: string
  type: 'dry' | 'wet' | 'treat'
  target_age: 'kitten' | 'adult' | 'senior' | 'all_ages'
  calories_per_100g: number | null
  created_by: string
  created_at: string
}

export async function searchFoods(query: string): Promise<Food[]> {
  const supabase = await createClient()

  if (!query.trim()) {
    const { data, error } = await supabase
      .from('foods')
      .select('*')
      .neq('brand', 'その他')
      .order('created_at', { ascending: false })
      .limit(20)

    if (error) throw error
    return data as Food[]
  }

  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .neq('brand', 'その他')
    .or(`brand.ilike.%${query}%,product_name.ilike.%${query}%`)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) throw error
  return data as Food[]
}

export async function getFood(foodId: string): Promise<Food | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('id', foodId)
    .single()

  if (error) return null
  return data as Food
}

export async function createFood(prevState: { error: string } | null, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'ログインが必要です' }
  }

  const brand = formData.get('brand') as string
  const productName = formData.get('product_name') as string
  const type = formData.get('type') as string
  const targetAge = formData.get('target_age') as string
  const caloriesRaw = formData.get('calories_per_100g') as string

  if (!brand || !productName || !type || !targetAge) {
    return { error: '必須項目を入力してください' }
  }

  const { error } = await supabase.from('foods').insert({
    brand,
    product_name: productName,
    type,
    target_age: targetAge,
    calories_per_100g: caloriesRaw ? parseFloat(caloriesRaw) : null,
    created_by: user.id,
  })

  if (error) {
    return { error: 'フードの登録に失敗しました' }
  }

  revalidatePath('/foods')
  redirect('/foods')
}

export async function getFoodsByIds(foodIds: string[]): Promise<Food[]> {
  if (foodIds.length === 0) return []

  const supabase = await createClient()

  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .in('id', foodIds)

  if (error) throw error
  return data as Food[]
}

export type PublicFoodStats = {
  totalRecords: number
  totalCats: number
  avgAppetite: number | null
  avgStool: number | null
  vomitRate: number
  vomitCount: number
  breedDistribution: { breed: string; count: number }[]
}

export async function getPublicFoodStats(foodId: string): Promise<PublicFoodStats> {
  const supabase = await createClient()

  // Use the SECURITY DEFINER RPC function (accessible with anon key)
  const { data, error } = await supabase.rpc('get_public_food_stats', {
    p_food_id: foodId,
  })

  if (error || !data) {
    return {
      totalRecords: 0,
      totalCats: 0,
      avgAppetite: null,
      avgStool: null,
      vomitRate: 0,
      vomitCount: 0,
      breedDistribution: [],
    }
  }

  const stats = data as {
    total_logs: number
    total_cats: number
    avg_appetite: number | null
    avg_stool: number | null
    vomit_count: number
    breed_distribution: { breed: string; count: number }[] | null
  }

  return {
    totalRecords: stats.total_logs || 0,
    totalCats: stats.total_cats || 0,
    avgAppetite: stats.avg_appetite,
    avgStool: stats.avg_stool,
    vomitRate: stats.total_logs > 0 ? Math.round(((stats.vomit_count || 0) / stats.total_logs) * 100) : 0,
    vomitCount: stats.vomit_count || 0,
    breedDistribution: stats.breed_distribution || [],
  }
}

export async function getSonotaFood(): Promise<Food | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('foods')
    .select('*')
    .eq('brand', 'その他')
    .eq('product_name', 'その他のフード')
    .single()

  if (error) return null
  return data as Food
}

export async function getAllFoodsPublic(query?: string): Promise<Food[]> {
  const supabase = await createClient()

  let q = supabase
    .from('foods')
    .select('*')
    .order('brand', { ascending: true })
    .order('product_name', { ascending: true })

  if (query?.trim()) {
    q = q.or(`brand.ilike.%${query}%,product_name.ilike.%${query}%`)
  }

  const { data, error } = await q
  if (error) throw error
  return data as Food[]
}
