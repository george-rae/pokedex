<script setup lang="ts">
import generateLetters from "@/helpers/generateLetters";
const loading = generateLetters("Loading...");
</script>

<template>
  <figure class="loading-background">
    <img class="loading-background__left" src="/background--pokedex-left.png" />
    <img
      class="loading-background__right"
      src="/background--pokedex-right.png"
    />
    <figcaption>
      <span v-for="(letters, index) in loading" :key="index">
        {{ letters }}
      </span>
    </figcaption>
  </figure>
</template>
