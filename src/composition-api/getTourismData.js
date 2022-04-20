import { reactive, computed } from 'vue';
import { getScenicSpotData, getRestaurantData } from '@/api/tdxService.js';
import convertData from '@/utils/convertData.js';

export function getTourismData() {
  const scenicSpot = reactive({ list: [] });
  const restaurant = reactive({ list: [] });

  const isTourismDataReady = computed(() => {
    return scenicSpot.list.length > 0 || restaurant.list.length > 0;
  });

  const fetchTourismData = async city => {
    const params = {
      city,
      spatialFilter: ''
    };
    try {
      const [scenicSpotResult, restaurantResult] = await Promise.all([
        getScenicSpotData(params),
        getRestaurantData(params)
      ]);
      scenicSpot.list = convertData['scenicSpot'](scenicSpotResult);
      restaurant.list = convertData['restaurant'](restaurantResult);
    } catch (error) {
      console.log('Error', error);
    }
  };

  return {
    scenicSpot,
    restaurant,
    isTourismDataReady,
    fetchTourismData
  };
}
