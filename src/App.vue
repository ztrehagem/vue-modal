<template lang="pug">
div
  button(type="button" @click.prevent="buttonA") buttonA
  button(type="button" @click.prevent="buttonB") buttonB
  hr
  div
    vue-modal(:name="modalA")
      strong modal A
      button(type="button" @click.prevent="$modal.pop()") pop
      button(type="button" @click.prevent="buttonB") buttonB
      div(v-for="i in [1,2,3,4,5,6,7,8,9,10]") {{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]
    vue-modal(:name="modalB" disable-backdrop)
      strong modal B
      button(type="button" @click.prevent="$modal.pop()") pop
      button(type="button" @click.prevent="buttonA") buttonA
  vue-modal-backdrop
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      modalA: this.$modal.naming(),
      modalB: this.$modal.naming(),
    }
  },
  methods: {
    buttonA() {
      this.$modal.push(this.modalA)
    },
    buttonB() {
      this.$modal.push(this.modalB)
    },
  },
})
</script>
