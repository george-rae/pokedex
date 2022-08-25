<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <RouterView />
  <img class="background-pokeball" src="/pokeball.svg" alt="Pokeball icon" />
</template>

<style lang="scss">
#app {
  position: relative;

  height: 100vh;
  width: 100vw;

  padding: 40px 0;

  background-color: #f6f6f6;

  overflow: hidden;

  header {
    height: 175px;
  }

  .pokedex-logo {
    margin: 0 auto;
  }

  .background-pokeball {
    position: absolute;
    bottom: -30vh;
    right: -30vh;

    height: 65vh;
    width: auto;

    z-index: 0;
  }
}
</style>
