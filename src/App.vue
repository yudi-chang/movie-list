<template>
  <Header />

  <RouterView />
</template>


<script setup lang="ts">
import Header from './components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">

</style>
