import type { MealDto } from '@/types/meal'

export function mapMealToDTO(raw: any): MealDto {
  return {
    id: raw.idMeal,
    name: raw.strMeal,
    thumbnail: secureImageUrl(raw.strMealThumb),
    instructions: raw.strInstructions,
    category: raw.strCategory,
    area: raw.strArea,
    youtube: raw.strYoutube,
    ingredients: parseIngredients(raw),
  }
}

function secureImageUrl(url?: string): string {
  const fallback = 'https://placehold.co/300x200?text=No+Image'
  if (!url || url.trim() === '') return fallback
  return url.startsWith('http://') ? url.replace('http://', 'https://') : url
}

function parseIngredients(meal: any): { name: string; measure: string }[] {
  const out: { name: string; measure: string }[] = []
  for (let i = 1; i <= 20; i++) {
    const name = (meal[`strIngredient${i}`] || '').trim()
    const measure = (meal[`strMeasure${i}`] || '').trim()
    if (name) out.push({ name, measure })
  }
  return out
}
