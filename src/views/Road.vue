<script setup>
import RoadSearch from '@/components/RouteNav/RoadSearch.vue';
import GeometryBlock from '@/components/RouteNav/GeometryBlock.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { computed, reactive } from 'vue';
import { useTourism } from '@/composition-api';

const roadData = reactive({ data: {} });
const { scenicSpot, restaurant, isTourismDataReady, fetchTourismData } =
  useTourism();

const isRoadDataReady = computed(() => {
  return Object.keys(roadData.data).length > 0;
});

const getRoadData = ({ selectedRoadData, city }) => {
  roadData.data = selectedRoadData;
  fetchTourismData({ city, spatialFilter: null });
};
</script>

<template>
  <RoadSearch @emitRoadData="getRoadData" />
  <GeometryBlock v-if="isRoadDataReady" :roadData="roadData.data" />
  <!-- <template v-if="isTourismDataReady">
    <NearbyTourism title="附近景點" :tourismList="scenicSpot.list" />
    <NearbyTourism title="附近美食" :tourismList="restaurant.list" />
  </template> -->
</template>
