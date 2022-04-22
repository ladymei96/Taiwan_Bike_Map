<script setup>
import Carousel from '@/components/Carousel.vue';
import TaiwanRidingPNG from '@/statics/assets/TaiwanRiding.png';
import LetGo from '@/statics/assets/Let’sGo.svg';
</script>

<template>
  <div class="relative text-white text-center">
    <div class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2">
      <img
        class="absolute -top-16 sm:-top-20 md:-top-20 left-1/2 md:-left-20 -translate-x-1/2 md:-translate-x-0 w-1/2"
        :src="LetGo"
        alt="Let’s Go"
      />
      <img
        class="mb-3 md:mb-6 w-full md:w-450px"
        :src="TaiwanRidingPNG"
        alt="taiwanRiding"
      />
      <p class="text-xl font-bold">
        台灣的各個美景，都美不勝收。
        <br />
        等你一同來發現這座寶島的奧妙！
      </p>
    </div>
    <Carousel />
  </div>
</template>
