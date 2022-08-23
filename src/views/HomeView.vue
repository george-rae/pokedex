<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";

const pokedex = usePokedexStore();
pokedex.fetchPokemon(pokedex.ID);

const pokemons = pokedex.getPokemon;

return { pokedex };
</script>

<template>
  <main>
    <ul>
      <li v-for="pokemon in pokemons" :key="pokemon.name">
        {{ pokemon.name }}
      </li>
    </ul>
  </main>
</template>
