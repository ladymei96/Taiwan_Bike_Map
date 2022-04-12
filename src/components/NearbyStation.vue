<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import CheckIcon from '@/assets/icons/Check.svg';
import MarkerIcon from '@/assets/icons/Marker.svg';
import { ref, reactive, watch } from 'vue';
import { userLocation } from '@/store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  stationInfoList: {
    type: Array,
    default() {
      return [];
    }
  }
});
const title = ref('附近站點');
const description = ref('最近的站點資訊。');
const detailStation = reactive({ data: {} });
const geoLocationStore = userLocation();

const { geolocation } = storeToRefs(geoLocationStore);
// 還沒安裝地圖

watch(
  props.stationInfoList,
  newVal => {
    detailStation.data = newVal[0];
  },
  { deep: true }
);
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <section class="flex">
      <div id="map" class="w-2/3 bg-slate-300"></div>
      <div class="w-1/3 py-28 bg-white">
        <div class="px-15%">
          <p v-if="Object.keys(detailStation.data).length === 0">
            Geolocation is not supported by your browser
          </p>
          <div v-else>
            <h1 class="text-3xl text-default font-bold">
              {{ detailStation.data.StationName.Zh_tw }}
            </h1>
            <p class="my-5 text-base text-gray-900 font-medium">
              地址: {{ detailStation.data.StationAddress.Zh_tw }}
            </p>
            <div class="mb-11 flex space-x-7">
              <p class="flex">
                <img class="w-5 mr-1.5" :src="CheckIcon" alt="checkIcon" />
                <span
                  >狀態：{{
                    detailStation.data.ServiceStatus === 1 ? '營業中' : '未營業'
                  }}</span
                >
              </p>
              <p class="flex">
                <img class="w-5 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
                <!-- 還沒處理 -->
                <span>距離：12km</span>
              </p>
            </div>
            <div
              class="w-9/12 py-3 mb-7 bg-default rounded-lg text-xl text-white text-center font-bold"
              :class="{
                'bg-tint': detailStation.data.AvailableRentBikes === 0
              }"
            >
              <span class="mr-8">可租車輛</span>
              <span>{{ detailStation.data.AvailableRentBikes }}</span>
            </div>
            <div
              class="w-9/12 py-3 mb-7 bg-default rounded-lg text-xl text-white text-center font-bold"
              :class="{
                'bg-tint': detailStation.data.AvailableReturnBikes === 0
              }"
            >
              <span class="mr-8">可停車位</span>
              <span>{{ detailStation.data.AvailableReturnBikes }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BlockWrap>
</template>
