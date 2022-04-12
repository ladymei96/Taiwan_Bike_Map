<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import CheckIcon from '@/assets/icons/Check.svg';
import MarkerIcon from '@/assets/icons/Marker.svg';
import { ref } from 'vue';
const title = ref('附近站點');
const description = ref('最近的站點資訊。');
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <section class="flex">
      <div id="map" class="w-2/3 bg-slate-300"></div>
      <div class="w-1/3 py-28 bg-white">
        <div class="px-15%">
          <h1 class="text-3xl text-default font-bold">東海大學站</h1>
          <p class="text-base text-gray-900 font-medium">
            地址: 臺東縣951綠島鄉溫泉路256號
          </p>
          <div class="flex">
            <p class="w-1/2 flex">
              <img class="w-5 mr-1.5" :src="CheckIcon" alt="checkIcon" />
              <span>狀態：營業中</span>
            </p>
            <p class="w-1/2 flex">
              <img class="w-5 mr-1.5" :src="MarkerIcon" alt="markerIcon" />
              <span>距離：12km</span>
            </p>
          </div>
          <div>可租車輛 11</div>
          <div>可停車位 0</div>
        </div>
      </div>
    </section>
  </BlockWrap>
</template>
