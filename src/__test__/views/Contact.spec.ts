import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Contact from '@/views/Contact.vue'

describe('Contact', () => {
  const defaultParams = {}

  const createWrapper = (params = defaultParams) => {
    return mount(Contact, params)
  }

  it('should renders correctly', async () => {
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  })
})
