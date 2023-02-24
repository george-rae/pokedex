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
  <li class="list-item" :class="`list-item--${type}`">
    <h2 class="list-item__name">{{ name }}</h2>
    <h3 class="list-item__id">#{{ id }}</h3>
    <span class="list-item__entry">Entry: #{{ entry }}</span>
    <span v-if="is_legendary">Legendary</span>
    <img :src="sprite as string" :alt="`${id} sprite`" />
    <div class="list-item__types">
      <p v-for="type in types" :key="type.type.name">
        {{ type.type.name }}
      </p>
    </div>
  </li>
</template>
