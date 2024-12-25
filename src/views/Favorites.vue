<template>
  <main class="pb-16">
    <Container>
      <!-- no fetch in this page, so isLoading and isErrorFetching will be false-->
      <Movies :movies="movieStore.favorites" :is-loading="false" :is-error-fetching="false" :show-utilities="false" title="Favorites"/>
    </Container>
  </main>
</template>

<script setup lang="ts">
import Movies from '../components/Movies.vue'
import Container from '../components/Container.vue';
import { useMovieStore } from '@/stores/movie';

// store
const movieStore = useMovieStore();
</script>
