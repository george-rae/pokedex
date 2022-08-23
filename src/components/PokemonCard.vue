<script setup lang="ts">
import { computed } from "vue";
import { usePokedexStore } from "@/stores/pokedex";
const pokedex = usePokedexStore();

const props = defineProps(["name", "entry"]);
const details = computed(() => {
  const cardDetails = pokedex.fetchMinorDetails(props.name);

  return cardDetails;
});

const sprite = (await details.value).sprite;
const types = (await details.value).types;

</script>

<template>
  <li>{{ name }} {{ entry }}
    <img :src="sprite" />
    <p v-for="type in types" :key="type">
      {{ type.type.name }}
    </p>
  </li>
</template>
