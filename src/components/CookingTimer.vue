<template>
  <div class="p-6 bg-white/60 rounded-3xl shadow-md w-full max-w-md mx-auto space-y-6">
    <h2 class="text-2xl font-semibold text-center">Cooking Timer</h2>

    <div class="flex justify-center items-center gap-3">
      <input
        type="number"
        v-model.number="inputMinutes"
        :disabled="running"
        min="1"
        class="p-2 rounded border w-24 text-center"
      />
      <span class="text-sm text-gray-500">minutes</span>
    </div>

    <div class="text-4xl font-mono text-center">
      {{ displayTime }}
    </div>

    <div class="flex justify-center gap-4">
      <Button
        label="Start"
        icon="pi pi-play"
        severity="info"
        @click="start"
        :disabled="running || inputMinutes <= 0"
        rounded
      />
      <Button
        label="Stop"
        icon="pi pi-stop"
        severity="info"
        @click="stop"
        :disabled="!running"
        rounded
      />
    </div>

    <div>
      <Button
        class="w-full"
        label="Stop Cooking"
        icon="pi pi-times"
        severity="danger"
        @click="stopCooking"
        rounded
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const inputMinutes = ref(10)
const secondsLeft = ref(0)
const timer = ref<ReturnType<typeof setInterval> | null>(null)

const running = computed(() => timer.value !== null)

const displayTime = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (secondsLeft.value % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
})

function start() {
  if (running.value || inputMinutes.value <= 0) return
  secondsLeft.value = inputMinutes.value * 60

  timer.value = setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--
    } else {
      stop()
    }
  }, 1000)
}

function stop() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
}

function stopCooking() {
  stop()
  secondsLeft.value = 0
  inputMinutes.value = 10
  cartStore.clear()
}

onUnmounted(() => {
  stop()
})

const cartStore = useCartStore()
</script>
