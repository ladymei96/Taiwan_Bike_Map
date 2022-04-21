<script setup>
import MarkerIcon from '@/statics/assets/icons/Marker_default.png';
import PhoneIcon from '@/statics/assets/icons/Phone.png';
import TimeIcon from '@/statics/assets/icons/Time_default.png';

import { onMounted, getCurrentInstance } from 'vue';

const props = defineProps({
  singleTourismData: {
    type: Object,
    default() {
      return {};
    }
  }
});

let vueInstance;

const showInfoModal = () => {
  const params = {
    modalName: 'TourismInfoModal',
    options: props.singleTourismData
  };
  vueInstance.$eventBus.$emit('toggleModal', params);
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  vueInstance = proxy;
});
</script>

<template>
  <div class="card bg-white rounded-2xl relative">
    <div
      class="h-52 flex justify-center items-center bg-gray-300 rounded-t-2xl"
    >
      <img
        v-if="singleTourismData.imgUrl"
        :src="singleTourismData.imgUrl"
        alt="image"
        class="w-full h-full object-cover rounded-t-2xl"
      />
      <p v-else class="text-white text-4xl font-bold">No Image</p>
    </div>
    <div class="p-7 grid grid-cols-3 gap-y-2 gap-x-4 text-content">
      <h5
        class="card__text--ellipsis col-span-2 text-dark01 text-3xl font-bold"
      >
        {{ singleTourismData.name }}
      </h5>
      <p class="flex items-center">
        <img class="w-4 mr-1.5" :src="MarkerIcon" alt="marker" />
        <span>{{ singleTourismData.city }}</span>
      </p>
      <p class="col-span-2 flex items-center">
        <img class="w-4 h-4 mr-1.5" :src="TimeIcon" alt="time" />
        <span class="card__text--ellipsis">{{
          singleTourismData.openTime
        }}</span>
      </p>
      <p class="flex items-center">
        <img class="w-4 mr-1.5" :src="PhoneIcon" alt="marker" />
        <span>{{ singleTourismData.phone }}</span>
      </p>
    </div>
    <div
      class="card__mask absolute w-full left-0 bg-gray-500/50 rounded-2xl flex items-center justify-center"
    >
      <button
        class="uppercase text-5xl text-white font-bold"
        @click="showInfoModal"
      >
        See More
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  &:hover {
    .card__mask {
      top: 0;
      height: 100%;
    }
  }
  &__text--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &__mask {
    height: 0;
    bottom: 0;
    transition: all 0.3s;
  }
}
</style>
