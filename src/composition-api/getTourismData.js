import { reactive, computed } from 'vue';
import { getScenicSpotData, getRestaurantData } from '@/api/tdxService.js';
import convertData from '@/utils/convertData.js';

export const scenicSpot = reactive({ list: [] });
export const restaurant = reactive({ list: [] });

export const fetchTourismData = async city => {
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
