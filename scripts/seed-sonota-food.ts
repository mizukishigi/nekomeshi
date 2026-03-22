/**
 * One-off script to insert the "その他" food entry into the live DB.
 *
 * Usage:
 *   npx tsx scripts/seed-sonota-food.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(url, key)

  const { data, error } = await supabase
    .from('foods')
    .upsert(
      {
        brand: 'その他',
        product_name: 'その他のフード',
        type: 'dry',
        target_age: 'all_ages',
        calories_per_100g: null,
        is_seed: true,
      },
      { onConflict: 'brand,product_name' }
    )
    .select()

  if (error) {
    console.error('Error inserting:', error.message)
    process.exit(1)
  }

  console.log('Inserted/updated "その他" food:', data)
}

main()
