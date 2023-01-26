<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";

const pokedex = usePokedexStore();

const props = defineProps(["name", "entry"]);
const details = await pokedex.fetchMinorDetails(props.name);
const { sprite, types, ID } = details;
const type =
  types.length > 1
    ? `${types[0].type.name}-${types[1].type.name}`
    : types[0].type.name;
</script>

<template>
  <li class="list-item" :class="'list-item--' + type">
    <h2 class="list-item__name">{{ name }}</h2>
    <h3 class="list-item__id">#{{ ID }}</h3>
    <span class="list-item__entry">Entry: #{{ entry }}</span>
    <img :src="sprite" :alt="`${name} sprite`" />
    <div class="list-item__types">
      <p v-for="type in types" :key="type">
        {{ type.type.name }}
      </p>
    </div>
  </li>
</template>
