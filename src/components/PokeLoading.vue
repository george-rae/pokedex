<script setup lang="ts">
import { generateLetters } from "@/helpers/generateLetters";

const loading = generateLetters("Loading...");
</script>

<template>
  <figure class="loading-background">
    <img
      class="loading-background__left"
      src="/background--pokedex-left.png"
      alt="pokedex left loading background image"
    />
    <div class="loading-background__right"></div>
    <figcaption>
      <span v-for="(letters, index) in loading" :key="index">
        {{ letters }}
      </span>
    </figcaption>
  </figure>
</template>
