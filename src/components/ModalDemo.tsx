import { defineComponent, ref, Teleport } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "../lib/main";
import { useModal } from "../plugins/modal";
import NameForm from "./NameForm";

export default defineComponent({
  setup() {
    const modal = useModal();
    const name = ref("");

    const showModal = (): void => {
      modal.push("hello", { name: name.value });
    };

    const dismissModal = (e: Event): void => {
      modal.pop();
    };

    return () => (
      <section>
        <h2>Demo</h2>

        <NameForm
          name={name.value}
          onUpdateName={(v) => (name.value = v)}
          onSubmit={showModal}
        />

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
