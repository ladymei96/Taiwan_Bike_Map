import { defineStore } from 'pinia';

export const userDevice = defineStore('device', {
  state() {
    return {
      isMobile: false
    };
  },
  getters: {},
  actions: {
    // 除非有要做一些操作，在用 actions
    // changeDevice(val) {
    //   this.isMobile = val;
    // }
  }
});