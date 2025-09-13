import axios from 'axios'
import type { MealDto } from '@/types/meal'
import { mapMealToDTO } from './recipeMapper'

const BASE = 'https://www.themealdb.com/api/json/v1/1'

export async function searchMeals(query: string): Promise<MealDto[]> {
  const { data } = await axios.get(`${BASE}/search.php?s=${encodeURIComponent(query)}`)
  return (data.meals ?? []).map(mapMealToDTO)
}

export async function lookupMeal(id: string): Promise<MealDto | null> {
  const { data } = await axios.get(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`)
  return data.meals?.length ? mapMealToDTO(data.meals[0]) : null
}

export async function randomMeal(): Promise<MealDto | null> {
  const { data } = await axios.get(`${BASE}/random.php`)
  return data.meals?.length ? mapMealToDTO(data.meals[0]) : null
}

export async function listCategories(): Promise<string[]> {
  const { data } = await axios.get(`${BASE}/list.php?c=list`)
  return (data.meals ?? []).map((c: any) => c.strCategory)
}

export async function listAreas(): Promise<string[]> {
  const { data } = await axios.get(`${BASE}/list.php?a=list`)
  return (data.meals ?? []).map((a: any) => a.strArea)
}

export async function filterByCategory(category: string): Promise<MealDto[]> {
  const { data } = await axios.get(`${BASE}/filter.php?c=${encodeURIComponent(category)}`)
  return (data.meals ?? []).map(mapMealToDTO)
}

export async function filterByArea(area: string): Promise<MealDto[]> {
  const { data } = await axios.get(`${BASE}/filter.php?a=${encodeURIComponent(area)}`)
  return (data.meals ?? []).map(mapMealToDTO)
}

export async function getAllMeals(): Promise<MealDto[]> {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  let allMeals: MealDto[] = []

  for (const letter of alphabet) {
    try {
      const { data } = await axios.get(`${BASE}/search.php?f=${letter}`)
      if (data.meals) {
        allMeals = allMeals.concat(data.meals.map(mapMealToDTO))
      }
    } catch {
      continue
    }
  }

  return allMeals
}
