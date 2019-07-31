<template lang="pug">
div
  button(type="button" @click.prevent="buttonA") buttonA
  button(type="button" @click.prevent="buttonB") buttonB
  button(type="button" @click.prevent="buttonC") buttonC
  hr
  .modals
    vue-modal(:name="modalA")
      strong modal A
      button(type="button" @click.prevent="$modal.pop()") pop
      button(type="button" @click.prevent="buttonB") buttonB
      button(type="button" @click.prevent="buttonC") buttonC
      div(v-for="i in [1,2,3,4,5,6,7,8,9,10]") {{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]{{i}}#[br]
    vue-modal(:name="modalB" disable-backdrop)
      strong modal B
      button(type="button" @click.prevent="$modal.pop()") pop
      button(type="button" @click.prevent="buttonA") buttonA
      button(type="button" @click.prevent="buttonC") buttonC
      button(type="button" @click.prevent="actions") actions
      WithModal
        ReqProp(prop="in modal B")
      vue-modal(:name="modalC")
        strong modal C
        button(type="button" @click.prevent="$modal.pop()") pop
        button(type="button" @click.prevent="buttonA") buttonA
        button(type="button" @click.prevent="buttonB") buttonB
  vue-modal-portal
</template>

<script lang="ts">
import Vue from 'vue'
import ReqProp from '@/components/ReqProp.vue'
import WithModal from '@/components/WithModal.vue'

export default Vue.extend({
  components: {
    ReqProp,
    WithModal,
  },
  data() {
    return {
      modalA: this.$modal.naming(),
      modalB: this.$modal.naming(),
      modalC: this.$modal.naming(),
    }
  },
  methods: {
    buttonA() {
      this.$modal.push(this.modalA)
    },
    buttonB() {
      this.$modal.push(this.modalB)
    },
    buttonC() {
      this.$modal.push(this.modalC)
    },
    async actions() {
      this.$modal.push(this.modalC)
      await new Promise(res => setTimeout(res, 1000))
      this.$modal.pop()
      this.$modal.replace(this.modalA)
    },
  },
})
</script>
