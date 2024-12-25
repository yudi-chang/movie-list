import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '@/components/ErrorMessage.vue'

describe('ErrorMessage', () => {
  const defaultParams = {};

  const createWrapper = (params = defaultParams) => {
    return mount(ErrorMessage, params)
  }

  it('should renders and have button click working properly (emit retry-fetch)', async () => {
    const wrapper = createWrapper();
    
    const errorMessage = wrapper.find('[data-test="error-message-wrapper"]');
    expect(errorMessage).toMatchSnapshot();

    await wrapper.find('[data-test="retry-btn"]').trigger('click');
    expect(wrapper.emitted('retry-fetch')).toBeTruthy();
    expect(wrapper.emitted('retry-fetch')?.length).toBe(1);
  })
})
