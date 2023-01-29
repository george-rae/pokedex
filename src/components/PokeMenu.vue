<script lang="ts" setup>
import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import type GenerationGroup from "@/types/pokemon";
import generations from "@/data/generations";
import menuControl from "@/composables/menuControl";

const pokedex = usePokedexStore();
const details = useDetailsStore();

const updateGen = (evt: Event, ID: number | GenerationGroup) => {
  const target = evt.target as HTMLElement;
  if (Array.isArray(ID)) {
    target.classList.toggle("dropdown-active");
  } else {
    details.loading = true;
    setTimeout(async () => {
      menuControl();
      pokedex.changeGen(ID as number);
      await pokedex.fetchPokemon(ID as number);
    }, 1000);

    setTimeout(() => {
      details.loading = false;
    }, 2000);
  }
};
</script>

<template>
  <aside class="generations" ref="menu">
    <nav class="generations__nav">
      <h2>Choose your Gen</h2>
      <ul class="generations__list">
        <li
          class="generations__button"
          type="button"
          v-for="(generation, index) in generations"
          :key="generation.label"
          :class="'generations__button--' + (index + 1)"
          @click="updateGen($event, generation.ID as number | GenerationGroup)"
        >
          {{ generation.label }}
          <ul class="gen-dropdown" v-if="Array.isArray(generation.ID)">
            <li v-for="gendropdown in generation.ID" :key="gendropdown.label">
              <button @click="updateGen($event, gendropdown.ID)" type="button">
                {{ gendropdown.label }}
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
