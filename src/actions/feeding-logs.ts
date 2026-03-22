'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import type { Food } from '@/actions/foods'

export type FeedingLog = {
  id: string
  cat_id: string
  food_id: string
  fed_at: string
  amount_g: number
  appetite_rating: number | null
  stool_condition: number | null
  has_vomited: boolean
  memo: string | null
  created_at: string
  updated_at: string
}

export type FeedingLogWithFood = FeedingLog & {
  foods: Pick<Food, 'brand' | 'product_name' | 'type' | 'calories_per_100g'>
}

export async function createFeedingLog(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  const cat_id = formData.get('cat_id') as string
  const food_id = formData.get('food_id') as string
  const amount_g_str = formData.get('amount_g') as string
  const fed_at = (formData.get('fed_at') as string) || new Date().toISOString()
  const appetite_rating_str = formData.get('appetite_rating') as string
  const stool_condition_str = formData.get('stool_condition') as string
  const has_vomited = formData.get('has_vomited') === 'on'
  const memoFoodName = (formData.get('memo_food_name') as string)?.trim() || null
  const memoRaw = (formData.get('memo') as string)?.trim() || null
  const memo = memoFoodName
    ? memoRaw ? `【${memoFoodName}】${memoRaw}` : `【${memoFoodName}】`
    : memoRaw

  if (!cat_id || !food_id) {
    return { error: '猫とフードを選択してください' }
  }

  const amount_g = parseFloat(amount_g_str)
  if (!amount_g || amount_g <= 0) {
    return { error: '量を入力してください' }
  }

  const appetite_rating = appetite_rating_str ? parseInt(appetite_rating_str) : null
  const stool_condition = stool_condition_str ? parseInt(stool_condition_str) : null

  const { error } = await supabase.from('feeding_logs').insert({
    cat_id,
    food_id,
    amount_g,
    fed_at,
    appetite_rating,
    stool_condition,
    has_vomited,
    memo,
  })

  if (error) {
    return { error: '記録の保存に失敗しました' }
  }

  revalidatePath('/')
  revalidatePath('/log')
  revalidatePath('/timeline')
  redirect('/')
}

export async function getFeedingLog(logId: string): Promise<FeedingLogWithFood | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('feeding_logs')
    .select('*, foods(brand, product_name, type, calories_per_100g)')
    .eq('id', logId)
    .single()

  if (error || !data) return null
  return data as FeedingLogWithFood
}

export async function updateFeedingLog(
  logId: string,
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  // Verify the log belongs to the current user's cat
  const { data: log } = await supabase
    .from('feeding_logs')
    .select('cat_id, cats!inner(profile_id)')
    .eq('id', logId)
    .single()

  if (!log) {
    return { error: '記録が見つかりません' }
  }

  const logData = log as unknown as { cat_id: string; cats: { profile_id: string } }
  if (logData.cats.profile_id !== user.id) {
    return { error: 'この記録を編集する権限がありません' }
  }

  const food_id = formData.get('food_id') as string
  const amount_g_str = formData.get('amount_g') as string
  const fed_at = (formData.get('fed_at') as string) || new Date().toISOString()
  const appetite_rating_str = formData.get('appetite_rating') as string
  const stool_condition_str = formData.get('stool_condition') as string
  const has_vomited = formData.get('has_vomited') === 'on'
  const memoFoodName = (formData.get('memo_food_name') as string)?.trim() || null
  const memoRaw = (formData.get('memo') as string)?.trim() || null
  const memo = memoFoodName
    ? memoRaw ? `【${memoFoodName}】${memoRaw}` : `【${memoFoodName}】`
    : memoRaw

  if (!food_id) {
    return { error: 'フードを選択してください' }
  }

  const amount_g = parseFloat(amount_g_str)
  if (!amount_g || amount_g <= 0) {
    return { error: '量を入力してください' }
  }

  const appetite_rating = appetite_rating_str ? parseInt(appetite_rating_str) : null
  const stool_condition = stool_condition_str ? parseInt(stool_condition_str) : null

  const { error } = await supabase
    .from('feeding_logs')
    .update({
      food_id,
      amount_g,
      fed_at,
      appetite_rating,
      stool_condition,
      has_vomited,
      memo,
    })
    .eq('id', logId)

  if (error) {
    return { error: '記録の更新に失敗しました' }
  }

  revalidatePath('/')
  revalidatePath('/log')
  revalidatePath('/timeline')
  revalidatePath('/mycat')
  redirect('/mycat')
}

