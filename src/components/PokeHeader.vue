<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";
import type * as gType from "@/types/pokemon";
import generations from "@/data/generations";
const pokedex = usePokedexStore();

const updateGen = (ID: number | gType.GenerationGroup[]) => {
  pokedex.changeGen(ID as number);
  console.log(pokedex);

  pokedex.fetchPokemon(ID as number);
};
</script>

<template>
  <header>
    <img alt="Pokedex Logo" class="pokedex-logo" src="/pokedex_logo.png" />
    <div class="gen-buttons">
      <button
        v-for="generation in generations"
        :key="generation.label"
        class="gen-buttons__button"
        @click="updateGen(generation.ID as number | gType.GenerationGroup[])"
      >
        {{ generation.label }}
      </button>
    </div>
  </header>
</template>
