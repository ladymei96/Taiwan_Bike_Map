<script setup>
import carousel_1 from '@/statics/assets/banner/carousel_1.jpg';
import carousel_2 from '@/statics/assets/banner/carousel_2.jpg';
import carousel_3 from '@/statics/assets/banner/carousel_3.jpg';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { reactive } from '@vue/reactivity';
const modules = [Pagination, Autoplay];
const imgList = reactive([
  {
    url: carousel_1
  },
  {
    url: carousel_2
  },
  {
    url: carousel_3
  }
]);
</script>

<template>
  <div class="w-full h-screen">
    <swiper
      :pagination="true"
      :autoplay="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(img, index) in imgList" :key="img.url">
        <img
          class="w-full h-full object-cover"
          :src="img.url"
          :alt="`image_${index}`"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
