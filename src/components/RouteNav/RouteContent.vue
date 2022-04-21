<script setup>
import MarkerIcon from '@/statics/assets/icons/Marker.svg';
import Direction from '@/statics/assets/icons/Direction.png';

import { onMounted, getCurrentInstance } from 'vue';

const props = defineProps({
  roadData: {
    type: Object,
    default() {
      return {};
    }
  }
});

let vueInstance;

const distanceFormat = cyclingLength => {
  if (!cyclingLength) return '未提供';
  const isOverOneKilometer = cyclingLength > 1000;
  return isOverOneKilometer
    ? `${cyclingLength / 1000} 公里`
    : `${cyclingLength} 公尺`;
};

const showModal = () => {
  const params = {
    modalName: 'RoadInfoModal',
    options: props.roadData
  };
  vueInstance.$eventBus.$emit('toggleModal', params);
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  vueInstance = proxy;
});
</script>

<template>
  <div
    class="bg-white p-10 md:p-5 lg:p-10 md:w-30% md:rounded-2xl md:shadow-lg md:shadow-gray-900"
  >
    <h1 class="mb-6 text-default text-3xl font-bold">
      {{ roadData.RouteName }}
    </h1>
    <p class="flex mb-4">
      <img class="w-6 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
      <span> 車道長度：{{ distanceFormat(roadData.CyclingLength) }} </span>
    </p>
    <p class="flex mb-4">
      <img class="w-6 h-6 mr-1.5" :src="Direction" alt="direction" />
      <span> 行車方向：{{ roadData.Direction }} </span>
    </p>
    <p class="mb-4">起始點：{{ roadData.RoadSectionStart }}</p>
    <p class="mb-4">終點：{{ roadData.RoadSectionEnd }}</p>
    <button
      class="w-full py-2 bg-default hover:bg-dark01 rounded-lg text-white text-xl text-center font-bold uppercase"
      @click="showModal"
    >
      see more
    </button>
  </div>
</template>
