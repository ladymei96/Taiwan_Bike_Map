import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Header from '/src/components/common/Header.vue';
import { createTestingPinia } from '@pinia/testing';
import { userDevice } from '@/store';

describe('Header', () => {
  it('is mobileLogo exists', async () => {
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [createTestingPinia()]
        /** When using vitest with globals: true
         * if globals: false, need to provide a createSpy option
         * createTestingPinia({
         *  createSpy: vi.fn()
         * })
         */
      }
    });
    const deviceStore = userDevice();
    expect(wrapper.findComponent('[data-test="mobileLogo"]').exists()).toBe(
      false
    );
    await deviceStore.$patch({ isMobile: true });
    expect(wrapper.findComponent('[data-test="mobileLogo"]').exists()).toBe(
      true
    );
  });
});
