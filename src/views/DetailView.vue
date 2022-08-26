<script setup lang="ts">
import { computed } from "vue";
import useDetailsStore from "@/stores/details";

const detail = useDetailsStore();

const details = computed(() => {
  detail.fetchDetails(detail.getCurrentName);
  const info = detail.getDetails;

  return info;
});

setTimeout(() => {
  detail.loading = false;
}, 1000);

</script>

<template>
  <main>{{ details }}</main>
</template>