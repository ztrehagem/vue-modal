import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { slots }) {
    return () => <div class="vue-modal">{slots.default?.()}</div>;
  },
});
