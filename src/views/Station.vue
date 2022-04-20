<script setup>
import StationSearch from '@/components/Station/StationSearch.vue';
import CityStation from '@/components/Station/CityStation.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { nextTick, ref } from 'vue';
import { useTourism } from '@/composition-api';

const city = ref('');
const refCityStation = ref(null);
const { scenicSpot, restaurant, isTourismDataReady, fetchTourismData } =
  useTourism();

const updateCity = selectedCity => {
  city.value = selectedCity;
  nextTick(() => {
    refCityStation.value.getStationInfo(selectedCity);
  });
  fetchTourismData(selectedCity);
};
</script>

<template>
  <StationSearch @updateCity="updateCity" />
  <CityStation ref="refCityStation" v-if="city" :city="city" />
  <template v-if="isTourismDataReady">
    <NearbyTourism title="附近景點" :tourismList="scenicSpot.list" />
    <NearbyTourism title="附近美食" :tourismList="restaurant.list" />
  </template>
</template>
