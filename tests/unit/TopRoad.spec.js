import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TopRoad from '/src/components/TopRoad.vue';

describe('TopRoad', () => {
  it('first road is 七股瀉湖自行車道', () => {
    const wrapper = mount(TopRoad);
    const firstRoad = wrapper.findAll('[data-test="routeName"]')[0];
    expect(firstRoad.text()).toBe('七股瀉湖自行車道');
  });
});
