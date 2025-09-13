<template>
  <div class="relative w-full min-h-screen py-6 flex justify-center items-start overflow-x-hidden">
    <div
      class="fixed inset-0 -z-20 bg-no-repeat bg-center bg-contain sm:bg-cover"
      style="background-image: url('/assets/bg_cart.png')"
    ></div>

    <div class="fixed inset-0 -z-10 bg-white/60 backdrop-blur-md"></div>

    <div class="p-6 bg-sky-50 rounded-xl w-full max-w-md shadow-lg">
      <h1 class="text-xl font-semibold mb-6 text-center">Your Cart</h1>

      <div v-if="items.length === 0" class="text-center text-sm text-gray-500">No items yet.</div>

      <ul v-else class="divide-y">
        <li
          v-for="(it, idx) in items"
          :key="idx"
          class="py-3 flex items-center justify-between gap-4"
        >
          <div>
            <p class="font-medium">{{ it.name }}</p>
            <p v-if="it.measure" class="text-xs text-gray-500">{{ it.measure }}</p>
          </div>

          <div class="flex items-center gap-2">
            <Button
              icon="pi pi-minus"
              severity="info"
              rounded
              @click="remove(it.name, it.measure)"
              aria-label="Decrease quantity"
            />
            <span class="w-8 text-center select-none">{{ it.qty }}</span>
            <Button
              icon="pi pi-plus"
              severity="info"
              rounded
              @click="add(it.name, it.measure)"
              aria-label="Increase quantity"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              rounded
              @click="del(it.name, it.measure)"
              aria-label="Delete item"
            />
          </div>
        </li>
      </ul>

      <div class="mt-6 flex justify-center gap-3">
        <Button
          severity="info"
          label="Clear"
          @click="clear"
          :disabled="items.length === 0"
          outlined
        />
        <Button
          severity="info"
          label="Back"
          icon="pi pi-chevron-left"
          @click="goBackSmart"
          outlined
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cartStore'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const { items } = storeToRefs(cart)
const add = cart.addItem
const remove = cart.removeItem
const del = cart.deleteItem
const clear = cart.clear

const router = useRouter()

function goBackSmart() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push({ name: 'recipies' })
  }
}
</script>
