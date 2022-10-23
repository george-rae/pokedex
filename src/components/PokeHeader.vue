<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";
import useDetailsStore from "@/stores/details";
import type GenerationGroup from "@/types/pokemon";
import generations from "@/data/generations";

const pokedex = usePokedexStore();
const details = useDetailsStore();

const updateGen = (evt: Event, ID: number | GenerationGroup) => {
  const target = evt.target as HTMLElement;
  if (Array.isArray(ID)) {
    target.classList.toggle("dropdown-active");
  } else {
    details.loading = true;
    setTimeout(() => {
      pokedex.changeGen(ID as number);
      pokedex.fetchPokemon(ID as number);
      removeClass(evt);
    }, 1000);

    setTimeout(() => {
      details.loading = false;
    }, 2000);
  }
};

const removeClass = (evt: Event) => {
  const target = evt.target as HTMLElement;
  const remove = target.closest(".dropdown-active") || (target as HTMLElement);
  remove.classList.remove("dropdown-active");
};
</script>

<template>
  <header>
    <img alt="Pokedex Logo" class="pokedex-logo" src="/logo--pokedex.png" />
    <div class="gen-buttons">
      <button
        class="gen-buttons__button"
        type="button"
        v-for="(generation, index) in generations"
        :key="generation.label"
        :class="'gen-buttons__button--' + (index + 1)"
        :pokedexid="generation.ID"
        @click="updateGen($event, generation.ID as number)"
        @blur="removeClass"
      >
        {{ generation.label }}
        <ul class="gen-dropdown" v-if="Array.isArray(generation.ID)">
          <li v-for="gendropdown in generation.ID" :key="gendropdown.label">
            <button @click="updateGen($event, gendropdown.ID)" type="button">
              {{ gendropdown.label }}
            </button>
          </li>
        </ul>
      </button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/style/vars";

header {
  position: relative;

  @include flex-y(space-between, center);
  gap: 12px;
  z-index: 2;

  @media screen and (min-width: 320px) {
    padding: 10px 20px 0;
    img {
      width: clamp(300px, 90%, 387px);
      height: auto;
    }
  }
}
</style>
