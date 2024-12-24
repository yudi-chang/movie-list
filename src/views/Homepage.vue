<template>
  <main class="pb-16">
    <Container>
      <Movies :movies="movies" :is-loading="isLoading" :is-error-fetching="isErrorFetching"/>

      <v-pagination
        v-model="page"
        @update:modelValue="onPageChange"
        :length="totalPages"
        class="mt-12"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
      ></v-pagination>
    </Container>
  </main>
</template>


<script setup lang="ts">
import axios from 'axios';
import { ref, reactive, provide, onBeforeMount } from 'vue';
import type { MoviesFetchPayload, Movie } from '@/types';
import Movies from '../components/Movies.vue'
import Container from '../components/Container.vue';

// these variable and the fetch methods is possible to be put inside pinia store
// but since it has been used only in homepage, I put it as reactive variable and method inside the .vue page
// reactive
const isLoading = ref<boolean>(false);
const isErrorFetching = ref<boolean>(false);
const page = ref<number>(1)
const totalPages = ref<number>(0)
const movies = reactive<Movie[]>([])
const currentTitle = ref<string>('')

// hook cycle
onBeforeMount(async () => {
  await fetchMovies({} as MoviesFetchPayload);
});

// methods
const fetchMovies = async (payload: MoviesFetchPayload): Promise<void> => {
  try {
    isLoading.value = true;
    isErrorFetching.value = false;
    currentTitle.value = payload?.Title || '';
    page.value = payload?.page || 1;

    const response = await axios.get('https://jsonmock.hackerrank.com/api/movies/search/', { params: payload });
    // throw here if want to test retry fetch button

    // movies is a const, so need to do this to assign new values or set length to 0 and push the new array
    movies.splice(0, movies.length, ...response.data.data as Movie[]);
    page.value = response.data.page as number;
    totalPages.value = response.data.total_pages as number;
  } catch {
    isErrorFetching.value = true;
  } finally {
    isLoading.value = false;
  }
};

const onPageChange = (newPage: number) => {
  fetchMovies({
    Title: currentTitle.value,
    page: newPage,
  } as MoviesFetchPayload);
};

// provide
provide('fetchMovies', fetchMovies)
</script>
