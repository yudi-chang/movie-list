<template>
  <div class="hamburger-wrapper" :class="{ 'active': active }" id="icon" @click="toggleMenu()">
    <div class="icon-1" id="a"></div>
    <div class="icon-2" id="b"></div>
    <div class="icon-3" id="c"></div>
    <div class="clear"></div>
  </div> 
</template>

<script setup lang="ts">
// model
const active = defineModel('active', { required: true, type: Boolean })

// methods
const toggleMenu = (): void => {
  active.value = !active.value
};
</script>

<style scoped lang="scss">
.hamburger-wrapper {
  position: relative;
  height: 60px;
  width: 60px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: $secondary-color;

  .icon-1, .icon-2, .icon-3 {
      position: absolute;
      left: 25%;
      top: 50%;
      width: 32px;
      height: 3px;
      background-color: $primary-color;
      transition: all 400ms cubic-bezier(.84,.06,.52,1.8);
  }

  .icon-1 {
    transform: translateY(-8px);
    animation-delay: 100ms;
  }

  .icon-3 {
    transform: translateY(8px);
    animation-delay: 250ms;
  }

  &.active {    
    .icon-1 {
      transform: rotate(40deg);
    }

    .icon-3 {
      transform: rotate(-40deg);
    }

    .icon-2 {
      opacity: 0;
    }
  }
}

.clear {
  clear: both;
}
</style>