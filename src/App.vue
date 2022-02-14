<script setup lang="ts">
import { ref } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "./lib/main";
import { useModal } from "./modal";

const modal = useModal();

const name = ref("");

function showModal() {
  modal.push("hello", { name: name.value });
}
</script>

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
