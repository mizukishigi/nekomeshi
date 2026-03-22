'use client'

import { useCallback, useState } from 'react'
import { FoodSearchBar } from '@/components/food/food-search-bar'
import { FoodSearchResults } from '@/components/food/food-search-results'
import { searchFoods } from '@/actions/foods'
import type { Food } from '@/actions/foods'

export default function FoodSearchPage() {
  const [results, setResults] = useState<Food[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true)
    try {
      const foods = await searchFoods(query)
      setResults(foods)
      setHasSearched(true)
    } catch {
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleSelect = useCallback(() => {
    // For now, navigate back (will be used in feeding log form)
    window.history.back()
  }, [])

  return (
    <main className="px-4 py-4">
      <FoodSearchBar onSearch={handleSearch} isLoading={isLoading} />
      {hasSearched && (
        <FoodSearchResults results={results} onSelect={handleSelect} />
      )}
    </main>
  )
}
