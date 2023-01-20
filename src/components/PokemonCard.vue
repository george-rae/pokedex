<script setup lang="ts">
import { usePokedexStore } from "@/stores/pokedex";

const pokedex = usePokedexStore();

const props = defineProps(["name", "entry"]);
const details = await pokedex.fetchMinorDetails(props.name);
const { sprite, types, ID } = details;
</script>

<template>
  <li class="list-item" :class="'list-item--' + types[0].type.name">
    <h2 class="list-item__name">{{ name }}</h2>
    <h3 class="list-item__id">#{{ ID }}</h3>
    <span class="list-item__entry">Entry: #{{ entry }}</span>
    <img :src="sprite" alt="{{name}} sprite" />
    <div class="list-item__types">
      <p v-for="type in types" :key="type">
        {{ type.type.name }}
      </p>
    </div>
  </li>
</template>
