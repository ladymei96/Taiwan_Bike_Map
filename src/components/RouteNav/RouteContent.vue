<script setup>
import MarkerIcon from '@/statics/assets/icons/Marker.svg';

const props = defineProps({
  roadData: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>

<template>
  <div class="bg-white p-10 w-30% rounded-2xl">
    <h1 class="mb-6 text-default text-3xl font-bold">
      {{ roadData.RouteName }}
    </h1>
    <p class="flex mb-4">
      <img class="w-5 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
      <span> 車道長度：{{ roadData.CyclingLength }} </span>
    </p>
    <p class="flex mb-4">
      <img class="w-5 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
      <span> 行車方向：{{ roadData.Direction }} </span>
    </p>
    <p class="mb-4">起始點：{{ roadData.RoadSectionStart }}</p>
    <p class="mb-4">終點：{{ roadData.RoadSectionEnd }}</p>
    <button>see more</button>
  </div>
</template>
