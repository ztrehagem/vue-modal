<template lang="pug">
transition(:duration="300")
  .vue-modal(v-if="active" @click.stop="backdrop")
    .vue-modal__content(@click.stop="")
      slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  computed: {
    active(): boolean {
      return this.$modal.stack[this.$modal.stack.length - 1] === this.name
    },
  },
  methods: {
    backdrop() {
      if (!this.disableBackdrop) {
        this.$modal.pop()
      }
    },
  },
})
</script>

<style lang="stylus" scoped>
.vue-modal
  &
    overflow auto
    position fixed
    top 0
    left 0
    right 0
    height 100%
    z-index 1001

  &__content
    position absolute
    left 0
    right 0
    opacity 1
    margin 30px auto
    padding 30px
    width 800px
    background-color #fff
    transform translateY(0)
    transition 300ms cubic-bezier(0.51, 0.21, 0.38, 0.98)
    transition-property opacity, transform

  &.v-enter-active &__content,
  &.v-leave-active &__content
    transition 300ms cubic-bezier(0.51, 0.21, 0.38, 0.98)
    transition-property opacity, transform

  &.v-enter &__content,
  &.v-leave-active &__content
    opacity 0
    transform translateY(-50px)
</style>
