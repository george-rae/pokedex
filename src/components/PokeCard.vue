<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";
import type { MinorDetails } from "@/types/pokemon";

const pokedex = usePokedexStore();

const props = defineProps(["name", "entry"]);
const details: MinorDetails = await pokedex.fetchMinorDetails(props.name);
const { sprite, types, id, is_legendary } = details;
const type =
  types.length > 1
    ? `${types[0].type.name}-${types[1].type.name}`
    : types[0].type.name;
</script>

<template>
  <li class="card" :class="`card--${type} card--${name}`">
    <section class="card__info">
      <h2 class="card__name">{{ name }}</h2>
      <h3 class="card__id">Region ID: #{{ id }}</h3>
      <div class="card__types">
        <p v-for="type in types" :key="type.type.name">
          {{ type.type.name }}
        </p>
      </div>
      <span v-if="is_legendary" class="card__legendary">Legendary</span>
    </section>
    <img :src="sprite as string" :alt="`${id} sprite`" />
    <span class="card__entry">Entry: #{{ entry }}</span>
  </li>
</template>
