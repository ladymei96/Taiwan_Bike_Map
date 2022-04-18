<script setup>
import RoadSearch from '@/components/RouteNav/RoadSearch.vue';
import GeometryBlock from '@/components/RouteNav/GeometryBlock.vue';

import { computed, reactive } from 'vue';

const roadData = reactive({ data: {} });

const isRoadDataReady = computed(() => {
  return Object.keys(roadData.data).length > 0;
});

const setRoadData = val => {
  roadData.data = val;
};
</script>

<template>
  <RoadSearch @emitRoadData="setRoadData" />
  <GeometryBlock v-if="isRoadDataReady" :roadData="roadData.data" />
</template>
