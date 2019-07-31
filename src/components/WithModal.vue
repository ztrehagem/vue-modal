<template lang="pug">
.with-modal
  div: button(type="button" @click.prevent="toggle") with modal
  div: button(type="button" @click.prevent="openModal") openModal
  vue-modal(v-if="active" :name="name")
    .with-modal__content
      div: strong {{name}}
      slot
</template>

<script lang="ts">
import Vue from 'vue'
import ReqProp from './ReqProp.vue'
export default Vue.extend({
  components: {
    ReqProp,
  },
  data() {
    return {
      name: this.$modal.naming(),
      active: false,
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    },
    openModal() {
      this.$modal.push(this.name)
    },
  },
})
</script>
