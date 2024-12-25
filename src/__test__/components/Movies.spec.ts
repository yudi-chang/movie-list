import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import Movies from '@/components/Movies.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import MoviesSearchBar from '@/components/MoviesSearchBar.vue';
import EmptyMovies from '@/components/EmptyMovies.vue';
import FavoritesButton from '@/components/FavoritesButton.vue';
import movieResponse from '@/__test__/mocks/get-movies';

describe('Movie', () => {
  let defaultParams: any;

  const createWrapper = (params: any) => {
    return mount(Movies, params);
  };

  beforeEach(async () => {

    defaultParams = {
      props: {
        movies: [],
        isLoading: false,
        isErrorFetching: false,
        showUtilities: true,
        title: 'Movies',
      },
      global: {
        stubs: {
          ErrorMessage,
          MoviesSearchBar,
          EmptyMovies,
          FavoritesButton
        },
        provide: {
          fetchMovies: vi.fn()
        },
        plugins: [createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        })]
      }
    }
  });

  it('should render Movies list correctly when movies is not empty', async () => {
    defaultParams.props.movies = movieResponse.data;
    const wrapper = createWrapper(defaultParams);

    expect(wrapper.find('[data-test="movies-list"]')).toMatchSnapshot();
  });

  it.each([
    { showUtilities: true, description: 'with utilities' },
    { showUtilities: false, description: 'without utilities' }
  ])('should render correctly when component is ($description)', async ({ showUtilities }) => {
    defaultParams.props.movies = movieResponse.data;
    defaultParams.props.showUtilities = showUtilities;
    const wrapper = createWrapper(defaultParams);

    expect(wrapper.find('[data-test="movies-utilities"]').exists()).toBe(showUtilities);
  });

  it('should show loading when loading is true (fetching data)', () => {
    defaultParams.props.isLoading = true;
    const wrapper = createWrapper(defaultParams);

    expect(wrapper.find('[data-test="loader"]').exists()).toBe(true);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.find('[data-test="movie-item"]').exists()).toBe(false);
  });

  it('should show error when fetching is error and refetch the data when retry-fetch event is emmited', async () => {
    defaultParams.props.isErrorFetching = true;
    const wrapper = createWrapper(defaultParams);

    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
    expect(wrapper.find('[data-test="loader"]').exists()).toBe(false);
    expect(wrapper.find('[data-test="movie-item"]').exists()).toBe(false);

    await wrapper.findComponent(ErrorMessage).vm.$emit('retry-fetch');
    expect(defaultParams.global.provide.fetchMovies).toHaveBeenCalled();
  });

  it('should show empty state when no movies are available', () => {
    const wrapper = createWrapper(defaultParams);

    expect(wrapper.findComponent(EmptyMovies).exists()).toBe(true);
  });
});