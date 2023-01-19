<script setup lang="ts">
import type { PokeTypes } from "@/types/details";
import { ref, computed } from "vue";
import useDetailsStore from "@/stores/details";

const props = defineProps({
  name: String,
});
const store = useDetailsStore();

const details = computed(() => {
  const response = store.fetchDetails(props.name as string);

  return response;
});

const detail = await details.value;
const mainType = detail.types[0].type.name;
</script>

<template>
  <section class="detail-card" :class="`detail-card--${mainType}`"></section>
</template>
