<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<script setup lang="ts">
import PokeIcon from "./PokeIcon.vue";
import menuControl from "@/composables/menuControl";
</script>

<template>
  <header>
    <img alt="Pokedex Logo" class="pokedex-logo" src="/logo--pokedex.png" />
    <div class="scrolling__menu" @click="menuControl()">
      <PokeIcon />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/style/vars";

header {
  position: relative;

  width: 100%;

  z-index: 2;

  @media screen and (min-width: 320px) {
    @include flex-x(space-between, center);
    padding: 10px 24px 0;
    img {
      max-height: 200px;
      width: auto;
      height: clamp(5vh, 140px, 10vh);
      flex-shrink: 1;

      transition: max-height 0.5s ease-in-out;
      filter: drop-shadow(7px 7px 6px rgba(0, 0, 0, 0.5));
    }

    & > .scrolling__menu {
      max-height: 60px;
      height: 60px;
      cursor: pointer;
    }

    &.content-scrolling {
      img,
      .scrolling__menu {
        max-height: 50px;

        transition: max-height 0.5s ease-in-out;
      }
    }
  }

  @media screen and (min-width: 600px) {
    padding: 20px 0 0;
  }
}
</style>
