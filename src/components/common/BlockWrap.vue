<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: String
});
</script>

<template>
  <div class="py-32 bg-gray-100">
    <div class="text-center">
      <h1 class="text-dark01 text-3.5xl font-bold mb-8" data-test="title">
        {{ title }}
      </h1>
      <p
        class="text-gray-900 text-base font-medium mb-14"
        v-if="description"
        data-test="description"
      >
        {{ description }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped></style>
