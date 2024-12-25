import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MoviesSearchBar from '@/components/MoviesSearchBar.vue';
import type { MoviesFetchPayload } from '@/types';

const mockFetchMovies = vi.fn();

describe('MoviesSearchBar', () => {
  const defaultParams =  {
    global: {
      provide: {
        fetchMovies: mockFetchMovies,
      },
    },
  }

  const createWrapper = (params = defaultParams) => {
    return mount(MoviesSearchBar, params);
  };

  beforeEach(() => {
    vi.useFakeTimers();
    mockFetchMovies.mockClear();
  });

  it('should renders correctly', () => {
    const wrapper = createWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should calls fetchMovies when input changes', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('[data-test="search-field"]');

    await input.setValue('water');

    vi.advanceTimersByTime(450);

    expect(mockFetchMovies).toHaveBeenCalledWith({
      Title: 'water',
      page: 1,
    } as MoviesFetchPayload);
  });

  it('should not call fetchMovies if fetchMovies is not provided', async () => {
    const wrapper = createWrapper({} as any);
    const input = wrapper.find('input');

    await input.setValue('water');
    vi.advanceTimersByTime(450);

    expect(mockFetchMovies).not.toHaveBeenCalled();
  });

  it('should debounces input to avoid excessive API calls', async () => {
    const wrapper = createWrapper();
    const input = wrapper.find('input');

    await input.setValue('w');
    await input.setValue('wat');
    await input.setValue('water');

    // before debounce triggers
    vi.advanceTimersByTime(449);
    expect(mockFetchMovies).not.toHaveBeenCalled();

    // debounce triggered
    vi.advanceTimersByTime(1);
    expect(mockFetchMovies).toHaveBeenCalledTimes(1);
    expect(mockFetchMovies).toHaveBeenCalledWith({
      Title: 'water',
      page: 1,
    } as MoviesFetchPayload);
  });
});
