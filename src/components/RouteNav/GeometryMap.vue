<script setup>
import L from 'leaflet';
import Wkt from 'wicket';

import { onMounted } from 'vue';
import { accessToken } from '@/token.env.js';

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
const wkt = new Wkt.Wkt(); // create wkt instance
const geojsonFeature = wkt.read(props.roadData.Geometry).toJson();

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
  const geometryLis = geojsonFeature.coordinates[0];
  const markerGroup = geometryLis.map(item => {
    return L.marker(item.reverse());
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
