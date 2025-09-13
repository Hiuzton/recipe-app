<template>
  <div class="pr-6 pl-6 space-y-6">
    <div class="rounded-xl overflow-hidden max-w-5xl mx-auto">
      <img src="/assets/bg_food.jpg" alt="Food Hero" class="w-full h-80 object-cover rounded-xl" />
    </div>

    <div class="text-center space-y-4">
      <p class="text-2xl font-bold">What to Cook?</p>

      <div class="flex flex-wrap justify-center gap-4">
        <Button
          label="Cakes"
          severity="secondary"
          rounded
          class="flex items-center gap-2"
          @click="() => navigateToCategory('Cake')"
        >
          <CakeSlice class="w-4 h-4" />
          <span class="text-black font-medium">Cakes</span>
        </Button>
        <Button
          label="Meat"
          severity="secondary"
          rounded
          class="flex items-center gap-2"
          @click="() => navigateToCategory('Meat')"
        >
          <Drumstick class="w-4 h-4" />
          <span class="text-black font-medium">Meat</span>
        </Button>
        <Button
          label="Salad"
          severity="secondary"
          rounded
          class="flex items-center gap-2"
          @click="() => navigateToCategory('Salad')"
        >
          <Leaf class="w-4 h-4" />
          <span class="text-black font-medium">Salad</span>
        </Button>
        <Button
          severity="secondary"
          rounded
          class="flex items-center gap-2"
          @click="() => navigateToCategory('Fish')"
        >
          <Fish class="w-4 h-4" />
          <span class="text-black font-medium">Fish</span>
        </Button>
      </div>

      <Button severity="info" rounded @click="navigateToRandomMeal">
        <span class="text-white text-xl font-medium py-1 px-4">Get The Random Meal</span>
      </Button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <RecipeCard v-for="meal in randomMeals" :key="meal.id" :meal="meal" />
    </div>

    <section class="max-w-4xl mx-auto text-center mt-10 space-y-4">
      <h2 class="text-2xl font-bold">About KooKer</h2>
      <p class="text-gray-700">
        KooKer is your go-to companion for cooking inspiration. Whether you're craving a fancy
        dinner or a quick snack, we provide ideas, tips, and full recipes with just a few clicks.
      </p>
      <Button
        severity="info"
        label="Find more..."
        @click="navigateToAbout"
        icon="pi pi-angle-double-right"
        rounded
      />
    </section>

    <section class="max-w-4xl mx-auto mt-8 mb-8 p-6 bg-white rounded-xl shadow space-y-4">
      <h2 class="text-xl font-bold text-center">Contact & Support</h2>

      <ContactForm />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { CakeSlice, Drumstick, Leaf, Fish } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useSearchStore } from '@/stores/searchStore'
import { randomMeal } from '@/services/RecipeService'
import RecipeCard from '@/components/RecipeCard.vue'
import type { MealDto } from '@/types/meal'
import ContactForm from '@/components/ContactForm.vue'

const router = useRouter()
const route = useRoute()
const searchStore = useSearchStore()
const { query } = storeToRefs(searchStore)

const randomMeals = ref<MealDto[]>([])

const contact = ref({
  name: '',
  email: '',
  message: '',
})

async function fetchRandomMeals() {
  const results: MealDto[] = []
  for (let i = 0; i < 6; i++) {
    const m = await randomMeal()
    if (m) results.push(m)
  }
  randomMeals.value = results
}

function navigateToCategory(category: string) {
  query.value = category
  if (route.name !== 'recipies') {
    router.push({ name: 'recipies' })
  }
}

async function navigateToRandomMeal() {
  const result = await randomMeal()
  if (result?.id) {
    router.push(`/recipe/${result.id}`)
  } else {
    console.warn('No meal ID found for navigation.', result)
  }
}

function sendMessage() {
  if (!contact.value.name || !contact.value.email || !contact.value.message) {
    alert('Please fill all fields.')
    return
  }

  alert(`Thanks for contacting us, ${contact.value.name}! We'll get back to you soon.`)
  contact.value = { name: '', email: '', message: '' }
}

onMounted(fetchRandomMeals)

function navigateToAbout() {
  router.push('/about')
}
</script>
