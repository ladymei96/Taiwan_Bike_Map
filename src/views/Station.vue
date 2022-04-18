<script setup>
import StationSearch from '@/components/Station/StationSearch.vue';
import CityStation from '@/components/Station/CityStation.vue';
import NearbySpots from '@/components/common/NearbySpots.vue';
import NearbyFood from '@/components/common/NearbyFood.vue';
import { nextTick, ref } from 'vue';

const city = ref('');
const refCityStation = ref(null);

const updateCity = selectedCity => {
  city.value = selectedCity;
  nextTick(() => {
    refCityStation.value.getStationInfo(selectedCity);
  });
};
</script>

<template>
  <StationSearch @updateCity="updateCity" />
  <CityStation ref="refCityStation" v-if="city" :city="city" />
  <NearbySpots></NearbySpots>
  <NearbyFood></NearbyFood>
</template>
