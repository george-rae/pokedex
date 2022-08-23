<script setup lang="ts">
import { reactive, computed } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import PokemonCard from "@/components/PokemonCard.vue";

const pokedex = usePokedexStore();
pokedex.fetchPokemon(pokedex.ID);

const pokemons = computed(() => {
  return pokedex.getPokemon;
});

</script>

<template>
<Suspense>
  <main>
    <ul>
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.entry_number" :name="pokemon.pokemon_species.name" :entry="pokemon.entry_number">
      </PokemonCard>
    </ul>
  </main>
</Suspense>
</template>
