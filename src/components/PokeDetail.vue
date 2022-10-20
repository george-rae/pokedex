<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps(["detail"]);

const detail = ref<any>();

detail.value = {
  type: props.detail.types,
  mainType: props.detail.types[0].type.name,
  name: props.detail.name,
};

console.log(detail.value);
</script>

<template>
  <section
    class="detail-card"
    :class="`detail-card--${detail.type}`"
    ref="detail"
  ></section>
</template>
