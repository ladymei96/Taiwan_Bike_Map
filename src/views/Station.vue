<script setup>
import StationSearch from '@/components/Station/StationSearch.vue';
import CityStation from '@/components/Station/CityStation.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { computed, nextTick, ref } from 'vue';
import { useTourismData } from '@/composition-api';

const city = ref('');
const refCityStation = ref(null);

const isTourismDataReady = computed(() => {
  return (
    useTourismData.scenicSpot.list.length > 0 ||
    useTourismData.restaurant.list.length > 0
  );
});

const updateCity = selectedCity => {
  city.value = selectedCity;
  nextTick(() => {
    refCityStation.value.getStationInfo(selectedCity);
  });
  useTourismData.fetchTourismData(selectedCity);
};
</script>

<template>
  <StationSearch @updateCity="updateCity" />
  <CityStation ref="refCityStation" v-if="city" :city="city" />
  <template v-if="isTourismDataReady">
    <NearbyTourism
      title="附近景點"
      :tourismList="useTourismData.scenicSpot.list"
    />
    <NearbyTourism
      title="附近美食"
      :tourismList="useTourismData.restaurant.list"
    />
  </template>
</template>
