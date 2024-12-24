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
    addFavorites(movie: Movie): void {
      this.favorites.push(movie)
    },
    removeFromFavorites(moviePayload: Movie): void {
      const index = this.favorites.findIndex(movie => movie.imdbID === moviePayload.imdbID);
      if (index !== -1) {
        this.favorites.splice(index, 1);
      }
    }
  },
});
