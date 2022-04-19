<script setup>
import RoadSearch from '@/components/RouteNav/RoadSearch.vue';
import GeometryBlock from '@/components/RouteNav/GeometryBlock.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { computed, reactive } from 'vue';
import { getScenicSpotData, getRestaurantData } from '@/api/tdxService.js';
import convertData from '@/utils/convertData.js';

const roadData = reactive({ data: {} });
const scenicSpot = reactive({ list: [] });
const restaurant = reactive({ list: [] });

const isTourismDataReady = computed(() => {
  return scenicSpot.list.length > 0;
});

const getRoadData = ({ selectedRoadData, city }) => {
  roadData.data = selectedRoadData;
  getTourismData(city);
};
const getTourismData = async city => {
  const params = {
    city,
    spatialFilter: ''
  };
  try {
    const [scenicSpotResult, restaurantResult] = await Promise.all([
      getScenicSpotData(params),
      getRestaurantData(params)
    ]);
    scenicSpot.list = convertData['scenicSpot'](scenicSpotResult);
    restaurant.list = convertData['restaurant'](restaurantResult);
  } catch (error) {
    console.log('Error', error);
  }
};
</script>

<template>
  <RoadSearch @emitRoadData="getRoadData" />
  <template v-if="isTourismDataReady">
    <GeometryBlock :roadData="roadData.data" />
    <NearbyTourism title="附近景點" :tourismList="scenicSpot.list" />
    <NearbyTourism title="附近美食" :tourismList="restaurant.list" />
  </template>
</template>
