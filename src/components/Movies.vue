
<template>
  <div>
    <Container>
      <h1 v-if="!isErrorFetching" class="mb-28 text-3xl fw-bold">Movies</h1>
      <div class="movies">
        <div v-if="isLoading" class="loader"></div>
        <template v-else-if="isErrorFetching">
          <ErrorMessage @retry-fetch="refetchMovies()"/>
        </template>
        <template v-else>
          <div v-for="movie in movies" :key="movie.imdbID" class="movie-card">
            <article>
              <div class="movie-img">
                <img :src="`https://placehold.co/400x500/34495e/FFF?text=${movie.Title.slice(0, 10).replace(/ /g, '+')}`" :alt="`Image of ${movie.Title.slice(0, 10)}`" loading="lazy" />
              </div>
              <div class="movie-info pt-16 pb-4 ph-16">
                <h2 class="fw-normal">{{ movie.Title }}</h2>
                <div class="mv-12 fw-bold">{{ movie.imdbID }}</div>
                <div class="mv-12 fw-bold">{{ movie.Year }}</div>
              </div>
            </article>
          </div>
        </template>
      </div>
    </Container>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types';
import { inject, defineProps } from 'vue';
import ErrorMessage from './ErrorMessage.vue';
import Container from './Container.vue';

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
  margin: 15% auto 0 auto;
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
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    width: calc(25% - 35px);
    box-sizing: border-box;
    transition: box-shadow 0.3s ease-in-out, width 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 8px 16px $primary-color, 0 8px 32px $primary-color;

      .movie-img {
        
        img {
          transform: translate(-50%, -50%) scale(1.2);
        }
      }
    }

    article {
      width: 100%;
    }

    .movie-img {
      width: 100%;
      padding-top: 125%;
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
