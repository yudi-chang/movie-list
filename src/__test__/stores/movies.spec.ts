import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMovieStore } from '@/stores/movie';
import type { Movie } from '@/types';
import movieResponse from '@/__test__/mocks/get-movies'

describe('Movie Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('favoritesCount', () => {
    it('should return correct favourites count', async () => {
      const movieStore = useMovieStore()
      expect(movieStore.favoritesCount).toBe(0)

      movieStore.addFavorites(movieResponse.data[0])
      movieStore.addFavorites(movieResponse.data[1])
      movieStore.addFavorites(movieResponse.data[2])

      expect(movieStore.favoritesCount).toBe(3)

      movieStore.removeFromFavorites(movieResponse.data[1])

      expect(movieStore.favoritesCount).toBe(2)
    })
  })

  describe('addFavorites', () => {
    it('should correctly add favorites to favorites state and favoriteIDs state', async () => {
      const movieStore = useMovieStore()
      expect(movieStore.favorites).toEqual([])
      expect(movieStore.favoriteIDs).toEqual({})

      movieStore.addFavorites(movieResponse.data[0])
      movieStore.addFavorites(movieResponse.data[4])
      movieStore.addFavorites(movieResponse.data[7])

      expect(movieStore.favorites).toEqual([
        movieResponse.data[0],
        movieResponse.data[4],
        movieResponse.data[7],
      ])

      expect(movieStore.favoriteIDs).toEqual({
        [movieResponse.data[0].imdbID]: '',
        [movieResponse.data[4].imdbID]: '',
        [movieResponse.data[7].imdbID]: '',
      })
    })
  })

  
  describe('removeFromFavorites', () => {
    it('should correctly remove favorites from favorites state and favoriteIDs state', async () => {
      const movieStore = useMovieStore()
      expect(movieStore.favorites).toEqual([])
      expect(movieStore.favoriteIDs).toEqual({})

      movieStore.addFavorites(movieResponse.data[0])
      movieStore.addFavorites(movieResponse.data[4])
      movieStore.addFavorites(movieResponse.data[7])

      expect(movieStore.favorites).toEqual([
        movieResponse.data[0],
        movieResponse.data[4],
        movieResponse.data[7],
      ])

      expect(movieStore.favoriteIDs).toEqual({
        [movieResponse.data[0].imdbID]: '',
        [movieResponse.data[4].imdbID]: '',
        [movieResponse.data[7].imdbID]: '',
      })

      movieStore.removeFromFavorites(movieResponse.data[4])

      expect(movieStore.favorites).toEqual([
        movieResponse.data[0],
        movieResponse.data[7],
      ])

      expect(movieStore.favoriteIDs).toEqual({
        [movieResponse.data[0].imdbID]: '',
        [movieResponse.data[7].imdbID]: '',
      })
    })
  })
})
