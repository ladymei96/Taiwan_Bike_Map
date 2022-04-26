import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import RoadSearch from 'src/components/RoadNav/RoadSearch.vue';

describe('RoadSearch', () => {
  const wrapper = mount(RoadSearch);
  const city = 'Keelung';
  const RoadOptionList = [
    {
      RouteName: '忠孝東路走一遍'
    },
    {
      RouteName: '忠孝東路走二遍'
    }
  ];
  const road = '忠孝東路走二遍';
  it.skip('select road', async () => {
    wrapper.vm.RoadOptions.list = RoadOptionList;
    await wrapper.get('[data-test="road"]').setValue(road);
    expect(wrapper.vm.selectedRoad).toBe(road);
  });
  it('select city', async () => {
    await wrapper.get('[data-test="city"]').setValue(city);
    expect(wrapper.vm.selectedCity).toBe(city);
  });
  it('change city', async () => {
    const changeCitySpy = vi.spyOn(wrapper.vm, 'changeCity');
    expect(changeCitySpy).not.toHaveBeenCalled();
    await wrapper.vm.changeCity();
    expect(changeCitySpy).toHaveBeenCalled();
  });
  it('reset selectedRoad', () => {
    const resetSpy = vi.spyOn(wrapper.vm, 'resetSelectedRoad');
    expect(resetSpy).not.toHaveBeenCalled();
    wrapper.vm.resetSelectedRoad();
    expect(resetSpy).toHaveBeenCalled();
    expect(wrapper.vm.selectedRoad).toBe('');
  });
  it('trigger submit', async () => {
    const submitSpy = vi.spyOn(wrapper.vm, 'submit');
    await wrapper.get('[data-test="road"]').setValue(road);
    wrapper.vm.submit();
    expect(submitSpy).toHaveBeenCalled();
  });
});
