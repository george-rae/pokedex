<script setup lang="ts">
import useDetailsStore from "@/stores/details";

const props = defineProps({
  name: { type: String, default: "" },
});

const store = useDetailsStore();
const { types } = await store.fetchDetails(props.name as string);
const mainType = types[0].type.name;
</script>

<template>
  <section class="detail-card" :class="`detail-card--${mainType}`"></section>
</template>
