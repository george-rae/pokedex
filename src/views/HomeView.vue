<script setup lang="ts">
import { onMounted, computed } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import PokemonCard from "@/components/PokemonCard.vue";
import PokeHeader from "../components/PokeHeader.vue";

const pokedex = usePokedexStore();
pokedex.fetchPokemon(pokedex.ID);

const pokemons = computed(() => {
  return pokedex.getPokemon;
});

onMounted(() => {
  const obs: Element = document.querySelector(".observer-pixel") as Element;

  const observer = new IntersectionObserver((list) => {
    const { boundingClientRect, isIntersecting } = list[0];

    if (
      boundingClientRect.y >= 1000 &&
      !(pokemons.value.length < 12) &&
      isIntersecting
    ) {
      pokedex.fetchPokemon(pokedex.ID);
    }
  });

  observer.observe(obs);
});
</script>

<template>
  <PokeHeader />
  <Suspense>
    <main>
      <ul class="card-list">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.entry_number"
          :name="pokemon.pokemon_species.name"
          :entry="pokemon.entry_number"
        >
        </PokemonCard>
        <div class="observer-pixel"></div>
      </ul>
    </main>
  </Suspense>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  height: calc(100vh - 215px);
  width: 100vw;

  overflow: auto;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 6px;

    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #7d7d7d;
  }
}

.observer-pixel {
  position: absolute;
  bottom: 100px;
  left: 0;

  height: 1px;
  width: 1px;
  pointer-events: none;
}
.card-list {
  position: relative;

  display: grid;
  grid-template-columns: repeat(4, calc(25% - 11.5px));
  gap: 15px;
  max-width: 1440px;
  margin: 20px auto 40px;
}
</style>
