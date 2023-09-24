<script lang="ts" setup>
import generations from "@/data/generations";
import goTo from "@/composables/goTo";
</script>

<template>
  <main class="generations">
    <h2 class="generations__header">Choose your Gen</h2>
    <ul class="generations__list">
      <li
        class="generations__item"
        :class="`generations__item--${generation.slug}`"
        @click="goTo.generations(generation)"
        v-for="generation in generations"
        :key="generation.label"
      >
        <p class="generations__label">
          {{ generation.label }}
        </p>
        <img
          :src="`/generations/generation--${generation.slug}@2x.png`"
          :alt="`Generation ${generation.slug}`"
        />
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
@import "@/assets/style/vars";
.generations {
  @include flex-y;
  gap: 24px;
  padding: 48px 24px;

  &__header {
    color: #333;
    font-size: clamp(24px, 10vw, 36px);
    font-weight: bold;
    text-align: center;
  }

  &__list {
    display: grid;
    gap: 24px;
  }

  &__item {
    position: relative;

    @include flex-y($align: center);
    height: 200px;
    padding: 12px;

    border-radius: 12px;
    background: var(--theme-background);
    box-shadow: 3px 3px 4px 1px var(--theme-box-shadow);
    overflow: hidden;
    opacity: 0;

    animation: fadeIn 500ms linear 1 forwards;

    img {
      width: 80%;
      height: auto;
      z-index: 1;
    }

    &--national {
      img {
        width: 100%;
        margin-top: -12px;
      }
    }

    @for $i from 1 through 9 {
      &:nth-child(#{$i}) {
        animation-delay: 250ms * $i;
      }
    }

    &::after {
      content: "";
      position: absolute;
      bottom: -48px;
      right: -48px;

      height: 204px;
      width: 204px;

      background: url("/pokeball.svg");
      background-size: 100% 100%;
      opacity: 0.4;
      filter: drop-shadow(-6px -6px 6px var(--theme-box-shadow));
    }
  }

  &__label {
    color: var(--theme-colour);
    font-size: 24px;
    text-align: center;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(24px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
