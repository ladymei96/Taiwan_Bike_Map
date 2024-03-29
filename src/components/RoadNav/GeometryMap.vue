<script setup>
import markerIcon from '@/statics/assets/icons/CustomMarker.png';

import { onMounted } from 'vue';
import { accessToken } from '@/ptxToken.env.js';
import L from 'leaflet';
import Wkt from 'wicket';

const props = defineProps({
  roadData: {
    type: Object,
    default() {
      return {};
    }
  }
});

let map = null;
let markers = null;
const MARKER_MAX_COUNT = 300;
/** create wkt instance */
const wkt = new Wkt.Wkt();
const geojsonFeature = wkt.read(props.roadData.Geometry).toJson();

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [22, 26]
});

const initMap = ({ accessToken, latitude, longitude }) => {
  map = L.map('geoMap').setView([longitude, latitude], 17);
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
const polyLine = () => {
  const customStyle = {
    color: 'red',
    weight: 5,
    opacity: 0.65
  };
  const myLayer = L.geoJSON(geojsonFeature, {
    style: customStyle
  }).addTo(map);
  myLayer.addData(geojsonFeature);
  map.fitBounds(myLayer.getBounds());
};
const setMarker = () => {
  const geometryList = [].concat(...geojsonFeature.coordinates);
  if (geometryList.length > MARKER_MAX_COUNT) return;
  const markerGroup = geometryList.map((item, index) => {
    return L.marker(item.reverse(), { icon: customIcon });
  });
  markers = L.layerGroup(markerGroup);
  markers.addTo(map);
};

onMounted(() => {
  /** get first position as center point for init map */
  const [firstEle] = geojsonFeature.coordinates[0];
  const [latitude, longitude] = firstEle;
  initMap({ accessToken, latitude, longitude });
  polyLine();
  setMarker();
});
</script>

<template>
  <div id="geoMap" class="w-full h-full relative z-10"></div>
</template>
