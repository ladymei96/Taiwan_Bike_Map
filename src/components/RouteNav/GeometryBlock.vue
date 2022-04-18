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
  <div class="w-full h-80vh">
    <GeometryMap v-if="!isLoading" :roadData="roadData" />
  </div>
</template>
