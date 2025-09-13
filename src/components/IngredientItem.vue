<template>
  <div class="flex items-center justify-between py-2 border-b last:border-b-0">
    <div>
      <p class="font-medium">{{ name }}</p>
      <p class="text-sm text-gray-500" v-if="measure">{{ measure }}</p>
    </div>
    <div class="flex items-center gap-2">
      <Button icon="pi pi-cart-plus" severity="info" rounded @click="$emit('add')" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string; measure?: string }>()
defineEmits<{ (e: 'add'): void }>()
</script>
