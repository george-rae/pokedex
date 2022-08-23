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
    <ul class="card-list">
      <PokemonCard v-for="pokemon in pokemons" :key="pokemon.entry_number" :name="pokemon.pokemon_species.name" :entry="pokemon.entry_number">
      </PokemonCard>
    </ul>
  </main>
</Suspense>
</template>

<style lang="scss" scoped>
  main {
    position: relative;
    height: 100vh;
    width: 100vw;

    overflow: auto;
    z-index: 1;
}
.card-list{
  display: grid;
  grid-template-columns: repeat(4, 25%);
  gap: 15px;
  max-width: 1440px;
  margin: 20px auto; 
}

</style>