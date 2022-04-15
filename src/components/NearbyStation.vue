<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import NearbyStationMap from '@/components/NearbyStationMap.vue';

import CheckIcon from '@/assets/icons/Check.svg';
import MarkerIcon from '@/assets/icons/Marker.svg';
import DefaultIcon from '@/assets/icons/Default.svg';
import NotActIcon from '@/assets/icons/NotAct.svg';

import { ref, reactive, watch, computed, onMounted } from 'vue';
import { getStationData, getAvailableData } from '@/api/tdxService';
import { userLocation } from '@/store';
import { distance } from '@/utils/distance.js';

const title = ref('附近站點');
const description = ref('最近的站點資訊。');
const singleStation = reactive({ data: {} });
const stationInfoList = reactive({ list: [] });

/** Store */
const geoLocationStore = userLocation();

watch(
  () => stationInfoList.list,
  newVal => {
    singleStation.data = newVal
      .filter(({ isActive }) => {
        return isActive;
      })
      .shift();
  },
  { deep: true }
);

const isStationDataReady = computed(() => {
  return Object.keys(singleStation.data).length > 0;
});

const twoPointDistance = StationPosition => {
  const { longitude, latitude } = geoLocationStore.geolocation;
  const userPosition = {
      x: longitude,
      y: latitude
    },
    stationPosition = {
      x: StationPosition.PositionLon,
      y: StationPosition.PositionLat
    };
  return distance(userPosition, stationPosition, 'M');
};

const getStationInfo = async params => {
  const [stationResult, availableResult] = await Promise.all([
    getStationData(params),
    getAvailableData(params)
  ]);
  stationInfoList.list = availableResult
    .map(availableItem => {
      stationResult.forEach(stationItem => {
        if (stationItem.StationID === availableItem.StationID) {
          availableItem.StationName = stationItem.StationName;
          availableItem.StationAddress = stationItem.StationAddress;
          availableItem.StationPosition = stationItem.StationPosition;
        }
      });
      const distance = twoPointDistance(availableItem.StationPosition);
      return { ...availableItem, distance };
    })
    .sort((a, b) => {
      return a.distance - b.distance;
    })
    .map((item, index) => {
      const isActive = index === 0;
      return { ...item, isActive };
    });
};

const updateStationStatus = val => {
  stationInfoList.list = val;
};

onMounted(() => {
  getStationInfo(geoLocationStore.geolocation);
});
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <section class="flex">
      <div class="w-2/3 bg-slate-300 relative">
        <NearbyStationMap
          v-if="isStationDataReady"
          :stationInfoList="stationInfoList.list"
          @updateStationStatus="updateStationStatus"
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
              <p class="flex">
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
  </BlockWrap>
</template>
