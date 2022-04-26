<script setup>
import SearchIcon from '@/statics/assets/icons/Search.svg';
import RoadSearch from '@/statics/assets/RoadSearch.svg';
import Banner from '@/statics/assets/banner/roadSearch_banner.jpg';

import { reactive, ref } from 'vue';
import { CITY_OPTION_CYCLING_TABLE } from '@/statics/constants/city_config.js';
import { getCyclingData } from '@/api/tdxService.js';

const emit = defineEmits(['emitRoadData']);

const selectedCity = ref('');
const selectedRoad = ref('');
const cityOptions = reactive(CITY_OPTION_CYCLING_TABLE);
const RoadOptions = reactive({ list: [] });

const changeCity = async () => {
  resetSelectedRoad();
  try {
    const res = await getCyclingData(selectedCity.value);
    RoadOptions.list = res.map((item, index) => {
      return { ...item, id: `${item.RouteName}-${index}` };
    });
  } catch (error) {
    console.log('Error', error);
  }
};
const resetSelectedRoad = () => {
  selectedRoad.value = '';
};
const submit = () => {
  if (!selectedCity.value || !selectedRoad.value) return;
  const roadData = RoadOptions.list
    .filter(roadItem => {
      return roadItem.RouteName === selectedRoad.value;
    })
    .shift();
  emit('emitRoadData', {
    selectedRoadData: roadData,
    city: selectedCity.value
  });
};
</script>

<template>
  <div
    class="mt-16 w-full h-80vh bg-cover flex flex-col items-center justify-center"
    :style="`background-image: url(${Banner})`"
  >
    <img class="mb-4" :src="RoadSearch" alt="roadSearch" width="322" />
    <div
      class="flex flex-col sm:flex-row items-center sm:space-x-5 space-y-3 sm:space-y-0"
    >
      <select
        class="py-3 w-80 sm:w-28 sm:mb-0 rounded-lg text-center text-content outline-0"
        name="city"
        id="city"
        v-model="selectedCity"
        @change="changeCity"
        data-test="city"
      >
        <option value="" disabled>請選擇縣市</option>
        <option
          v-for="city in cityOptions"
          :key="city.value"
          :value="city.value"
        >
          {{ city.option }}
        </option>
      </select>
      <select
        class="py-3 w-80 sm:mb-0 rounded-lg text-center text-content outline-0"
        name="road"
        id="road"
        v-model="selectedRoad"
        data-test="road"
      >
        <option value="" disabled>路線選擇</option>
        <option
          class="text-left"
          v-for="road in RoadOptions.list"
          :key="road.id"
          :value="road.RouteName"
        >
          {{ road.RouteName }}
        </option>
      </select>
      <button type="button" @click="submit" data-test="submit">
        <img class="w-10 h-10" :src="SearchIcon" alt="search icon" />
      </button>
    </div>
  </div>
</template>
