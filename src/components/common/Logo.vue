<script setup>
import BikeIcon from '@/statics/assets/Bike.png';
import TaiwanRiding from '@/statics/assets/TaiwanRiding.svg';

const props = defineProps({
  size: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>

<template>
  <router-link to="/" class="flex">
    <img
      class="mr-1"
      :src="BikeIcon"
      alt="bikeIcon"
      :width="size.bike.width"
      :height="size.bike.height"
    />
    <img
      :src="TaiwanRiding"
      alt="taiwanRiding"
      :width="size.riding.width"
      :height="size.riding.height"
    />
  </router-link>
</template>
