<script setup>
import SearchIcon from '@/statics/assets/icons/Search.svg';
import Tainan from '@/statics/assets/taiwanPhoto/Tainan.jpg';

import { reactive, ref } from 'vue';
import { CITY_OPTION_TABLE } from '@/statics/constants/city_config.js';

const emit = defineEmits(['updateCity']);

const cityOptions = reactive(CITY_OPTION_TABLE);
const selectedCity = ref('');

const changeCity = () => {
  emit('updateCity', selectedCity.value);
};
</script>

<template>
  <div
    class="mt-16 w-full h-70vh bg-cover flex items-center justify-center"
    :style="`background-image: url(${Tainan})`"
  >
    <select class="mr-2" name="city" id="city" v-model="selectedCity">
      <option value="" disabled>請選擇縣市</option>
      <option v-for="city in cityOptions" :key="city.value" :value="city.value">
        {{ city.option }}
      </option>
    </select>
    <button type="button" @click="changeCity">
      <img class="w-10 h-10" :src="SearchIcon" alt="search icon" />
    </button>
  </div>
</template>
