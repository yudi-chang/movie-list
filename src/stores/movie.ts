import { defineStore } from 'pinia';
import type { Movie } from '@/types';

type MovieState = {
  favorites: Movie[];
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    favorites: [],
  }),
  actions: {
  },
});
