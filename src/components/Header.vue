<template>
  <header>
    <h1 class="pv-8 text-3xl fw-bold" style="cursor: pointer;"><RouterLink to="/">Film DB</RouterLink></h1>
    <nav :class="{ 'active' : isActive }">
      <ul>
        <li 
          v-for="link in links" 
          :key="link.name" 
          :class="{ active: route.path === link.to }"
          class="fw-bold ph-12 pv-8"
        >
          <span>
            <RouterLink :to="link.to">{{ link.name }}</RouterLink>
          </span>
        </li>
      </ul>
    </nav>
    <BurgerIconMenu v-model:active="isActive" class="burger-icon-menu"/>
  </header>
</template>


<script setup lang="ts">
import { ref, watch, inject } from 'vue';
import type { Ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router'
import BurgerIconMenu from './BurgerIconMenu.vue';

const route = useRoute();

// type declaration
type Link = {
  name: string;
  to: string;
};

// reactive vars
const isActive: Ref<boolean> = ref(false);

// other vars
// no need to make this reactive
const links: Link[] = [
  { name: "Movies", to: "/" },
  { name: "Contact Us", to: "/contact-us" }
];

// watch 
watch(
  () => route.fullPath,
  () => {
    // force close mobile menu when changing page
    isActive.value = false;
  }
);
</script>


<style lang="scss" scoped>
header {
  background-color: $primary-color;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 0 20px;

  .burger-icon-menu {
    display: none;
  }

  * {
    color: $secondary-color;
  }

  ul {
    list-style: none;

    li {
      display: inline-block;
      vertical-align: bottom;
      margin: 0 5px;
      font-size: 20px;
      position: relative;
      
      span {
        &:after {
          content: '';
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 0;
          height: 4px;
          transform: translateX(-50%);
          background-color: $secondary-color;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
          transition: width 0.3s ease;
        }
      }

      &.active, &:hover {

        span {
          &:after {
            width: 100%;
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
  header {
    padding-right: 0;

    nav {
      background: $primary-color;
      position: fixed;
      top: 60px;
      right: 0;
      height: 100%;
      width: 0%;
      z-index: 10;
      opacity: 0;
      transition: all 600ms cubic-bezier(.62,.04,.3,1.56);
      transition-delay: 100ms;
      border-top: solid 1px $secondary-color;
      padding-top: 20px;
      padding-right: 10px;
      
      * {
        color: $secondary-color;
      }
      
      &.active {
        width: 100%;
        opacity: 1;
      }

      ul {
        margin: 0;

        li {
          list-style: none;
          font-size: 24px;
          color: #fff;
          line-height: 2.2;
          text-transform: uppercase;
          letter-spacing: 1.7px;
          display: block;
          width: auto;
          text-align: right;

          span {
            position: relative;

            &:after {
              bottom: -8px;
            }
          }
        }
      }
    }

    .burger-icon-menu {
      display: block;
    }
  }
}
</style>