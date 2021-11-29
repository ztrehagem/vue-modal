<template>
  <transition>
    <div v-if="$modal.top" class="vue-modal-backdrop" />
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss">
.vue-modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  transition: 300ms ease opacity;

  &.v-enter,
  &.v-leave-to {
    opacity: 0;
  }
}
</style>
