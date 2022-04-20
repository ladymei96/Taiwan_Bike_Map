<script setup>
import RoadSearch from '@/components/RouteNav/RoadSearch.vue';
import GeometryBlock from '@/components/RouteNav/GeometryBlock.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { reactive } from 'vue';
import { useTourism } from '@/composition-api';

const roadData = reactive({ data: {} });

const { scenicSpot, restaurant, isTourismDataReady, fetchTourismData } =
  useTourism();

const getRoadData = ({ selectedRoadData, city }) => {
  roadData.data = selectedRoadData;
  fetchTourismData({ city, spatialFilter: null });
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
