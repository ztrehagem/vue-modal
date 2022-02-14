<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "./ModalManager";

const modal = useModal();

const keepAliveNames = computed(() =>
  modal.stack.map((instance) => instance.instanceId)
);
</script>

<template>
  <transition mode="out-in">
    <keep-alive
      v-if="modal.top"
      :key="modal.top.instanceId"
      :include="keepAliveNames"
    >
      <component
        :is="modal.top.component"
        :key="modal.top.instanceId"
        :args="modal.top.args"
      />
    </keep-alive>
  </transition>
</template>
