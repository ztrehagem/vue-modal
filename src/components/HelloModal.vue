<template>
  <VueModal @click.native="dismiss">
    <div class="hello-modal">
      <div class="hello-modal__content" @click.stop>
        <p>Hello, {{ args.name }}!</p>
        <button type="button" @click.prevent="dismiss">closeModal</button>
      </div>
    </div>
  </VueModal>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import VueModal from "@/lib/VueModal.vue";
import { ModalTypes } from "@/plugins/modal";

export default Vue.extend({
  components: {
    VueModal,
  },

  props: {
    args: {
      type: Object as PropType<ModalTypes["hello"]>,
      required: true,
    },
  },

  methods: {
    dismiss() {
      this.$modal.pop();
    },
  },
});
</script>

<style lang="scss">
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
