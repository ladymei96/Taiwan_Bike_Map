<script setup>
import GeometryMap from '@/components/RoadNav/GeometryMap.vue';
import RoadContent from '@/components/RoadNav/RoadContent.vue';

import { nextTick, ref, watch } from 'vue';

const props = defineProps({
  roadData: {
    type: Object,
    default() {
      return {};
    }
  }
});

const isLoading = ref(false);

watch(
  () => {
    return props.roadData;
  },
  newVal => {
    changeLoadingStatus(true);
    nextTick(() => {
      changeLoadingStatus(false);
    });
  }
);
const changeLoadingStatus = statue => {
  isLoading.value = statue;
};
</script>

<template>
  <div class="w-full relative">
    <GeometryMap class="h-80vh" v-if="!isLoading" :roadData="roadData" />
    <RoadContent
      class="md:absolute md:z-30 md:right-2% md:bottom-10%"
      :roadData="roadData"
    />
  </div>
</template>
