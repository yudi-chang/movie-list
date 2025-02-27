<template>
  <div class="wrapper">
    <button @click="handleFavoritesClick" :class="{ favorited: isFavorite }" class="star-btn" data-test="favorite-btn">
      ★
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/types';
import { computed } from 'vue';
import { useMovieStore } from '@/stores/movie';

// store
const movieStore = useMovieStore();

// props
const props = defineProps<{
  movie: Movie,
}>()

// computed
const isFavorite = computed(() => {
  return props.movie.imdbID in movieStore.favoriteIDs;
})

// methods
const handleFavoritesClick = (): void => {
  if(!isFavorite.value) {
    movieStore.addFavorites(props.movie);
  } else {
    movieStore.removeFromFavorites(props.movie);
  }
};
</script>

<style scoped lang="scss">
.star-btn {
  --bubble-d: 2rem;
  --bubble-r: calc(var(--bubble-d) * 0.5);
  color: #b7dff2;
  font-size: 2em;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  position: relative;
  transition: color 0.3s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: calc(50% - 14.5px);
    left: calc(50% - 16.5px);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transform-origin: 50% 50%;
  }

  &::before {
    margin: -var(--bubble-r);
    width: var(--bubble-d);
    height: var(--bubble-d);
    box-sizing: border-box;
    border: solid var(--bubble-r) #fed700;
    transform: scale(0) translate(-50%, -50%);
    opacity: 0;
  }

  &::after {
    padding: 0.025em;
    z-index: -1;
    box-shadow: 0.25em 0.25em 0.05em #fed700;
  }

  &.favorited {
    color: #fed700;
    will-change: font-size;
    animation: star 1s cubic-bezier(0.17, 0.89, 0.32, 1.49) forwards;

    &::before {
      animation: bubble 1s;
    }

    &::after {
      animation: particles 1.4s;
    }
  }
}

// animations
@keyframes star {
  20% {
    font-size: 0;
  }
  50%,
  100% {
    color: #fed700;
  }
}

@keyframes bubble {
  90% {
    border-width: 1.5px;
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    border-width: 0.5px;
    transform: scale(1.2);
    opacity: 0;
  }
}

@keyframes particles {
  70% {
    opacity: 1;
    padding: 0.025em;
    box-shadow: 0.25em -0.15em 0 0.025em #fed700;
  }
  100% {
    opacity: 0;
    padding: 0;
    box-shadow: 0.25em -0.15em 0 0 #fed700;
  }
}
</style>
