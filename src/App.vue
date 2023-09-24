<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import useDetailStore from "@/stores/details";
import PokeLoading from "@/components/PokeLoading.vue";

const state = useDetailStore();

const theme = ref("light");

function changeTheme(): void {
  if (theme.value === "light") theme.value = "dark";
  else theme.value = "light";
}
</script>

<template>
  <div class="content" :class="theme">
    <Suspense>
      <RouterView />
    </Suspense>
    <PokeLoading :class="{ loading: state.loading }" ref="loaded" />
    <div class="theme-change" @click="changeTheme()">
      <img
        src="/light.svg"
        :class="{ hidden: theme === 'dark' }"
        alt="light theme"
      />
      <img
        src="/dark.svg"
        :class="{ hidden: theme === 'light' }"
        alt="dark theme"
      />
    </div>
  </div>
</template>

<style lang="scss">
@import "@/assets/style/vars";

#app {
  position: relative;

  @include flex-y(space-between, center, $wrap: nowrap);
  gap: 20px;
  height: 100vh;
  width: 100vw;

  overflow: hidden;

  .content {
    background-image: var(--theme-background);
    color: var(--theme-colour);

    transition: background-image 0.3s ease-out;

    &.light {
      --theme-background: linear-gradient(to bottom right, #e6e6e6, #fff);
      --theme-colour: #333;
      --theme-box-shadow: #{rgba(#333, 0.3)};
      --theme-gradient-text: linear-gradient(to right, #333, #000);
    }
    &.dark {
      --theme-background: linear-gradient(to bottom right, #333, #000);
      --theme-colour: #f2f2f2;
      --theme-box-shadow: #{rgba(#e6e6e6, 0.2)};
      --theme-gradient-text: linear-gradient(to right, #e6e6e6, #fff);
    }
  }

  .background-pokeball {
    position: absolute;
    bottom: -50vh;
    right: -50vh;

    height: 150vh;
    width: auto;

    z-index: 0;

    animation: spin 20s linear infinite forwards;
  }

  .theme-change {
    position: absolute;
    top: 6px;
    right: 6px;

    height: 50px;
    width: 50px;
    z-index: 20;

    img {
      position: absolute;
      top: 0;
      right: 0;

      pointer-events: auto;
      transition: opacity 0.3s ease-in-out;

      &.hidden {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease-in-out;
      }
    }
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
