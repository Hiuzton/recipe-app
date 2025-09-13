<template>
  <footer class="shadow bg-gray-50">
    <div
      class="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600"
    >
      <p>&copy; {{ currentYear }} KooKer. All rights reserved.</p>

      <nav class="flex items-center gap-4 flex-wrap justify-center md:justify-start">
        <a
          href="https://www.themealdb.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="hover:underline"
        >
          Powered by TheMealDB
        </a>
        <RouterLink to="/" class="hover:underline">Home</RouterLink>
        <RouterLink to="/about" class="hover:underline">About</RouterLink>
        <RouterLink to="/recipes" class="hover:underline">Recipes</RouterLink>
        <RouterLink to="/cart" class="hover:underline">Cart</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>
