import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyMovies from '@/components/EmptyMovies.vue'

describe('EmptyMovies', () => {
  const defaultParams = {}

  const createWrapper = (params = defaultParams) => {
    return mount(EmptyMovies, params)
  }

  it('should renders correctly', async () => {
    // no logic in this component, so just use matchSnapshot
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  })
})
