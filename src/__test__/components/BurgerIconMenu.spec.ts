import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BurgerIconMenu from '@/components/BurgerIconMenu.vue'

describe('BurgerIconMenu', () => {
  const createWrapper = (params: any) => {
    return mount(BurgerIconMenu, params)
  }

  it('should renders and have menu click working properly', async () => {
    const wrapper = createWrapper({
      props: {
        active: false,
        'onUpdate:active': (e: boolean) => wrapper.setProps({ active: e })
      }
    });
    
    const hamburgerMenu = wrapper.find('[data-test="hamburger-menu"]');
    expect(hamburgerMenu.exists()).toBe(true);
    expect(hamburgerMenu.classes()).not.toContain('active');
    expect(wrapper.props('active')).toBe(false);

    await hamburgerMenu.trigger('click');

    expect(hamburgerMenu.classes()).toContain('active');
    expect(wrapper.props('active')).toBe(true);

    await hamburgerMenu.trigger('click');
    expect(hamburgerMenu.classes()).not.toContain('active');
    expect(wrapper.props('active')).toBe(false);
  })
})
