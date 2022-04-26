import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import StationSearch from 'src/components/Station/StationSearch.vue';

describe('StationSearch', () => {
  const wrapper = mount(StationSearch);
  const city = 'Taipei';

  it('select city', async () => {
    await wrapper.get('[data-test="city"]').setValue(city);
    expect(wrapper.vm.selectedCity).toBe(city);
  });
  it('emit city', async () => {
    await wrapper.get('[data-test="city"]').setValue(city);
    await wrapper.get('[data-test="submit"]').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('updateCity');
  });
});
