<script setup>
import RoadInfoModal from '@/components/Modal/RoadInfoModal.vue';
import TourismInfoModal from '@/components/Modal/TourismInfoModal.vue';

import { onMounted, reactive, getCurrentInstance } from 'vue';
import { MODAL_TYPES } from '@/components/Modal/modal_config.js';

const emit = defineEmits(['updateModalState']);

let vueInstance;
const modalParams = reactive({
  name: '',
  options: null
});

const dismissHandler = () => {
  modalParams.name = '';
  modalParams.options = null;
  emit('updateModalState', false);
};
const registerEventBus = () => {
  vueInstance.$eventBus.$on(
    'toggleModal',
    ({ modalName = '', options = {} }) => {
      modalParams.name = modalName;
      modalParams.options = options;
      emit('updateModalState', true);
    }
  );
};

onMounted(() => {
  const { proxy } = getCurrentInstance();
  vueInstance = proxy;
  registerEventBus();
});
</script>

<template>
  <TransitionGroup name="slide" appear>
    <RoadInfoModal
      v-if="modalParams.name === MODAL_TYPES.ROAD_INFO_MODAL"
      :options="modalParams.options"
      @dismiss="dismissHandler"
    />
    <TourismInfoModal
      v-if="modalParams.name === MODAL_TYPES.TOURISM_INFO_MODAL"
      :options="modalParams.options"
      @dismiss="dismissHandler"
    />
  </TransitionGroup>
</template>

<style lang="scss" scoped>
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
}
</style>
