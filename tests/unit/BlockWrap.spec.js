import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import BlockWrap from 'src/components/common/BlockWrap.vue';

describe('BlockWrap', () => {
  const wrapper = mount(BlockWrap);

  it('always render title with props', async () => {
    await wrapper.setProps({ title: '熱門路線' });
    const title = wrapper.get('[data-test="title"]');
    expect(title.text()).toContain('熱門路線');
  });

  it('does not render a description', () => {
    expect(wrapper.find('[data-test="description"]').exists()).toBe(false);
  });

  it('only render description when description with props', async () => {
    await wrapper.setProps({ description: '四大精選路線，推薦給你。' });
    expect(wrapper.find('[data-test="description"]').text()).toBe(
      '四大精選路線，推薦給你。'
    );
  });
});
