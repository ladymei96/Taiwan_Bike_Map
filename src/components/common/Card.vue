<script setup>
import MarkerIcon from '@/statics/assets/icons/Marker_default.png';
import TimeIcon from '@/statics/assets/icons/Time_default.png';

const props = defineProps({
  singleTourismData: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>

<template>
  <div class="w-full bg-white rounded-2xl">
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
      <h5 class="col-span-2 text-dark01 text-3xl font-bold">
        {{ singleTourismData.name }}
      </h5>
      <p class="flex items-center">
        <img class="w-5 h-5 mr-1.5" :src="MarkerIcon" alt="marker" />
        <span>{{ singleTourismData.city }}</span>
      </p>
      <p class="col-span-2 flex items-center">
        <img class="w-4 h-4 mr-1.5" :src="TimeIcon" alt="time" />
        <span class="card__openTime">{{ singleTourismData.openTime }}</span>
      </p>
      <p class="flex items-center">
        <img class="w-5 h-5 mr-1.5" :src="MarkerIcon" alt="marker" />
        <span>{{ singleTourismData.phone }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.card__openTime {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
