<template>
  <main>
    <Movies />
  </main>
</template>


<script setup lang="ts">
import { onBeforeMount } from 'vue';
import axios from 'axios';
import { ref, reactive } from 'vue';
import type { MoviesFetchPayload, Movie } from '@/types';
import Movies from '../components/Movies.vue'

// these variable and the fetch methods is possible to be put inside pinia store
// but since it has been used only in homepage, I put it as reactive variable and method inside the .vue page
// reactive
const isLoading = ref<boolean>(false);
const isErrorFetching = ref<boolean>(false);
const page = ref<number>(1)
const movies = reactive<Movie[]>([])

// hook cycle
onBeforeMount(async () => {
  await fetchMovies({} as MoviesFetchPayload);
  console.log("@@movies: ", movies);
});

// methods
const fetchMovies = async (payload: MoviesFetchPayload): Promise<void> => {
  try {
    isLoading.value = true;
    isErrorFetching.value = false;

    const response = await axios.get('https://jsonmock.hackerrank.com/api/movies/search/', { params: payload });
    // throw here if want to test retry fetch button

    // movies is a const, so need to do this to assign new values or set length to 0 and push the new array
    movies.splice(0, movies.length, ...response.data.data as Movie[]);
    page.value = response.data.page as number;
  } catch {
    isErrorFetching.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>