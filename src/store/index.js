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
export const userLocation = defineStore('geolocation', {
  state() {
    return {
      geolocation: null,
      isAllow: false,
      notAllowMsg: 'Geolocation is not supported by your browser',
      errorMsg: 'Unable to retrieve your location',
      spatialFilter: ''
    };
  }
});
export const infomationModal = defineStore('infomation', {
  state() {
    return {
      isInfoModalDisplay: false,
      singleTourismData: null
    };
  }
});
