<template lang="pug">
.vue-modal(:data-modal-name="name")
  transition(:duration="300" @after-leave="afterLeave")
    .vue-modal__wrapper(v-if="isPlaced" v-show="isCurrent" @click.stop="backdrop")
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
  data() {
    return {
      isPlaced: false,
    }
  },
  computed: {
    isCurrent(): boolean {
      return this.$modal.current === this.name
    },
  },
  created() {
    this.$modal.$on('pushed', this.onPushed)
  },
  destroyed() {
    this.$modal.$off('pushed', this.onPushed)
  },
  methods: {
    backdrop() {
      if (!this.disableBackdrop) {
        this.$modal.pop()
      }
    },
    onPushed(name: string) {
      if (this.name === name) {
        this.isPlaced = true
      }
    },
    afterLeave() {
      if (!this.$modal.isStacked(this.name)) {
        this.isPlaced = false
      }
      this.$modal.$emit('afterLeave', this.name)
    },
  },
})
</script>

<style lang="stylus">
.vue-modal
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
