<script setup>
import DefaultIcon from '@/assets/icons/Default.svg';
import ActiveIcon from '@/assets/icons/Active.svg';
import NotActIcon from '@/assets/icons/NotAct.svg';

import L from 'leaflet';
import { onMounted, reactive, ref, watch } from 'vue';
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

let map = null;
let markers = null;
let currentIndex = 0;
const customIcons = reactive({ icons: {} });

/** Store */
const geoLocationStore = userLocation();
const {
  geolocation: {
    value: { latitude, longitude }
  }
} = storeToRefs(geoLocationStore);

watch(
  () => props.stationInfoList,
  newVal => {
    setMarker(customIcons.icons);
  },
  { deep: true }
);

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

const setCustomIcons = () => {
  const CustomIcon = L.Icon.extend({
    options: {
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76]
    }
  });
  const defaultIcon = new CustomIcon({ iconUrl: DefaultIcon }),
    activeIcon = new CustomIcon({
      iconUrl: ActiveIcon,
      iconSize: [50, 50],
      iconAnchor: [29, 101]
    }),
    notActIcon = new CustomIcon({ iconUrl: NotActIcon });
  L.icon = options => {
    return new L.Icon(options);
  };
  return {
    defaultIcon,
    activeIcon,
    notActIcon
  };
};

const setMarker = ({ defaultIcon, activeIcon, notActIcon }) => {
  if (markers) {
    map.removeLayer(markers);
  }
  const markerGroup = props.stationInfoList.map(
    ({ StationPosition, StationName, ServiceStatus, isActive }) => {
      const icon = isActive
        ? activeIcon
        : ServiceStatus === 1
        ? defaultIcon
        : notActIcon;
      return L.marker(
        [StationPosition.PositionLat, StationPosition.PositionLon],
        { icon }
      )
        .bindPopup(StationName.Zh_tw)
        .on('click', markerClick);
    }
  );
  const userMaker = L.marker([latitude, longitude]).bindPopup('目前位置');
  markerGroup.push(userMaker);

  markers = L.layerGroup(markerGroup);
  markers.addTo(map);
  markerGroup[currentIndex].openPopup();
};

const markerClick = val => {
  const { lat, lng } = val.latlng;
  const newStationInfoList = props.stationInfoList.map((item, index) => {
    const isActive =
      item.StationPosition.PositionLat === lat &&
      item.StationPosition.PositionLon === lng;
    if (isActive) currentIndex = index;
    return { ...item, isActive };
  });
  emit('updateStationStatus', newStationInfoList); // 待優化：是不是可以改成 sync?
};

onMounted(() => {
  initMap({ accessToken, latitude, longitude });
  customIcons.icons = setCustomIcons();
  setMarker(customIcons.icons);
});
</script>

<template>
  <div id="map" class="w-full h-full relative z-10"></div>
</template>
