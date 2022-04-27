import { defineComponent, Teleport } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "../lib/main";
import { useModal } from "../plugins/modal";
import NameForm from "./NameForm";

export default defineComponent({
  setup() {
    const modal = useModal();

    const showModal = (name: string): void => {
      modal.push("hello", { name });
    };

    const dismissModal = (e: Event): void => {
      modal.pop();
    };

    return () => (
      <section>
        <h2>Demo</h2>

        <NameForm onSubmit={showModal} />

        <Teleport to="body">
          <div onClick={dismissModal}>
            <VueModalBackdrop />
            <VueModalRenderer />
          </div>
        </Teleport>
      </section>
    );
  },
});
