<script setup lang="ts">
import { RouterView } from "vue-router";
import useDetailStore from "@/stores/details";
import PokeLoading from "@/components/PokeLoading.vue";

const state = useDetailStore();
</script>

<template>
  <Suspense>
    <RouterView />
  </Suspense>
  <PokeLoading
    :class="{
      loading: state.loading,
    }"
    ref="loaded"
  />
</template>

<style lang="scss">
@import "@/assets/style/vars";

#app {
  position: relative;

  @include flex-y(space-between, center, $wrap: nowrap);
  gap: 20px;
  height: 100vh;
  width: 100vw;

  background-color: #f6f6f6;

  overflow: hidden;

  .background-pokeball {
    position: absolute;
    bottom: -50vh;
    right: -50vh;

    height: 150vh;
    width: auto;

    z-index: 0;

    animation: spin 20s linear infinite forwards;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
