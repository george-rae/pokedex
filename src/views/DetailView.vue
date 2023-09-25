<script setup lang="ts">
import useDetailsStore from "@/stores/details";
import router from "@/router";
import PokeDetail from "@/components/PokeDetail.vue";

const details = useDetailsStore();

setTimeout(() => {
  details.loading = false;
}, 1000);

const url = window.location.href;
const fallback = url.split("/").pop() as string;
const stateName = details.getCurrentName as string;

const name = stateName !== fallback || !stateName ? fallback : stateName;

if (!name || name === "") router.back();

details.assignPokemon(name);

const detail = await details.fetchDetails(name);

setTimeout(() => {
  details.loading = false;
}, 2000);
</script>

<template>
  <Suspense>
    <main ref="detail">
      <PokeDetail :name="name"></PokeDetail>
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
  padding: 40px;
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
</style>
