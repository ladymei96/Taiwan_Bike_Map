<script setup>
import TopRoad from '@/components/TopRoad.vue';
import NearbyStation from '@/components/NearbyStation.vue';
import NearbyStationWithoutLocation from '@/components/NearbyStationWithoutLocation.vue';
import TouristSpots from '@/components/TouristSpots.vue';
import Banner from '@/components/Banner.vue';

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
    hasGeoLocation.value = true;
  };
  const errorHandler = e => {
    geoLocationStore.errorMsg = e.message;
    hasGeoLocation.value = false;
    console.log(e.message);
  };
  navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
};
onMounted(() => {
  getUserGeolocation();
});
</script>

<template>
  <Banner />
  <TopRoad />
  <NearbyStation v-if="hasGeoLocation" />
  <NearbyStationWithoutLocation v-else :msg="geoLocationStore.notAllowMsg" />
  <TouristSpots />
</template>
