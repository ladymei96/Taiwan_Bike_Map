<script setup>
import SearchIcon from '@/statics/assets/icons/Search.svg';
import StionSearch from '@/statics/assets/StionSearch.svg';
import Banner from '@/statics/assets/banner/citySearch_banner.jpg';

import { reactive, ref } from 'vue';
import { CITY_OPTION_TABLE } from '@/statics/constants/city_config.js';

const emit = defineEmits(['updateCity']);

const selectedCity = ref('');
const cityOptions = reactive(CITY_OPTION_TABLE);

const changeCity = () => {
  if (!selectedCity.value) return;
  emit('updateCity', selectedCity.value);
};
</script>

<template>
  <div
    class="mt-16 w-full h-80vh bg-cover flex flex-col items-center justify-center"
    :style="`background-image: url(${Banner})`"
  >
    <img class="mb-4" :src="StionSearch" alt="stionSearch" width="328" />
    <div class="flex items-center space-x-5">
      <select
        class="py-3 w-28 rounded-lg text-center text-content"
        name="city"
        id="city"
        v-model="selectedCity"
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
      <button type="button" @click="changeCity">
        <img class="w-10 h-10" :src="SearchIcon" alt="search icon" />
      </button>
    </div>
  </div>
</template>
