<script setup lang="ts">
import { generateLetters } from "@/helpers/generateLetters";
import PokeIcon from "./PokeIcon.vue";

const loading = generateLetters("Loading...");
</script>

<template>
  <figure class="loading-background">
    <PokeIcon />
    <figcaption>
      <span v-for="(letters, index) in loading" :key="index">
        {{ letters }}
      </span>
    </figcaption>
  </figure>
</template>
