import { defineStore } from 'pinia';
import type { Movie } from '@/types';

type FavoriteMap = {
  [key: string]: string,
};

type MovieState = {
  favorites: Movie[]
  favoriteIDs: FavoriteMap
}

export const useMovieStore = defineStore('movie', {
  state: (): MovieState => ({
    favorites: [],
    // favoriteIDs used to store list of movie's imdb ID as object. 
    // isFavorite computed check in <FavoritesButton> component will only need to check if id is in object 
    // this increase performance / reduce complexity instead of checking isFavorite by checking / looping through array "favorites"
    favoriteIDs: {},
  }),
  actions: {
    addFavorites(movie: Movie): void {
      this.favorites.push(movie)
      this.favoriteIDs[movie.imdbID] = '';
      // this.saveToLocalStorage();
    },
    removeFromFavorites(moviePayload: Movie): void {
      const index = this.favorites.findIndex(movie => movie.imdbID === moviePayload.imdbID);
      if (index !== -1) {
        this.favorites.splice(index, 1);
        delete this.favoriteIDs[moviePayload.imdbID];
        // this.saveToLocalStorage();
      }
    },
    // while I did use third party library for persistent state, it can be done manually
    // I commented out the code to do it manually below
    // to use this manual persistent, uncomment the code below and uncomment saveToLocalStorage call in above actions,
    // remove the persis: {} section and remove pinia-plugin-persistedstate import in main.ts,
    // as for loadFromLocalStore, either call it in main.ts (preferable) or any .vue page that you need to use the state in
    
    // saveToLocalStorage() {
    //   const data = JSON.stringify({
    //     favorites: this.favorites,
    //     favoriteIDs: this.favoriteIDs
    //   });
    //   localStorage.setItem('movieStore', data);
    // },
    // loadFromLocalStorage() {
    //   const data = localStorage.getItem('movieStore');
    //   if (data) {
    //     const parsed = JSON.parse(data);
    //     this.favorites = parsed.favorites || [];
    //     this.favoriteIDs = parsed.favoriteIDs || {};
    //   }
    // }
  },
  persist: {
    // can be sessionStorage for session persistence
    storage: localStorage,
    // uncomment this if only want to choose what state to be persistent (since I need both state, i'll not use this)
    // paths: ['favoriteIDs'],
  }
});
