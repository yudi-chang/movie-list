import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia';
import { useMovieStore } from '@/stores/movie';
import FavoritesButton from '@/components/FavoritesButton.vue'
import movieResponse from '@/__test__/mocks/get-movies'

describe('FavoritesButton', () => {
  const mockedMovie = movieResponse.data[2]
  const defaultParams = {
    props: {
      movie: mockedMovie
     }
  };

  const createWrapper = (params = defaultParams) => {
    return mount(FavoritesButton, params)
  }

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add to favorites when button is clicked and movie is not favorited, remove from favorites when button is clicked and movie is favorited', async () => {
    const movieStore = useMovieStore();
    const wrapper = createWrapper();

    const button = wrapper.find('[data-test="favorite-btn"]');
    expect(movieStore.favoriteIDs).not.toHaveProperty(mockedMovie.imdbID);
    expect(button.classes()).not.toContain('favorited');

    await button.trigger('click');

    expect(movieStore.favoriteIDs).toHaveProperty(mockedMovie.imdbID);
    expect(button.classes()).toContain('favorited');

    await button.trigger('click');

    expect(movieStore.favoriteIDs).not.toHaveProperty(mockedMovie.imdbID);
    expect(button.classes()).not.toContain('favorited');
  })
})
