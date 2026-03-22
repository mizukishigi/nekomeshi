'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type Cat = {
  id: string
  profile_id: string
  name: string
  breed: string | null
  birthday: string | null
  weight_kg: number | null
  sex: 'male' | 'female' | 'unknown' | null
  is_neutered: boolean
  allergies: string | null
  conditions: string | null
  photo_url: string | null
  created_at: string
  updated_at: string
}

export async function getCats(profileId: string): Promise<Cat[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data as Cat[]
}

export async function getCat(catId: string): Promise<Cat | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cats')
    .select('*')
    .eq('id', catId)
    .single()

  if (error) {
    return null
  }

  return data as Cat
}

export async function createCat(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  const name = formData.get('name') as string
  if (!name || name.trim() === '') {
    return { error: '名前は必須です' }
  }

  const weightStr = formData.get('weight_kg') as string
  const weight_kg = weightStr ? parseFloat(weightStr) : null

  const { error } = await supabase.from('cats').insert({
    profile_id: user.id,
    name: name.trim(),
    breed: (formData.get('breed') as string)?.trim() || null,
    birthday: (formData.get('birthday') as string) || null,
    weight_kg,
    sex: (formData.get('sex') as string) || null,
    is_neutered: formData.get('is_neutered') === 'on',
    allergies: (formData.get('allergies') as string)?.trim() || null,
    conditions: (formData.get('conditions') as string)?.trim() || null,
    photo_url: (formData.get('photo_url') as string) || null,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  redirect('/')
}

export async function updateCat(
  catId: string,
  _prevState: { error: string } | null,
  formData: FormData
) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  const name = formData.get('name') as string
  if (!name || name.trim() === '') {
    return { error: '名前は必須です' }
  }

  const weightStr = formData.get('weight_kg') as string
  const weight_kg = weightStr ? parseFloat(weightStr) : null

  const { error } = await supabase
    .from('cats')
    .update({
      name: name.trim(),
      breed: (formData.get('breed') as string)?.trim() || null,
      birthday: (formData.get('birthday') as string) || null,
      weight_kg,
      sex: (formData.get('sex') as string) || null,
      is_neutered: formData.get('is_neutered') === 'on',
      allergies: (formData.get('allergies') as string)?.trim() || null,
      conditions: (formData.get('conditions') as string)?.trim() || null,
      photo_url: (formData.get('photo_url') as string) || null,
    })
    .eq('id', catId)
    .eq('profile_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/cats/${catId}`)
  redirect(`/cats/${catId}`)
}

export async function deleteCat(catId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: '認証されていません' }
  }

  const { error } = await supabase
    .from('cats')
    .delete()
    .eq('id', catId)
    .eq('profile_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  redirect('/')
}
