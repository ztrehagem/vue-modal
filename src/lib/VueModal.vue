<template>
  <div class="vue-modal">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.vue-modal {
  overflow: auto;
  position: fixed;
  inset: 0;
  height: 100%;
  opacity: 1;
  transform: translateY(0);
  transition: 300ms ease;
  transition-property: transform, opacity;

  &.v-enter-from,
  &.v-leave-to {
    opacity: 0;
    transform: translateY(-30px);
  }
}
</style>
