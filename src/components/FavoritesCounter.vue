<template>
  <div class="counter-wrapper text-xs">
    {{ movieStore.favoritesCount }}
  </div>
</template>

<script setup lang="ts">
import { useMovieStore } from '@/stores/movie';

// store
const movieStore = useMovieStore();
</script>

<style scoped lang="scss">
.counter-wrapper {
  border-radius: 5px;
  padding: 0 5px;
  position: absolute;
  right: -10px;
  top: 0;
  background-color: #e74c3c;
}


@media (max-width: $breakpoint-sm) {
  .counter-wrapper {
    right: -15px;
    top: -20px;
  }
}
</style>