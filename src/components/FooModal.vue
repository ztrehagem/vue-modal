<template>
  <Modal @click.native="dismiss">
    <div class="foo-modal">
      <div class="foo-modal__content" @click.stop>
        <p>Hello, {{ state.name }}!</p>
        <button type="button" @click.prevent="dismiss">closeModal</button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Modal from "@/lib/Modal.vue";
import { ModalTypes } from "@/plugins/modal";

export default Vue.extend({
  props: {
    state: {
      type: Object as PropType<ModalTypes["foo"]>,
      required: true,
    },
  },

  components: {
    Modal,
  },

  methods: {
    dismiss() {
      this.$modal.pop();
    },
  },
});
</script>

<style lang="scss">
.foo-modal {
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
