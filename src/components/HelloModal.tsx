import { defineComponent, PropType } from "vue";
import { VueModal } from "../lib/main";
import { ModalTypes, useModal } from "../plugins/modal";
import { content, root } from "./HelloModal.css";
import NameForm from "./NameForm";

export default defineComponent({
  props: {
    args: {
      type: Object as PropType<ModalTypes["hello"]>,
      required: true,
    },
  },

  setup(props) {
    const modal = useModal();

    const dismiss = (e: Event): void => {
      e.preventDefault();
      modal.pop();
    };

    const showModal = (name: string): void => {
      modal.push("hello", { name });
    };

    const stopPropagation = (e: Event): void => {
      e.stopPropagation();
    };

    return () => (
      <VueModal>
        <div class={root} onClick={stopPropagation}>
          <div class={content}>
            <p>Hello, {props.args.name}!</p>

            <button type="button" onClick={dismiss}>
              closeModal
            </button>

            <p>Push the same modal recursively.</p>

            <NameForm onSubmit={showModal} />
          </div>
        </div>
      </VueModal>
    );
  },
});
