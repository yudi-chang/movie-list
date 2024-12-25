import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { createTestingPinia } from '@pinia/testing';
import Homepage from '@/views/Homepage.vue';
import Movies from '@/components/Movies.vue';
import mock from '@/__test__/mockAxios';
import movieResponse from '@/__test__/mocks/get-movies';
import { defineComponent } from 'vue';

describe('Homepage', () => {
  const getSpy = vi.spyOn(axios, 'get');
  
  const defaultParams = {
    global: {
      stubs: {
        Movies,
        VPagination: defineComponent({
          template: '<div class="v-pagination" @update:modelValue="updatePage" data-test="v-pagination"></div>',
          methods: {
            updatePage() {
              this.$emit('update:modelValue', 2);
            }
          }
        })
      },
      plugins: [
        createTestingPinia({
          stubActions: false,
          createSpy: vi.fn,
        }),
      ]
    }
  };

  const createWrapper = (params = defaultParams) => {
    return mount(Homepage, params);
  };

  beforeEach(() => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    getSpy.mockClear();
    mock.reset();
    mock.onGet('https://jsonmock.hackerrank.com/api/movies/search/').reply(200, movieResponse);
  });

  it('should render loading state initially', async () => {
    const wrapper = createWrapper();

    const moviesComponent = wrapper.findComponent(Movies);

    expect(moviesComponent.exists()).toBe(true);
    expect(moviesComponent.props()).toEqual({
      movies: [],
      isLoading: true,
      isErrorFetching: false,
      showUtilities: true,
      title: 'Movies',
    });
  });

  it('should show movies when data is fetched successfully', async () => {
    const wrapper = createWrapper();
    await flushPromises();

    expect(getSpy).toHaveBeenCalledWith('https://jsonmock.hackerrank.com/api/movies/search/', {
      params: {}
    });

    const moviesComponent = wrapper.findComponent(Movies);

    expect(moviesComponent.exists()).toBe(true);
    expect(moviesComponent.props()).toEqual({
      movies: movieResponse.data,
      isLoading: false,
      isErrorFetching: false,
      showUtilities: true,
      title: 'Movies',
    });
  });

  it('should show an error message when fetch fails', async () => {
    mock.onGet('https://jsonmock.hackerrank.com/api/movies/search/').reply(500);

    const wrapper = createWrapper();
    await flushPromises();

    const moviesComponent = wrapper.findComponent(Movies);
    expect(moviesComponent.exists()).toBe(true);
    expect(moviesComponent.props().isErrorFetching).toBe(true);
  });

  it('should call onPageChange and retrieve movies with correct params when pagination changes', async () => {
    const wrapper = createWrapper();
    await flushPromises();

    const pagination = wrapper.find('[data-test="v-pagination"');
    const newPage = 2;
    pagination.trigger('update:modelValue', { value: newPage });
    await flushPromises();

    expect(getSpy).toHaveBeenCalledWith('https://jsonmock.hackerrank.com/api/movies/search/', {
      params: {
        Title: '',
        page: newPage,
      }
    });
  });
});
