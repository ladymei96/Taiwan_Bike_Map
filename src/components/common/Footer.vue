<script setup>
import Logo from '@/components/common/Logo.vue';
import Bike_Vector_PC from '@/statics/assets/icons/Vector_PC.svg';
import Bike_Vector_mobile from '@/statics/assets/icons/Vector_mobile.svg';

import { computed, reactive } from 'vue';
import { userDevice } from '@/store';

/** Store */
const deviceStore = userDevice();

const PC_LOGO_SIZE = reactive({
  bike: {
    width: 32.88,
    height: 29.33
  },
  riding: {
    width: 166.2,
    height: 22.31
  }
});
const MOBILE_LOGO_SIZE = reactive({
  bike: {
    width: 27.43,
    height: 24.47
  },
  riding: {
    width: 138.63,
    height: 18.61
  }
});
const isMobile = computed(() => {
  return deviceStore.isMobile;
});
const imgSize = computed(() => {
  return isMobile.value ? MOBILE_LOGO_SIZE : PC_LOGO_SIZE;
});
</script>

<template>
  <footer class="bg-gray-100 text-center">
    <img
      class="w-full -mb-1"
      :src="isMobile ? Bike_Vector_mobile : Bike_Vector_PC"
      alt="bikeVector"
    />
    <div class="py-14 flex flex-col items-center bg-gray-1000 text-white">
      <Logo class="mb-3" :size="imgSize" />
      <p class="text-lg font-bold px-3">
        ©{{ new Date().getFullYear() }}, Taiwan Bike. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
