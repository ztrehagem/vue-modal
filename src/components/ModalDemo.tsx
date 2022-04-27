import { ref, defineComponent, Teleport } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "../lib/main";
import { useModal } from "../plugins/modal";

export default defineComponent({
  setup() {
    const modal = useModal();

    const name = ref("");

    const showModal = (e: Event): void => {
      e.preventDefault();
      modal.push("hello", { name: name.value });
    };

    const dismissModal = (e: Event): void => {
      modal.pop();
    };

    return () => (
      <div>
        <input v-model={name.value} type="text" placeholder="your name" />
        <button type="button" onClick={showModal}>
          showModal
        </button>

        <Teleport to="body">
          <div onClick={dismissModal}>
            <VueModalBackdrop />
            <VueModalRenderer />
          </div>
        </Teleport>
      </div>
    );
  },
});
