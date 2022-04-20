<script setup>
import BlockWrap from '@/components/common/BlockWrap.vue';
import StationBlock from '@/components/common/stationMap/StationBlock.vue';

import { ref, reactive, watch, computed, onMounted } from 'vue';
import { getStationData, getAvailableData } from '@/api/tdxService';
import { userLocation } from '@/store';
import { distance } from '@/utils/distance.js';

const title = ref('附近站點');
const description = ref('最近的站點資訊。');
const stationInfoList = reactive({ list: [] });

/** Store */
const geoLocationStore = userLocation();

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
  try {
    const [stationResult, availableResult] = await Promise.all([
      getStationData(params),
      getAvailableData(params)
    ]);
    combineData({ stationResult, availableResult });
  } catch (error) {
    console.log('Error', error);
  }
};

const combineData = ({ stationResult, availableResult }) => {
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

onMounted(() => {
  getStationInfo(geoLocationStore.geolocation);
});
</script>

<template>
  <BlockWrap :title="title" :description="description">
    <StationBlock v-model:stationInfoList.sync="stationInfoList.list" />
  </BlockWrap>
</template>
