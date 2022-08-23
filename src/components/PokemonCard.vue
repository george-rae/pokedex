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
  <li class="list-item" :class="'list-item--' + types[0].type.name" >
    <h2 class="list-item__name">{{ name }}</h2>
    <h3 class="list-item__id">{{ entry }}</h3>
    <img :src="sprite" />
    <div class="list-item__types">
      <p v-for="type in types" :key="type">
        {{ type.type.name }}
      </p>
    </div>
  </li>
</template>
