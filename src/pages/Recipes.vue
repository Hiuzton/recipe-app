<template>
  <div class="relative w-full overflow-x-hidden">
    <!-- Background -->
    <div
      class="fixed inset-0 -z-10 bg-no-repeat bg-center bg-cover"
      style="background-image: url('/assets/bg_food_recipes_page.jpg')"
    ></div>
    <div class="fixed inset-0 -z-10 bg-white/60 backdrop-blur-md"></div>

    <!-- Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 px-4 sm:px-6 pt-2 pb-6 max-w-7xl mx-auto">
      <!-- Filters -->
      <aside
        :class="[
          'space-y-6 lg:col-span-1 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out',
          isMobileFilterOpen
            ? 'fixed top-0 left-0 z-50 w-3/4 h-full bg-white p-4 shadow-lg transform translate-x-0'
            : 'fixed top-0 left-0 z-50 w-full h-full p-4 transform -translate-x-full',
        ]"
      >
        <!-- Header with Close Button -->
        <div class="flex justify-between items-center rounded-2xl bg-gray-100 p-4">
          <h2 class="text-xl font-semibold">Filters</h2>
          <Button icon="pi pi-times" @click="toggleMobileFilter" text rounded class="lg:hidden" />
        </div>

        <!-- Category Filter -->
        <div class="bg-white/80 p-4 rounded-2xl shadow space-y-3">
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <InputText v-model="categorySearch" placeholder="Search categories..." class="w-full" />
          <div class="max-h-48 overflow-y-auto mt-2 space-y-1">
            <!-- No Filter -->
            <div
              @click="selectedCategory = null"
              class="cursor-pointer px-2 py-1 rounded hover:bg-blue-100 text-sm font-medium"
              :class="{ 'bg-blue-200': selectedCategory === null }"
            >
              No Filter
            </div>
            <!-- Dynamic Filtered Categories -->
            <div
              v-for="cat in filteredCategories"
              :key="cat"
              @click="selectedCategory = cat"
              class="cursor-pointer px-2 py-1 rounded hover:bg-blue-100 text-sm"
              :class="{ 'bg-blue-200 font-semibold': selectedCategory === cat }"
            >
              {{ cat }}
            </div>
          </div>
        </div>
        <!-- Area Filter -->
        <div class="bg-white/80 p-4 rounded-2xl shadow space-y-3">
          <label class="block text-sm font-medium text-gray-700">Area</label>
          <InputText v-model="areaSearch" placeholder="Search areas..." class="w-full" />
          <div class="max-h-48 overflow-y-auto mt-2 space-y-1">
            <!-- No Filter -->
            <div
              @click="selectedArea = null"
              class="cursor-pointer px-2 py-1 rounded hover:bg-blue-100 text-sm font-medium"
              :class="{ 'bg-blue-200': selectedArea === null }"
            >
              No Filter
            </div>
            <!-- Dynamic Filtered Areas -->
            <div
              v-for="area in filteredAreas"
              :key="area"
              @click="selectedArea = area"
              class="cursor-pointer px-2 py-1 rounded hover:bg-blue-100 text-sm"
              :class="{ 'bg-blue-200 font-semibold': selectedArea === area }"
            >
              {{ area }}
            </div>
          </div>
        </div>
      </aside>

      <!-- Recipes -->
      <section class="lg:col-span-3">
        <!-- Toggle Button Mobile -->
        <div class="lg:hidden flex justify-end mb-4">
          <Button
            icon="pi pi-filter"
            label="Filters"
            @click="toggleMobileFilter"
            class="p-button-sm"
          />
        </div>

        <!-- Loading/Empty -->
        <div v-if="loading" class="text-sm text-gray-500">Loading…</div>
        <div v-else-if="paginatedRecipes.length === 0" class="text-sm text-gray-500">
          No results.
        </div>

        <!-- Cards -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <RecipeCard v-for="meal in paginatedRecipes" :key="meal.id" :meal="meal" />
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-8 px-3">
          <Paginator
            :rows="itemsPerPage === -1 ? recipes.length : itemsPerPage"
            :totalRecords="sortedRecipes.length"
            :first="(currentPage - 1) * itemsPerPage"
            @page="onPageChange"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useSearchStore } from '@/stores/searchStore'
import { storeToRefs } from 'pinia'
import { searchMeals, listCategories, listAreas, getAllMeals } from '@/services/RecipeService'
import type { MealDto } from '@/types/meal'

import RecipeCard from '@/components/RecipeCard.vue'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Paginator from 'primevue/paginator'
import { useWindowSize } from '@vueuse/core'

const searchStore = useSearchStore()
const { query } = storeToRefs(searchStore)

const recipes = ref<MealDto[]>([])
const loading = ref(false)

const selectedCategory = ref<string | null>(null)
const selectedArea = ref<string | null>(null)

const categories = ref<string[]>([])
const areas = ref<string[]>([])

const categorySearch = ref('')
const areaSearch = ref('')

const currentPage = ref(1)
const { width } = useWindowSize()
const itemsPerPage = ref<number>(width.value < 768 ? 10 : 9)
const sortOrder = ref<'asc' | 'desc'>('asc')

const isMobileFilterOpen = ref(false)
function toggleMobileFilter() {
  isMobileFilterOpen.value = !isMobileFilterOpen.value
}

onMounted(async () => {
  categories.value = (await listCategories()) || []
  areas.value = (await listAreas()) || []
  await fetchData()
})

watch([query, selectedCategory, selectedArea], fetchData)
watch([itemsPerPage, sortOrder], () => (currentPage.value = 1))
watch(width, (newWidth) => {
  itemsPerPage.value = newWidth < 768 ? 10 : 9
})

async function fetchData() {
  loading.value = true
  try {
    let allMeals: MealDto[] = []
    allMeals = query.value.trim() ? await searchMeals(query.value) : await getAllMeals()

    recipes.value = allMeals.filter((meal) => {
      const matchesCategory = selectedCategory.value
        ? meal.category === selectedCategory.value
        : true
      const matchesArea = selectedArea.value ? meal.area === selectedArea.value : true
      return matchesCategory && matchesArea
    })
  } finally {
    loading.value = false
  }
}

function clearFilters() {
  selectedCategory.value = null
  selectedArea.value = null
  categorySearch.value = ''
  areaSearch.value = ''
}

const filteredCategories = computed(() =>
  categories.value.filter((c) => c.toLowerCase().includes(categorySearch.value.toLowerCase())),
)

const filteredAreas = computed(() =>
  areas.value.filter((a) => a.toLowerCase().includes(areaSearch.value.toLowerCase())),
)

const sortedRecipes = computed(() => {
  return [...recipes.value].sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return sortOrder.value === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA)
  })
})

const paginatedRecipes = computed(() => {
  if (itemsPerPage.value === -1) return sortedRecipes.value
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedRecipes.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() =>
  itemsPerPage.value === -1 ? 1 : Math.ceil(sortedRecipes.value.length / itemsPerPage.value),
)

function onPageChange(event: any) {
  currentPage.value = Math.floor(event.first / itemsPerPage.value) + 1
}
</script>
