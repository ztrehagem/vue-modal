import { defineComponent, Transition } from "vue";
import { useModal } from "./ModalManager";

export default defineComponent({
  setup() {
    const modal = useModal();

    return () => (
      <Transition>
        {modal.top && <div class="vue-modal-backdrop"></div>}
      </Transition>
    );
  },
});
