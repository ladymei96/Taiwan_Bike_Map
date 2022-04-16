<script setup>
import SearchIcon from '@/statics/assets/icons/Search.svg';
import Tainan from '@/statics/assets/taiwanPhoto/Tainan.jpg';

import { reactive } from 'vue';
import { CITY_OPTION_TABLE } from '@/statics/constants/city_config.js';

const cityOptions = reactive(CITY_OPTION_TABLE);
</script>

<template>
  <div
    class="w-full h-70vh bg-cover flex items-center justify-center"
    :style="`background-image: url(${Tainan})`"
  >
    <select class="mr-2" name="city" id="city">
      <option value="" selected disabled>請選擇縣市</option>
      <option v-for="city in cityOptions" :key="city.value" :value="city.value">
        {{ city.option }}
      </option>
    </select>
    <button type="button">
      <img class="w-10 h-10" :src="SearchIcon" alt="search icon" />
    </button>
  </div>
</template>
