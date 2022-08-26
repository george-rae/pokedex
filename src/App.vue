<script setup lang="ts">
import { RouterView } from "vue-router";
import { computed } from "vue";
import useDetailStore from "@/stores/details";
import PokeLoading from "@/components/PokeLoading.vue";

const loaded = computed(() => {
  const loading = useDetailStore();
  return loading.getLoading;
});

</script>

<template>
  <RouterView />
  <PokeLoading :class="{ unloaded: !loaded, loaded: loaded }" ref="loaded" />
  <img class="background-pokeball" src="/pokeball.svg" alt="Pokeball icon" />
</template>

<style lang="scss">
@import "@/assets/style/vars";

#app {
  position: relative;

  @include flex-y(space-between, center, $wrap: nowrap);
  gap: 20px;
  height: 100vh;
  width: 100vw;

  padding: 40px 0 0;

  background-color: #f6f6f6;

  overflow: hidden;

  .background-pokeball {
    position: absolute;
    bottom: -50vh;
    right: -50vh;

    height: 150vh;
    width: auto;

    z-index: 0;
  }
}
</style>
