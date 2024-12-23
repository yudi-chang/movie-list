import axios from 'axios';
import { defineStore } from 'pinia';
import type { MoviesFetchPayload } from '@/types';

type Movie = {
  Title: string;
  Year: number;
  imdbID: string;
}

type MovieState = {
  movies: Movie[];
  isLoading: boolean;
  isErrorFetching: boolean;
  page: number | string;
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    movies: [],
    isLoading: false,
    isErrorFetching: false,
    page: 1,
  }),
  actions: {
    async fetchMovies(payload: MoviesFetchPayload): Promise<void> {
      try {
        this.isLoading = true;
        this.isErrorFetching = false;
  
        const response = await axios.get('https://jsonmock.hackerrank.com/api/movies/search/', { params: payload });
        // throw here if want to test retry fetch button

        this.movies = response.data.data as Movie[];
        this.page = response.data.page as number;
      } catch {
        this.isErrorFetching = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
