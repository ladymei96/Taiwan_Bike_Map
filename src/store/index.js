import { defineStore } from 'pinia';

export const userDevice = defineStore('device', {
  state() {
    return {
      isMobile: false
    };
  },
  getters: {},
  actions: {}
});
export const userLocation = defineStore('geolocation', {
  state() {
    return {
      geolocation: null,
      notAllowMsg: 'Unable to retrieve your location',
      errorMsg: 'Geolocation is not supported by your browser'
    };
  }
});
