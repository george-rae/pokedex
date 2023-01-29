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
    (target.parentNode as Element).classList.toggle("dropdown-active");
  } else {
    console.log(ID);
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
    <div class="generations__close" @click="menuControl()">X</div>
    <nav class="generations__nav">
      <h2 class="generations__header">Choose your Gen</h2>
      <ul class="generations__list">
        <li
          class="generations__button"
          type="button"
          v-for="generation in generations"
          :key="generation.label"
          :class="{ expand: Array.isArray(generation.ID) }"
        >
          <button
            @click="
              updateGen($event, generation.ID as number | GenerationGroup)
            "
            type="button"
          >
            {{ generation.label }}
          </button>
          <ul class="generations__dropdown" v-if="Array.isArray(generation.ID)">
            <li
              v-for="gendropdown in generation.ID"
              :key="gendropdown.label"
              @click="updateGen($event, gendropdown.ID)"
            >
              {{ gendropdown.label }}
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>
