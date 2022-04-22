<script setup>
import CloseIcon from '@/statics/assets/icons/Close.png';
import TimeIcon from '@/statics/assets/icons/Time_default.png';
import PhoneIcon from '@/statics/assets/icons/Phone.png';
import TypeIcon from '@/statics/assets/icons/Type.png';
import ModalBlock from '@/components/Modal/ModalBlock.vue';

const props = defineProps({
  options: {
    type: Object,
    default() {
      return {};
    }
  }
});
const emit = defineEmits(['dismiss']);

const dismissModal = () => {
  emit('dismiss');
};
</script>

<template>
  <ModalBlock @dismissModal="dismissModal">
    <section
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12 lg:w-1/2 h-4/5 lg:h-1/2 bg-white px-8 py-6 overflow-auto rounded-md"
    >
      <div class="grid grid-cols-4 gap-3 mb-4">
        <header
          class="flex justify-between items-start lg:items-center col-span-4"
        >
          <button
            class="order-last bg-gray-800 p-1 rounded"
            @click="dismissModal"
          >
            <img class="w-4" :src="CloseIcon" alt="closeIcon" />
          </button>
          <h5 class="text-3xl font-bold text-default">
            {{ options.name }}
          </h5>
        </header>
        <p
          class="flex leading-6 col-span-4 md:col-span-4"
          :class="{ 'md:col-span-3': options.class }"
        >
          <img class="w-5 h-5 mt-1 mr-1.5" :src="TimeIcon" alt="time" />
          <span> 開放時間：{{ options.openTime }} </span>
        </p>
        <p v-if="options.class" class="col-span-4 md:col-span-1 flex">
          <img class="w-5 h-5 mr-1.5" :src="TypeIcon" alt="" />
          <span> 分類：{{ options.class }} </span>
        </p>
        <p class="col-span-4 flex">
          <img class="w-5 h-5 mr-1.5" :src="PhoneIcon" alt="" />
          <span> 聯絡資訊：{{ options.phone }} </span>
        </p>
        <p class="col-span-4 md:col-span-2 text-gray-1000 indent-8">
          {{ options.description }}
        </p>
        <div
          class="col-span-4 md:col-span-2 h-60 flex justify-center items-center bg-gray-300"
        >
          <img
            class="w-full h-full object-cover"
            v-if="options.imgUrl"
            :src="options.imgUrl"
            alt="image"
          />
          <p v-else class="text-white text-4xl font-bold">No Image</p>
        </div>
      </div>
    </section>
  </ModalBlock>
</template>
