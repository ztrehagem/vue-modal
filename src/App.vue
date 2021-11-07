<template>
  <div id="app">
    <div>
      <input type="text" v-model="name" placeholder="your name" />
      <button type="button" @click.prevent="showModal">showModal</button>
    </div>
    <ModalBackdrop />
    <ModalRenderer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ModalBackdrop from "@/lib/ModalBackdrop.vue";
import ModalRenderer from "@/lib/ModalRenderer.vue";

export default Vue.extend({
  components: {
    ModalBackdrop,
    ModalRenderer,
  },

  data() {
    return {
      name: "",
    };
  },

  methods: {
    showModal() {
      this.$modal.push("hello", { name: this.name });
    },
  },
});
</script>
