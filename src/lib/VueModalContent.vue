<template lang="pug">
.vue-modal-content
  transition(:duration="300" @after-leave="afterLeave")
    .vue-modal-content__wrapper(v-if="isPlaced" v-show="isStackedTop" @click.stop="backdrop")
      .vue-modal-content__content(@click.stop="")
        slot
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  data() {
    return {
      isPlaced: false,
    }
  },
  computed: {
    isStacked(): boolean {
      return this.$modal.stack.indexOf(this.name) >= 0
    },
    isStackedTop(): boolean {
      return this.$modal.stack[this.$modal.stack.length - 1] === this.name
    },
  },
  watch: {
    isStacked() {
      if (this.isStacked) {
        this.isPlaced = true
      } else {
        this.$modal.$once('afterLeave', name => {
          if (!this.isStacked) this.isPlaced = false
        })
      }
    },
  },
  methods: {
    backdrop() {
      if (!this.disableBackdrop) {
        this.$modal.pop()
      }
    },
    afterLeave() {
      this.$modal.$emit('afterLeave', this.name)
    },
  },
})
</script>

<style lang="stylus" scoped>
.vue-modal-content
  &__wrapper
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

  &__wrapper.v-enter &__content,
  &__wrapper.v-leave-active &__content
    opacity 0
    transform translateY(-50px)
</style>
