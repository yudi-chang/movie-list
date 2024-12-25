import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Favorites from '@/views/Favorites.vue'
import { createTestingPinia } from '@pinia/testing';
import movieResponse from '@/__test__/mocks/get-movies';
import { useMovieStore } from '@/stores/movie';
import Movies from '@/components/Movies.vue';
import Container from '@/components/Container.vue';

describe('Favorites', () => {
  let movieStore;
  let pinia: ReturnType<typeof createTestingPinia>;

  const createWrapper = (params: any) => {
    return mount(Favorites, params)
  }

  beforeEach(() => {
    pinia = createTestingPinia({ createSpy: vi.fn });
    movieStore = useMovieStore();
    movieStore.favorites = movieResponse.data;
  });

  it('should renders correctly', async () => {
    const wrapper = createWrapper({
      global: {
        plugins: [pinia],
        stubs: { Container, Movies },
      },
    });
    const moviesComponent = wrapper.findComponent(Movies);

    expect(moviesComponent.exists()).toBe(true);
    expect(moviesComponent.props()).toEqual({
      movies: movieResponse.data,
      isLoading: false,
      isErrorFetching: false,
      showUtilities: false,
      title: 'Favorites',
    });
  })
})
