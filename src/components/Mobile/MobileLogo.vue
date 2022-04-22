<script setup>
import Logo from '@/components/common/Logo.vue';

import { reactive } from 'vue';

const MOBILE_LOGO_SIZE = reactive({
  bike: {
    width: 25,
    height: 18
  },
  riding: {
    width: 101,
    height: 13.55
  }
});
</script>
<template>
  <div class="flex justify-center py-5 bg-gray-1000">
    <Logo :size="MOBILE_LOGO_SIZE" />
  </div>
</template>