export async function getRecentLogs(
  catId: string,
  limit: number = 10
): Promise<FeedingLogWithFood[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('feeding_logs')
    .select('*, foods(brand, product_name, type, calories_per_100g)')
    .eq('cat_id', catId)
    .order('fed_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data as FeedingLogWithFood[]
}

export async function getTodayLogs(catId: string): Promise<FeedingLogWithFood[]> {
  const supabase = await createClient()

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startOfDay = today.toISOString()

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const endOfDay = tomorrow.toISOString()

  const { data, error } = await supabase
    .from('feeding_logs')
    .select('*, foods(brand, product_name, type, calories_per_100g)')
    .eq('cat_id', catId)
    .gte('fed_at', startOfDay)
    .lt('fed_at', endOfDay)
    .order('fed_at', { ascending: false })

  if (error) throw error
  return data as FeedingLogWithFood[]
}

export async function getLogsByDateRange(
  catId: string,
  startDate: string,
  endDate: string
): Promise<FeedingLogWithFood[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('feeding_logs')
    .select('*, foods(brand, product_name, type, calories_per_100g)')
    .eq('cat_id', catId)
    .gte('fed_at', startDate)
    .lte('fed_at', endDate)
    .order('fed_at', { ascending: false })

  if (error) throw error
  return data as FeedingLogWithFood[]
}

export type FoodStat = {
  food_id: string
  brand: string
  product_name: string
  type: string
  avg_appetite: number | null
  avg_stool: number | null
  vomit_count: number
  total_logs: number
}

export async function getFoodStats(catId: string): Promise<FoodStat[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc('get_food_stats', {
    p_cat_id: catId,
  })

  if (error) {
    // Fallback: manual aggregation if RPC not available
    const { data: logs, error: logsError } = await supabase
      .from('feeding_logs')
      .select('food_id, appetite_rating, stool_condition, has_vomited, foods(brand, product_name, type, calories_per_100g)')
      .eq('cat_id', catId)

    if (logsError) throw logsError

    const statsMap = new Map<string, FoodStat>()
    for (const log of (logs as unknown as (FeedingLog & { foods: Pick<Food, 'brand' | 'product_name' | 'type'> })[])) {
      const existing = statsMap.get(log.food_id)
      if (!existing) {
        statsMap.set(log.food_id, {
          food_id: log.food_id,
          brand: log.foods.brand,
          product_name: log.foods.product_name,
          type: log.foods.type,
          avg_appetite: log.appetite_rating,
          avg_stool: log.stool_condition,
          vomit_count: log.has_vomited ? 1 : 0,
          total_logs: 1,
        })
      } else {
        existing.total_logs += 1
        if (log.has_vomited) existing.vomit_count += 1
        if (log.appetite_rating !== null) {
          existing.avg_appetite = existing.avg_appetite !== null
            ? (existing.avg_appetite * (existing.total_logs - 1) + log.appetite_rating) / existing.total_logs
            : log.appetite_rating
        }
        if (log.stool_condition !== null) {
          existing.avg_stool = existing.avg_stool !== null
            ? (existing.avg_stool * (existing.total_logs - 1) + log.stool_condition) / existing.total_logs
            : log.stool_condition
        }
      }
    }

    return Array.from(statsMap.values())
  }

  return data as FoodStat[]
}

export async function getLatestLogForTemplate(
  catId: string
): Promise<{ food_id: string; amount_g: number; food_name: string } | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('feeding_logs')
    .select('food_id, amount_g, foods(brand, product_name)')
    .eq('cat_id', catId)
    .order('fed_at', { ascending: false })
    .limit(1)
    .single()

  if (error || !data) return null

  const log = data as unknown as { food_id: string; amount_g: number; foods: { brand: string; product_name: string } }
  return {
    food_id: log.food_id,
    amount_g: log.amount_g,
    food_name: `${log.foods.brand} ${log.foods.product_name}`,
  }
}

export async function createFromTemplate(catId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  const template = await getLatestLogForTemplate(catId)
  if (!template) {
    return { error: 'まだ記録がありません' }
  }

  const { error } = await supabase.from('feeding_logs').insert({
    cat_id: catId,
    food_id: template.food_id,
    amount_g: template.amount_g,
    fed_at: new Date().toISOString(),
  })

  if (error) {
    return { error: '記録の保存に失敗しました' }
  }

  revalidatePath('/')
  revalidatePath('/log')
  return { error: '', success: true }
}
