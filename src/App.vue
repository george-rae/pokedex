<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <img alt="Pokedex Logo" class="pokedex-logo" src="/pokedex_logo.png" />
  </header>

  <RouterView />
</template>

<style lang="stylus">
#app
  position: relative;

  height: 100vh;
  width: 100vw;

  padding: 40px;

  background-size: 100% auto;
  background-position: center;
  background-repeat: no-repeat;

.pokedex-logo
  margin: 0 auto;
</style>
