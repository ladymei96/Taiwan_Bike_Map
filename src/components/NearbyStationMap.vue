<script setup>
import L from 'leaflet';
import { onMounted, ref } from 'vue';
import { userLocation } from '@/store';
import { storeToRefs } from 'pinia';
import { accessToken } from '@/token.env.js';

const props = defineProps({
  stationInfoList: {
    type: Array,
    default() {
      return [];
    }
  }
});
const emit = defineEmits(['updateStationStatus']);

const geoLocationStore = userLocation();
const {
  geolocation: {
    value: { latitude, longitude }
  }
} = storeToRefs(geoLocationStore);

let map = ref(undefined);

const initMap = ({ accessToken, latitude, longitude }) => {
  map = L.map('map').setView([latitude, longitude], 16);
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`,
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken
    }
  ).addTo(map);
  return map;
};
const setMarker = () => {
  // 這邊處理 icon?
  const markerGroup = props.stationInfoList.map(
    ({ StationPosition, StationName }) => {
      return L.marker([
        StationPosition.PositionLat,
        StationPosition.PositionLon
      ])
        .bindPopup(StationName.Zh_tw)
        .on('click', markerClick);
    }
  );
  const stations = L.layerGroup(markerGroup);
  stations.addTo(map);
  markerGroup[0].openPopup();
};

const markerClick = val => {
  const { lat, lng } = val.latlng;
  const newStationInfoList = props.stationInfoList.map(item => {
    const isActive =
      item.StationPosition.PositionLat === lat &&
      item.StationPosition.PositionLon === lng;
    return { ...item, isActive };
  });
  emit('updateStationStatus', newStationInfoList); // 待優化：是不是可以改成 sync?
};

onMounted(() => {
  initMap({ accessToken, latitude, longitude });
  setMarker();
});
</script>

<template>
  <div id="map" class="w-full h-full relative z-10"></div>
</template>
