<script setup lang="ts">
import { ref } from "vue";
import { VueModal } from "../lib/main";
import { ModalTypes, useModal } from "../modal";

const props = defineProps<{
  args: ModalTypes["hello"];
}>();

const modal = useModal();

const name = ref("");

function dismiss() {
  modal.pop();
}

function showModal() {
  modal.push("hello", { name: name.value });
}
</script>

<template>
  <VueModal @click.native="dismiss">
    <div class="hello-modal">
      <div class="hello-modal__content" @click.stop>
        <p>Hello, {{ props.args.name }}!</p>
        <button type="button" @click.prevent="dismiss">closeModal</button>

        <div>
          <input v-model="name" type="text" placeholder="your name" />
          <button type="button" @click.prevent="showModal">showModal</button>
        </div>
      </div>
    </div>
  </VueModal>
</template>

<style scoped lang="scss">
.hello-modal {
  position: absolute;
  inset: auto 0;
  padding: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    width: 100%;
    max-width: 1024px;
    background: #fff;
  }
}
</style>
