<script setup lang="ts">
import { computed } from "vue";
import useDetailsStore from "@/stores/details";
import { ConstantTypes } from "@vue/compiler-core";

const details = useDetailsStore();

setTimeout(() => {
  details.loading = false;
}, 1000);

const url = window.location.href;
const fallback = url.split("/").pop() as string;
const stateName = details.getCurrentName as string;

const name = stateName != fallback || !stateName ? fallback : stateName;

details.fetchDetails(name);

const detail = computed(() => {
  const info = details.getDetails;
  return info;
});
</script>

<template>
  <Suspense>
    <main ref="detail">{{ detail }}</main>
  </Suspense>
</template>
