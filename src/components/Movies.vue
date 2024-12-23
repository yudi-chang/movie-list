
<template>
  <div>
    <Container>
      Movie list
    </Container>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import type { MoviesFetchPayload } from '@/types';
import { useMovieStore } from '@/stores/movie';
import Container from './Container.vue';

const movieStore = useMovieStore();

onBeforeMount(async () => {
  await movieStore.fetchMovies({} as MoviesFetchPayload);
  console.log("movies: ", movieStore.movies);
});
</script>
