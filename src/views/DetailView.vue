<script setup lang="ts">
import { computed, ref } from "vue";
import useDetailsStore from "@/stores/details";
import router from "@/router";

const details = useDetailsStore();

setTimeout(() => {
  details.loading = false;
}, 1000);

const url = window.location.href;
const fallback = url.split("/").pop() as string;
const stateName = details.getCurrentName as string;

const name = stateName != fallback || !stateName ? fallback : stateName;

if (!name || name === "") router.back();

details.assignPokemon(name);
details.fetchDetails(name);

const detail = computed(() => {
  const info = details.getDetails;
  return info;
});

// THIS WILL GO
const log = ref<Element | null>();
const toggle = () => {
  document.querySelector(".jv-container")!.classList.toggle("js-active");
};
</script>

<template>
  <Suspense>
    <main ref="detail">
      <button @click="toggle()" type="button">View JSON</button>
      <json-viewer
        :value="detail"
        :expand-depth="1"
        copyable
        boxed
        sort
        ref="log"
      ></json-viewer>
    </main>
  </Suspense>
</template>

<style lang="scss" scoped>
@import "@/assets/style/vars";
#app {
  padding-top: 0;
}

main {
  position: relative;
  height: 100%;
  width: 100%;
}

button {
  position: absolute;
  bottom: 10px;
  left: 10px;

  padding: 5px;

  color: #fff;
  font-size: 14px;
  font-weight: bold;

  background: $colour-dark;
  border-radius: 5px;
  border: 1px solid #fff;
  cursor: pointer;
}
.jv-container {
  position: absolute !important;
  top: 15px;
  left: 15px;

  max-height: 0;
  max-width: 0;
  opacity: 0;

  transition: all 300ms ease-in-out;

  &.js-active {
    max-height: 100vh;
    max-width: 100vw;
    opacity: 1;

    transition: all 300ms ease-in-out;
  }
}
</style>
