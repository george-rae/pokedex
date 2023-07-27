<script lang="ts" setup>
import generations from "@/data/generations";
import goTo from "@/composables/goTo";
</script>
<template>
  <PokeHeader />
  <main>
    <h2 class="generations__header">Choose your Gen</h2>
    <ul class="generations__list">
      <li
        class="generations__button"
        type="button"
        v-for="generation in generations"
        :key="generation.label"
        :class="{ expand: Array.isArray(generation.ID) }"
      >
        <button @click="goTo.generations(generation)" type="button">
          {{ generation.label }}
        </button>
        <!-- <ul class="generations__dropdown" v-if="Array.isArray(generation.ID)">
          <li
            v-for="gendropdown in generation.ID"
            :key="gendropdown.label"
            @click="updateGen($event, gendropdown.ID)"
          >
            {{ gendropdown.label }}
          </li>
        </ul> -->
      </li>
    </ul>
  </main>
</template>
