<template>
  <div class="error-message">
    <img src="/images/error-logo.png" alt="Unexpected error image" />
    <h2 class="mb-12 text-xl fw-bold">Oops something went wrong</h2>
    <div class="message">An unexpected error has occured. please try again or contact support if the error persists</div>
    <button @click="retry()" class="mt-20">
      Try again
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (event: 'retry-fetch'): void;
}>()

function retry(): void {
  emit('retry-fetch');
}
</script>

<style scoped lang="scss">
.error-message {
  text-align: center;
  width: 100%;
  padding: 100px 20px 0 20px;

  img {
    max-width: 100%;
    margin: 0 auto;
  }
}

.message {
  width: 500px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 20px;
}

button {
  width: 250px;
  border-radius: 5px;
  background-color: #1289A7;
  color:$secondary-color;
  padding: 10px 20px;
  max-width: 100%;
  cursor: pointer;
  border: none;
  font-size: 17px;
}
</style>
