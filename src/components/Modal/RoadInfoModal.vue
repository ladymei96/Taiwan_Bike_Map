<script setup>
import CloseIcon from '@/statics/assets/icons/Close.png';
import TimeIcon from '@/statics/assets/icons/Time_default.png';

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
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-3/5 bg-white px-8 py-6 overflow-auto rounded-md"
    >
      <div class="grid grid-cols-4 gap-x-7 gap-y-3 mb-4">
        <header class="flex justify-between items-center col-span-4">
          <button
            class="order-last bg-gray-800 p-1 rounded"
            @click="dismissModal"
          >
            <img class="w-4" :src="CloseIcon" alt="closeIcon" />
          </button>
          <h5 class="text-3xl font-bold text-default">
            {{ options.RouteName }}
          </h5>
        </header>
        <p class="col-span-4">
          負責單位：{{
            options.AuthorityName ? options.AuthorityName : '未提供'
          }}
        </p>
        <p class="col-span-2">
          縣市：{{ options.City ? options.City : '未提供' }}
        </p>
        <p class="col-span-2">
          鄉鎮：{{ options.Town ? options.Town : '未提供' }}
        </p>
        <p class="col-span-2">
          起始點：{{
            options.RoadSectionStart ? options.RoadSectionStart : '未提供'
          }}
        </p>
        <p class="col-span-2">
          終點：{{ options.RoadSectionEnd ? options.RoadSectionEnd : '未提供' }}
        </p>
        <p class="col-span-4">
          方向：{{ options.Direction ? options.Direction : '未提供' }}
        </p>
      </div>
      <div class="h-60 flex justify-center items-center bg-gray-300">
        <img
          class="w-full h-full object-cover"
          v-if="options.ImgUrl"
          :src="options.ImgUrl"
          alt="viewImage"
        />
        <p v-else class="text-white text-4xl font-bold">No Image</p>
      </div>
    </section>
  </ModalBlock>
</template>
