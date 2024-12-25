import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia';
import { useMovieStore } from '@/stores/movie';
import FavoritesCounter from '@/components/FavoritesCounter.vue'
import movieResponse from '@/__test__/mocks/get-movies'

describe('FavoritesCounter', () => {
  const defaultParams = {};

  const createWrapper = (params = defaultParams) => {
    return mount(FavoritesCounter, params)
  }

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should render counter correctly', async () => {
    const movieStore = useMovieStore();
    const wrapper = createWrapper();

    movieStore.addFavorites(movieResponse.data[0])
    movieStore.addFavorites(movieResponse.data[1])
    movieStore.addFavorites(movieResponse.data[2])
    await wrapper.vm.$nextTick()

    expect(wrapper.find('[data-test="counter-wrapper"]')).toMatchSnapshot();
  })
})
