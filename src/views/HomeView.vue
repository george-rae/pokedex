<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import PokeCard from "@/components/PokeCard.vue";
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
      <PokeCard
        v-for="pokemon in pokedex.pokemons"
        :key="pokemon.entry_number"
        :name="pokemon.pokemon_species.name"
        :entry="pokemon.entry_number"
        @click="detailsLink(pokemon.pokemon_species.name)"
        v-cloak
      >
      </PokeCard>
      <div class="observer-pixel" ref="obs" />
    </ul>
  </main>
</template>

<style lang="scss">
@import "@/assets/style/vars";

#app {
  &::before {
    content: "";
    @include absolute-fill;

    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    pointer-events: none;
    z-index: 10;

    transition: all 0.45s ease-in-out;
  }

  &.menu-open::before {
    opacity: 1;
    pointer-events: all;
    transition: all 0.45s ease-in-out;
  }
}

main {
  position: relative;
  width: 100vw;

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
    padding: 20px 24px 25px;
  }

  .card-list {
    grid-template-columns: 100%;
    gap: 25px;
  }
}

// TABLET
@media screen and (min-width: 600px) {
  main {
    padding: 0 20px 20px;
  }

  .card-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }
}

@media screen and (min-width: 1920px) {
  .card-list {
    grid-template-columns: repeat(5, 1fr);
    gap: 25px;
  }
}

@media screen and (min-width: 2500px) {
  .card-list {
    max-width: 1920px;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }
}
</style>
