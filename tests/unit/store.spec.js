import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { userDevice, userLocation } from '@/store';

describe('store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('test user device', async () => {
    const deviceStore = userDevice();
    expect(deviceStore.isMobile).toBe(false);
    deviceStore.$patch({ isMobile: true });
    expect(deviceStore.isMobile).toBe(true);
  });
  it('test user location', () => {
    const geoLocationStore = userLocation();
    const geolocation = {
      latitude: 121.29042,
      longitude: 25.00722
    };
    geoLocationStore.$patch({ geolocation });
    expect(geoLocationStore.geolocation).toEqual(geolocation);
  });
});
