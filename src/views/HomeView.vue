<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import PokemonCard from "@/components/PokemonCard.vue";
import PokeHeader from "@/components/PokeHeader.vue";
import detailsLink from "@/composables/detailsLink";

const pokedex = usePokedexStore();
pokedex.fetchPokemon(pokedex.ID);

const details = useDetailsStore();

const pokemons = computed(() => {
  return pokedex.getPokemon;
});

const obs = ref<Element | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver((list) => {
    const { boundingClientRect, isIntersecting } = list[0];

    if (
      boundingClientRect.y >= 950 &&
      !(pokemons.value.length === 0) &&
      isIntersecting
    ) {
      pokedex.fetchPokemon(pokedex.ID);
    }
  });

  observer.observe(obs.value as Element);

  setTimeout(() => {
    details.loading = false;
  }, 2000);
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
          @click="detailsLink(pokemon.pokemon_species.name)"
          v-cloak
        >
        </PokemonCard>
        <div class="observer-pixel" ref="obs" />
      </ul>
    </main>
  </Suspense>
</template>

<style lang="scss" scoped>
main {
  position: relative;
  min-height: calc(100vh - 220px);
  max-height: calc(100vh - 220px);
  width: 100vw;
  padding: 20px 0;

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

  margin: 0 auto;
  padding-bottom: 20px;
}
</style>
