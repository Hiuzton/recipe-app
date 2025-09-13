<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />

    <main class="flex-1 m-auto h-full w-full">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>
