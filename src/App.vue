<template>
  <div id="app">
    <div>
      <input v-model="name" type="text" placeholder="your name" />
      <button type="button" @click.prevent="showModal">showModal</button>
    </div>
    <VueModalBackdrop />
    <VueModalRenderer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueModalBackdrop } from "@/lib/main";
import { VueModalRenderer } from "@/lib/main";

export default Vue.extend({
  components: {
    VueModalBackdrop,
    VueModalRenderer,
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
