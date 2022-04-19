<script setup>
import RoadSearch from '@/components/RouteNav/RoadSearch.vue';
import GeometryBlock from '@/components/RouteNav/GeometryBlock.vue';
import NearbyTourism from '@/components/common/NearbyTourism.vue';

import { computed, reactive } from 'vue';
import { useTourismData } from '@/composition-api';

const roadData = reactive({ data: {} });

const isTourismDataReady = computed(() => {
  return (
    useTourismData.scenicSpot.list.length > 0 ||
    useTourismData.restaurant.list.length > 0
  );
});

const getRoadData = ({ selectedRoadData, city }) => {
  roadData.data = selectedRoadData;
  useTourismData.fetchTourismData(city);
};
</script>

<template>
  <RoadSearch @emitRoadData="getRoadData" />
  <template v-if="isTourismDataReady">
    <GeometryBlock :roadData="roadData.data" />
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
