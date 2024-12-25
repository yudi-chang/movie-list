import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Container from '@/components/Container.vue'

describe('Container', () => {
  const defaultParams = {}

  const createWrapper = (params = defaultParams) => {
    return mount(Container, params)
  }

  it('should renders correctly', async () => {
    // no logic in this component, so just use matchSnapshot
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  })
})
