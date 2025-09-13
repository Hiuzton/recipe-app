<template>
  <div class="relative w-full min-h-screen overflow-x-hidden">
    <div
      class="fixed inset-0 -z-10 bg-no-repeat bg-center bg-contain sm:bg-cover"
      style="background-image: url('/assets/bg_food_v_orientation.jpeg')"
    ></div>

    <div class="fixed inset-0 -z-10 bg-white/60 backdrop-blur-md"></div>

    <div v-if="!meal" class="text-sm text-gray-500 p-6">Loading…</div>

    <div
      v-else
      class="m-6 p-6 max-w-7xl mx-auto rounded-3xl grid gap-8 bg-white/80 backdrop-blur-md shadow-xl"
    >
      <div class="flex flex-wrap lg:flex-nowrap justify-around gap-4">
        <div class="p-3 w-full lg:w-1/2">
          <img :src="meal.thumbnail" :alt="meal.name" class="w-full rounded-xl shadow" />
        </div>
        <div class="p-3 w-full lg:w-1/2">
          <h1 class="text-3xl font-semibold mt-4">{{ meal.name }}</h1>
          <div class="mt-6">
            <h2 class="font-semibold mb-2">Ingredients</h2>
            <div class="bg-white shadow rounded-xl divide-y p-4">
              <IngredientItem
                v-for="(ing, idx) in ingredients"
                :key="idx"
                :name="ing.name"
                :measure="ing.measure"
                @add="addToCart(ing.name, ing.measure)"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 class="font-semibold mb-2">Instructions</h2>
        <p class="leading-7 whitespace-pre-line bg-white shadow rounded-xl p-4">
          {{ meal.instructions }}
        </p>

        <div class="mt-6">
          <h2 class="font-semibold mb-2">Cooking Timer</h2>
          <CookingTimer />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import IngredientItem from '@/components/IngredientItem.vue'
import { lookupMeal } from '@/services/RecipeService'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'
import CookingTimer from '@/components/CookingTimer.vue'
import type { MealDto } from '@/types/meal'

const route = useRoute()
const cart = useCartStore()

const meal = ref<MealDto | null>(null)
const ingredients = ref<{ name: string; measure: string }[]>([])

function addToCart(name: string, measure?: string) {
  cart.addItem(name, measure)
}

onMounted(async () => {
  const id = String(route.params.id)
  meal.value = await lookupMeal(id)
  if (meal.value) ingredients.value = meal.value.ingredients
})
</script>
