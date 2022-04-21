<script setup>
import GeometryMap from '@/components/RouteNav/GeometryMap.vue';
import RouteContent from '@/components/RouteNav/RouteContent.vue';
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
    <RouteContent
      class="md:absolute md:z-30 md:right-2% md:bottom-10%"
      :roadData="roadData"
    />
  </div>
</template>
