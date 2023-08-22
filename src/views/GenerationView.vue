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
  gap: 20px;
  padding: 50px 20px;

  &__header {
    color: #333;
    font-size: 35px;
    font-weight: bold;
    text-align: center;
  }

  &__list {
    display: grid;
    gap: 20px;
  }

  &__item {
    position: relative;

    @include flex-y($align: center);
    height: 200px;
    padding: 15px;

    border-radius: 10px;
    background: linear-gradient(45deg, #f2f2f2, #fff);
    box-shadow: 2px 2px 5px 1px rgba(33, 33, 33, 0.3);
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
        margin-top: -10px;
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
      bottom: -40px;
      right: -40px;

      height: 200px;
      width: 200px;

      background: url("/pokeball.svg");
      background-size: 100% 100%;
      opacity: 0.4;
      filter: drop-shadow(-5px -5px 4px rgba(0, 0, 0, 0.3));
    }
  }

  &__label {
    color: #666;
    font-size: 22px;
    font-weight: 300;
    text-align: center;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
