import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import Header from '@/components/Header.vue';
import BurgerIconMenu from '@/components/BurgerIconMenu.vue';
import router from '@/router';

describe('Header', () => {
  const createWrapper = (params: any) => {
    return mount(Header, params);
  };

  beforeEach(async () => {
    await router.push('/');
    await router.isReady();
  });

  it('should render header correctly', async () => {
    const wrapper = createWrapper({
      global: {
        plugins: [
          router,
          createTestingPinia({
            stubActions: false,
            createSpy: vi.fn,
          }),
        ],
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should updates active class of nagivation item based curent route', async () => {
    await router.push('/favorites');
    await router.isReady();

    const wrapper = mount(Header, {
      global: {
        plugins: [router, createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })]
      }
    });

    const activeLink = wrapper.find('[data-test="navigation-item"].active');
    expect(activeLink.exists()).toBe(true);
    expect(activeLink.text()).toContain('Favorites');
  });

  it('should toggles mobile menu when BurgerIconMenu is clicked', async () => {
    const wrapper = mount(Header, {
      global: {
        plugins: [router, createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })]
      }
    });

    const burgerMenu = wrapper.findComponent(BurgerIconMenu);
    expect(wrapper.find('nav').classes()).not.toContain('active');

    await burgerMenu.vm.$emit('update:active', true);
    expect(wrapper.find('nav').classes()).toContain('active');

    await router.push('/contact-us');
    expect(wrapper.find('nav').classes()).not.toContain('active');
  });

  
});
