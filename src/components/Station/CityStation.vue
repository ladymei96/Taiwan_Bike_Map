<script setup>
import StationBlock from '@/components/common/stationMap/StationBlock.vue';

import { reactive, ref } from 'vue';
import { getCityStation, getCityAvailableData } from '@/api/tdxService';

const isLoading = ref(true);
const stationInfoList = reactive({ list: [] });

const getStationInfo = async city => {
  isLoading.value = true;
  try {
    const [stationResult, availableResult] = await Promise.all([
      getCityStation(city),
      getCityAvailableData(city)
    ]);
    combineData({ stationResult, availableResult });
    isLoading.value = false;
  } catch (error) {
    console.log('Error', error);
  }
};
const combineData = ({ stationResult, availableResult }) => {
  stationInfoList.list = availableResult.map(
    (availableItem, availableIndex) => {
      stationResult.forEach(stationItem => {
        if (stationItem.StationID === availableItem.StationID) {
          availableItem.StationName = stationItem.StationName;
          availableItem.StationAddress = stationItem.StationAddress;
          availableItem.StationPosition = stationItem.StationPosition;
        }
      });
      const isActive = availableIndex === 0;
      return { ...availableItem, isActive };
    }
  );
};
const updateStationStatus = val => {
  stationInfoList.list = val;
};

/** <script setup> are private by default
 * parent component won't be able to access anything
 * unless the child component chooses to exporse a public interface
 */
defineExpose({ getStationInfo });
</script>

<template>
  <StationBlock
    :isLoading="isLoading"
    :stationInfoList="stationInfoList.list"
    @updateStationStatus="updateStationStatus"
  />
</template>
