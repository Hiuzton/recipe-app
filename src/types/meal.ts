type Ingredient = { name: string; measure: string }

export type MealDto = {
  id: string
  name: string
  thumbnail: string
  instructions: string
  category?: string
  area?: string
  youtube?: string
  ingredients: Ingredient[]
}
