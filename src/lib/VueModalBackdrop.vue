<template lang="pug">
transition(:duration="300")
  .vue-modal-backdrop(v-if="active" @click.stop="exit")
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    active(): boolean {
      return this.$modal.stack.length > 0
    },
  },
  methods: {
    exit() {
      this.$modal.pop()
    },
  },
})
</script>

<style lang="stylus">
.vue-modal-backdrop
  &
    opacity 1
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color rgba(0, 0, 0, 0.5)
    z-index 1000

  &.v-enter-active,
  &.v-leave-active
    transition opacity 300ms ease-out

  &.v-enter,
  &.v-leave-active
    opacity 0
</style>
