<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 1250px;
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  transition: width 0.3s ease-in-out;
}

@media (max-width: $breakpoint-lg) {
  .container {
    width: 100%;
    padding: 15px;
  }
}

@media (max-width: $breakpoint-md) {
  .container {
    padding: 10px;
  }
}
</style>
