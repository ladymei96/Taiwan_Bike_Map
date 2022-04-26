import { it, expect, describe } from 'vitest';
import convertData from './convertData.js';

describe('test function covertData', () => {
  it('conert scenicSpot data when input origin data', () => {
    const originScenicSpotData = [
      {
        ScenicSpotName: '巷口',
        DescriptionDetail: '絕對好玩',
        Phone: '123456789',
        OpenTime: '24hr',
        Picture: {
          PictureUrl1: 'url.com'
        },
        City: 'Tainan'
      }
    ];
    const ScenicSpotResult = [
      {
        name: '巷口',
        description: '絕對好玩',
        openTime: '24hr',
        city: 'Tainan',
        class: '未分類',
        phone: '123456789',
        imgUrl: 'url.com'
      }
    ];
    expect(convertData['scenicSpot'](originScenicSpotData)).toEqual(
      ScenicSpotResult
    );
  });
  it('conert restaurant data when input origin data', () => {
    const originRestaurantData = [
      {
        RestaurantName: '山腳下桶仔雞',
        Description: '好吃拉',
        Address: '山腳下',
        OpenTime: '限量100隻，賣完為止',
        City: '宜蘭員山'
      }
    ];
    const restaurantResult = [
      {
        name: '山腳下桶仔雞',
        description: '好吃拉',
        address: '山腳下',
        openTime: '限量100隻，賣完為止',
        city: '宜蘭員山',
        phone: '未提供',
        imgUrl: null
      }
    ];
    expect(convertData['restaurant'](originRestaurantData)).toEqual(
      restaurantResult
    );
  });
});
