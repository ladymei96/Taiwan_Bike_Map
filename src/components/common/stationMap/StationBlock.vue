<script setup>
import StationMap from '@/components/common/stationMap/StationMap.vue';

import CheckIcon from '@/statics/assets/icons/Check.svg';
import MarkerIcon from '@/statics/assets/icons/Marker.svg';
import DefaultIcon from '@/statics/assets/icons/Default.svg';
import NotActIcon from '@/statics/assets/icons/NotAct.svg';

import { reactive, computed, watch } from 'vue';

const props = defineProps({
  stationInfoList: {
    type: Array,
    default() {
      return [];
    }
  }
});
const emit = defineEmits(['updateStationStatus']);

const singleStation = reactive({ data: {} });

const isStationDataReady = computed(() => {
  return Object.keys(singleStation.data).length > 0;
});

watch(
  () => props.stationInfoList,
  newVal => {
    singleStation.data = newVal
      .filter(({ isActive }) => {
        return isActive;
      })
      .shift();
  },
  { deep: true }
);

const updateStationStatus = val => {
  emit('updateStationStatus', val);
};
</script>

<template>
  <section class="flex">
    <div class="w-2/3 bg-slate-300 relative">
      <StationMap
        v-if="isStationDataReady"
        :stationInfoList="stationInfoList"
        @emitStationStatus="updateStationStatus"
      />
      <div
        class="absolute bottom-12 left-20 z-30 px-6 py-2.5 rounded-2xl flex items-center space-x-2 bg-white text-md font-bold text-gray-900"
      >
        <img :src="DefaultIcon" alt="open icon" />
        <span>營業中</span>
        <img :src="NotActIcon" alt="close icon" />
        <span>未營業</span>
      </div>
    </div>
    <div class="w-1/3 py-28 bg-white">
      <div class="px-15%">
        <p v-if="!isStationDataReady">
          Geolocation is not supported by your browser
        </p>
        <div v-else>
          <h1 class="text-3xl text-default font-bold">
            {{ singleStation.data.StationName.Zh_tw }}
          </h1>
          <p class="my-5 text-base text-gray-900 font-medium">
            地址: {{ singleStation.data.StationAddress.Zh_tw }}
          </p>
          <div class="mb-11 flex space-x-7">
            <p class="flex">
              <img class="w-5 mr-1.5" :src="CheckIcon" alt="checkIcon" />
              <span
                >狀態：{{
                  singleStation.data.ServiceStatus === 1 ? '營業中' : '未營業'
                }}</span
              >
            </p>
            <p class="flex" v-if="singleStation.data.distance">
              <img class="w-5 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
              <span>距離：{{ singleStation.data.distance }} 公尺</span>
            </p>
          </div>
          <div
            class="w-9/12 py-3 mb-7 bg-default rounded-lg text-xl text-white text-center font-bold"
            :class="{
              'bg-tint': singleStation.data.AvailableRentBikes === 0
            }"
          >
            <span class="mr-8">可租車輛</span>
            <span>{{ singleStation.data.AvailableRentBikes }}</span>
          </div>
          <div
            class="w-9/12 py-3 mb-7 bg-default rounded-lg text-xl text-white text-center font-bold"
            :class="{
              'bg-tint': singleStation.data.AvailableReturnBikes === 0
            }"
          >
            <span class="mr-8">可停車位</span>
            <span>{{ singleStation.data.AvailableReturnBikes }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>