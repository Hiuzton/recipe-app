<template>
  <div class="bg-sky-100 rounded-lg shadow-md overflow-hidden p-3">
    <h3 class="font-bold text-xl text-gray-800 mb-2">{{ meal.name }}</h3>
    <img
      :src="meal.thumbnail"
      :alt="meal.name"
      class="w-full h-48 object-cover rounded"
      @error="handleError"
    />
    <div class="py-2">
      <Button
        severity="info"
        label="View full recipe"
        icon="pi pi-arrow-circle-right"
        iconPos="right"
        @click="navigateToMeal"
        class="w-full inline-block mt-2 text-sm text-indigo-600"
        rounded
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MealDto } from '@/types/meal'

const router = useRouter()
const props = defineProps<{ meal: MealDto }>()

const fallback = 'https://via.placeholder.com/300x200?text=No+Image'

async function navigateToMeal() {
  router.push(`/recipe/${props.meal.id}`)
}

function handleError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = fallback
}
</script>
