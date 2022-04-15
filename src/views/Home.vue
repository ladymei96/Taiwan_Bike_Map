<script setup>
import Carousel from '@/components/Carousel.vue';
import NearbyStation from '@/components/NearbyStation.vue';
import TouristSpots from '@/components/TouristSpots.vue';

import TaiwanRidingPNG from '@/assets/TaiwanRiding.png';
import LetGo from '@/assets/Let’sGo.svg';
import { onMounted, ref } from 'vue';
import { userLocation } from '@/store';

/** Store */
const geoLocationStore = userLocation();

const hasGeoLocation = ref(false);

const getUserGeolocation = () => {
  if (!navigator.geolocation) {
    return;
  }
  const successHandler = async position => {
    const { latitude, longitude } = position.coords;
    const params = {
      latitude, // 緯度
      longitude // 經度
    };
    geoLocationStore.geolocation = params;
    geoLocationStore.isAllow = true;
    hasGeoLocation.value = true;
  };
  const errorHandler = e => {
    geoLocationStore.errorMsg = e.message;
    hasGeoLocation.value = false;
    throw new Error(e.message);
  };
  navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
};
onMounted(() => {
  getUserGeolocation();
});
</script>

<template>
  <div class="relative text-white text-center">
    <div class="absolute z-10 top-2/4 left-1/2 -translate-x-1/2">
      <img
        class="absolute -top-24 md:-top-20 left-1/2 md:-left-20 -translate-x-1/2 md:-translate-x-0"
        :src="LetGo"
        alt="Let’s Go"
        width="222"
        height="112"
      />
      <img
        class="mb-6 bg-transparent h-auto"
        :src="TaiwanRidingPNG"
        alt="taiwanRiding"
        width="450"
      />
      <p class="text-xl font-bold">
        台灣的各個美景，都美不勝收。
        <br />
        等你一同來發現這座寶島的奧妙！
      </p>
    </div>
    <Carousel />
  </div>
  <NearbyStation v-if="hasGeoLocation" />
  <TouristSpots />
</template>
