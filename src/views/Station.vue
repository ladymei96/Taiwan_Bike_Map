<script setup>
import StationSearch from '@/components/Station/StationSearch.vue';
import CityStation from '@/components/Station/CityStation.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { nextTick, onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';
import { userLocation } from '@/store';
import { useTourism } from '@/composition-api';

let vueInstance;
const city = ref('');
const refCityStation = ref(null);
/** composition-api */
const { scenicSpot, restaurant, isTourismDataReady, fetchTourismData } =
  useTourism();

/** Store */
const geoLocationStore = userLocation();

const updateCity = selectedCity => {
  city.value = selectedCity;
  nextTick(() => {
    refCityStation.value.getStationInfo(selectedCity);
  });
  fetchTourismData({ city: selectedCity, spatialFilter: null });
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  vueInstance = proxy;
  vueInstance.$eventBus.$on('fetchNearbyTourism', spatialFilter => {
    fetchTourismData({ city: city.value, spatialFilter });
  });
});
onUnmounted(() => {
  vueInstance.$eventBus.$off('fetchNearbyTourism');
});
</script>

<template>
  <StationSearch @updateCity="updateCity" />
  <CityStation ref="refCityStation" v-if="city" :city="city" />
  <template v-if="isTourismDataReady">
    <NearbyTourism title="附近景點" :tourismList="scenicSpot.list" />
    <NearbyTourism title="附近美食" :tourismList="restaurant.list" />
  </template>
</template>
