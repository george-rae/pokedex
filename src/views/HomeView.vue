<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import PokemonCard from "@/components/PokemonCard.vue";
import PokeHeader from "@/components/PokeHeader.vue";
import detailsLink from "@/composables/detailsLink";

const pokedex = usePokedexStore();
await pokedex.fetchPokemon(pokedex.ID);
const pokemons = pokedex.getPokemon;

const details = useDetailsStore();
const obs = ref<Element | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (list) => {
      const { isIntersecting } = list[0];

      if (!(pokemons.length === 0) && isIntersecting) {
        pokedex.fetchPokemon(pokedex.ID);
      }
    },
    { threshold: 1.0 } // This means the entire element needs to be on show.
  );

  observer.observe(obs.value as Element);

  setTimeout(() => {
    details.loading = false;
  }, 2000);
});
</script>

<template>
  <PokeHeader />
  <main>
    <ul class="card-list">
      <PokemonCard
        v-for="pokemon in pokedex.pokemons"
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
</template>

<style lang="scss" scoped>
main {
  position: relative;
  height: calc(100vh - 220px);
  width: 100vw;
  padding: 20px 0;

  overflow: auto;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 8px;

    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
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
  max-width: 1440px;

  margin: 0 auto;
}

// MOBILE
@media screen and (min-width: 320px) {
  main {
    padding: 20px 32px 25px 40px;
  }

  .card-list {
    grid-template-columns: 100%;
    gap: 25px;
  }
}

// TABLET
@media screen and (min-width: 600px) {
  main {
    padding: 20px 12px 20px 20px;
  }

  .card-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  main {
    padding: 20px 12px 20px 20px;
  }

  .card-list {
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
  }
}
</style>
