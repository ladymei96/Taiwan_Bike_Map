<script setup>
const emit = defineEmits(['dismissModal']);
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 bg-gray-1000/50 text-content z-999"
    @click.self="emit('dismissModal')"
  >
    <slot></slot>
  </div>
</template>
