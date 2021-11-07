<template>
  <transition mode="out-in">
    <keep-alive
      v-if="$modal.top"
      :key="$modal.top.instanceId"
      :include="keepAliveNames"
    >
      <component
        :is="$modal.top.component"
        :key="$modal.top.instanceId"
        :state="$modal.top.state"
      />
    </keep-alive>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Modal from "./Modal.vue";
export default Vue.extend({
  components: {
    Modal,
  },
  computed: {
    keepAliveNames(): string[] {
      return this.$modal.stack.map(({ instanceId }) => instanceId);
    },
  },
  methods: {
    dismiss() {
      this.$modal.pop();
    },
  },
});
</script>
