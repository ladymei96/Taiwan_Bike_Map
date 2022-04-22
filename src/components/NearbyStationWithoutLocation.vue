<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';

const props = defineProps({
  msg: {
    type: String,
    default: 'Unable to retrieve your location'
  }
});
</script>

<template>
  <BlockWrap title="附近站點">
    <div
      class="h-80 flex justify-center items-center bg-gray-300 mx-16 lg:mx-28"
    >
      <p class="text-white text-4xl font-bold">
        {{ msg }}
      </p>
    </div>
  </BlockWrap>
</template>
