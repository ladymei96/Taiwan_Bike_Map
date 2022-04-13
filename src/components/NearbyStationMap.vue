<script setup>
import L from 'leaflet';
import { onMounted, ref } from 'vue';
import { userLocation } from '@/store';
import { storeToRefs } from 'pinia';

const props = defineProps({
  stationInfoList: {
    type: Array,
    default() {
      return [];
    }
  }
});
const emit = defineEmits(['updateSingleStation']);

const geoLocationStore = userLocation();
const {
  geolocation: {
    value: { latitude, longitude }
  }
} = storeToRefs(geoLocationStore);

let map = ref(undefined);
const accessToken =
  'pk.eyJ1IjoibWVpY2hhbmc5NiIsImEiOiJjbDF2aXVreDUwOXhsM2ltcDdxdjVlMjh6In0.N5g5J3R0DGo7xfkuZ4DsCA';

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
  const targetStation = props.stationInfoList
    .filter(({ StationPosition: { PositionLat, PositionLon } }) => {
      return lat === PositionLat && lng === PositionLon;
    })
    .shift();
  emit('updateSingleStation', targetStation);
};

onMounted(() => {
  initMap({ accessToken, latitude, longitude });
  setMarker();
});
</script>

<template>
  <div id="map" class="w-full h-full relative z-10"></div>
</template>
