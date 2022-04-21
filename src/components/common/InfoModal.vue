<script setup>
import CloseIcon from '@/statics/assets/icons/Close.png';
import TimeIcon from '@/statics/assets/icons/Time_default.png';
import Type from '@/statics/assets/icons/Type.png';

import { infomationModal } from '@/store';
import { computed } from 'vue';

const props = defineProps({});
/** Store */
const infomationModalStore = infomationModal();

const singleTourismData = computed(() => {
  return infomationModalStore.singleTourismData;
});
const dismissModal = () => {
  infomationModalStore.isInfoModalDisplay = false;
  infomationModalStore.singleTourismData = null;
};
</script>

<template>
  <div
    class="fixed top-0 right-0 bottom-0 left-0 bg-gray-1000/50 text-content z-999"
    @click.self="dismissModal"
  >
    <section
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white px-8 py-6 overflow-auto rounded-md"
    >
      <div class="grid grid-cols-4 gap-3 mb-4">
        <div class="flex justify-between items-center col-span-4">
          <button
            class="order-last bg-gray-800 p-1 rounded"
            @click="dismissModal"
          >
            <img class="w-4" :src="CloseIcon" alt="closeIcon" />
          </button>
          <h5 class="text-3xl font-bold text-default">
            {{ singleTourismData.name }}
          </h5>
        </div>
        <p
          class="flex leading-6 col-span-4"
          :class="{ 'col-span-3': singleTourismData.class }"
        >
          <img class="w-4 h-4 mt-1 mr-1.5" :src="TimeIcon" alt="time" />
          <span> 開放時間：{{ singleTourismData.openTime }} </span>
        </p>
        <p v-if="singleTourismData.class" class="col-span-1 flex">
          <img class="w-5 h-5 mr-1.5" :src="Type" alt="" />
          <span> 分類：{{ singleTourismData.class }} </span>
        </p>
        <p class="col-span-4 text-gray-1000">
          {{ singleTourismData.description }}
        </p>
      </div>
      <div class="h-60 flex justify-center items-center bg-gray-300">
        <img
          class="w-full h-full object-cover"
          v-if="singleTourismData.imgUrl"
          :src="singleTourismData.imgUrl"
          alt="image"
        />
        <p v-else class="text-white text-4xl font-bold">No Image</p>
      </div>
    </section>
  </div>
</template>
