<template>
  <header class="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-md">
    <div class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <!-- Logo and title -->
      <RouterLink
        to="/"
        class="flex items-center font-bold text-xl gap-2 hover:opacity-80 whitespace-nowrap"
      >
        <img src="/icons/cooking.png" alt="Logo" class="w-7 h-7" />
        KooKer
      </RouterLink>

      <!-- Mobile menu toggle -->
      <button
        class="md:hidden text-gray-600 focus:outline-none"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>

      <!-- Nav links -->
      <nav class="hidden md:flex items-center gap-6">
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/about" class="hover:underline">About</RouterLink>
        <RouterLink to="/recipes" class="hover:underline">Recipes</RouterLink>

        <div class="relative">
          <RouterLink to="/cart" class="hover:underline">Cart</RouterLink>
          <span
            class="absolute -top-2 -right-4 text-xs font-bold text-white bg-blue-400 rounded-full px-2 py-[1px] shadow"
          >
            {{ count }}
          </span>
        </div>
      </nav>

      <!-- Search bar -->
      <div class="hidden md:flex gap-2 items-center w-full max-w-md ml-6">
        <FloatLabel variant="on">
          <InputText
            id="search"
            v-model="query"
            @keyup.enter="run"
            class="border rounded-full px-4 py-2 w-full"
          />
          <label for="search">Search</label>
        </FloatLabel>
        <Button
          icon="pi pi-search"
          severity="info"
          variant="text"
          raised
          rounded
          aria-label="Search"
          @click="run"
        />
      </div>
    </div>

    <!-- Mobile dropdown nav -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden px-4 pb-3 pt-2 bg-white border-t shadow space-y-2"
    >
      <RouterLink to="/" class="block hover:underline">Home</RouterLink>
      <RouterLink to="/about" class="block hover:underline">About</RouterLink>
      <RouterLink to="/recipes" class="block hover:underline">Recipes</RouterLink>

      <div class="flex items-center">
        <RouterLink to="/cart" class="hover:underline">Cart</RouterLink>
        <span class="text-xs font-bold text-white bg-blue-400 rounded-full px-2 py-[1px] shadow">
          {{ count }}
        </span>
      </div>

      <div class="mt-2 flex gap-2 items-center">
        <InputText
          v-model="query"
          @keyup.enter="run"
          placeholder="Search..."
          class="border rounded-full px-4 py-2 w-full"
        />
        <Button icon="pi pi-search" severity="info" variant="text" raised rounded @click="run" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useSearchStore } from '@/stores/searchStore'

const { count } = storeToRefs(useCartStore())
const searchStore = useSearchStore()
const { query } = storeToRefs(searchStore)

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)

function run() {
  if (route.name !== 'recipes') {
    router.push({ name: 'recipes' })
  }
  isMobileMenuOpen.value = false
}
</script>
