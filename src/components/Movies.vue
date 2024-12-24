
<template>
  <div>
    <template v-if="!props.isErrorFetching">
      <h1 class="mb-28 text-3xl fw-bold">Movies</h1>
      <MoviesSearchBar />
    </template>
    <div class="movies mt-40">
      <div v-if="props.isLoading" class="loader"></div>
      <template v-else-if="props.isErrorFetching">
        <ErrorMessage @retry-fetch="refetchMovies()"/>
      </template>
      <template v-else>
        <template v-if="movies.length === 0">
          <EmptyMovies />
        </template>
        <template v-else>
          <div v-for="movie in props.movies" :key="movie.imdbID" class="movie-card">
            <article>
              <div class="movie-img">
                <img :src="`https://placehold.co/400x500/34495e/FFF?text=${movie.Title.slice(0, 10).replace(/ /g, '+')}`" :alt="`Image of ${movie.Title.slice(0, 10)}`" />
              </div>
              <div class="movie-info text-md fw-bold p-20 ph-16">
                <h2>{{ movie.Title }}</h2>
                <div class="additional-info">
                  <a :href="`https://www.imdb.com/title/${movie.imdbID}/`" target="_blank" class="imdb-info text-sm ph-12 pv-4 fw-bold"> 
                    IMDb: {{ movie.imdbID }}
                  </a>
                  <div class="text-sm mv-12 ph-12 pv-4 fw-bold year-info">Release: {{ movie.Year }}</div>
                </div>
              </div>
            </article>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types';
import { inject } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import MoviesSearchBar from './MoviesSearchBar.vue';
import EmptyMovies from './EmptyMovies.vue';

// props
const props = defineProps<{
  movies: Movie[]
  isLoading: boolean
  isErrorFetching: boolean
}>()

// inject
const fetchMovies = inject<() => void>('fetchMovies')

const refetchMovies = (): void => {
  if (fetchMovies) {
    fetchMovies()
  }
}
</script>

<style scoped lang="scss">
.loader {
  margin: 15% auto 15% auto;
}

.movies {
  display: flex;
  flex-wrap: wrap; 
  gap: 35px; 
  justify-content: flex-start;

  * {
    color: $secondary-color;
  }

  .movie-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    width: calc(25% - 30px);
    box-sizing: border-box;
    transition: box-shadow 0.3s ease-in-out, width 0.3s ease-in-out;
    position: relative;
    margin-bottom: 25px;

    &:hover {
      box-shadow: 0 8px 16px $primary-color, 0 8px 32px $primary-color;

      .movie-img {
        
        img {
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }

    .movie-info {
      text-align: center;
    }

    .additional-info {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;

      > * {
        border-radius: 5px;
        flex-grow: 0;
        width: auto;
      }

      .imdb-info {
        background-color: #f1c40f;
        color: $primary-color;
      }

      .year-info {
        background-color: #2980b9;
      }
    }

    article {
      width: 100%;
    }

    .movie-img {
      width: 100%;
      padding-top: 125%;
      overflow: hidden;
      position: relative;
      overflow: hidden;
      transition: box-shadow 0.3s ease-in-out, width 0.3s ease-in-out;

      img {
        transition: transform 0.3s ease;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
      }
    }

    a {
      width: 100%;
    }

    p {
      font-size: 1em;
      color: #333;
    }
  }
}

// responsive
@media (max-width: $breakpoint-lg) {
  .movies {
    gap: 20px; 

    .movie-card {
      width: calc(33.333% - 20px);
    }
  }
}

@media (max-width: $breakpoint-md) {
  .movies {
    gap: 15px; 

    .movie-card {
      width: calc(50% - 10px);
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .movies {
    .movie-card {
      width: calc(100% - 10px);
    }
  }
}
</style>
