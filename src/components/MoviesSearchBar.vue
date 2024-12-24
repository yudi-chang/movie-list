<template>
  <div class="p-8 search-bar-wrapper">
    <input v-model="titleSearch" @input="debouncedSearch">
    <img src="/images/search-icon.png" alt="Search" />
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue';
import { useDebounce } from '@/composables/debounce'
import type { MoviesFetchPayload } from '@/types';

// inject
const fetchMovies = inject<(payload: MoviesFetchPayload) => void>('fetchMovies')

// reactive
const titleSearch = ref<string>('')

// methods
const fetchMoviesWithPayload = (): void => {
  if (fetchMovies) {
    const payload: MoviesFetchPayload = {
      Title: titleSearch.value,
      page: 1,
    }
    fetchMovies(payload)
  }
}

// use debounce composable
const { debounce, isWaiting } = useDebounce<string>(() => {
  fetchMoviesWithPayload()
}, 450)

const debouncedSearch = () => {
  debounce()
}
</script>

<style scoped lang="scss">
.search-bar-wrapper {
  background-color: $primary-color;
  position: relative;
  border-radius: 5px;

  input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    position: relative;
    z-index: 0;
    background-color: #212a31;
    color: $secondary-color;
    transition: border 0.2s ease-in-out;
    padding: 0 45px 0 15px;
  }

  img {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    height: 20px;
    z-index: 999;
  }
}
</style>