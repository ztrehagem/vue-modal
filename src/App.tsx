import { ref, defineComponent } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "./lib/main";
import { useModal } from "./plugins/modal";

export default defineComponent({
  setup() {
    const modal = useModal();

    const name = ref("");

    const showModal = (e: Event): void => {
      e.preventDefault();
      modal.push("hello", { name: name.value });
    };

    return () => (
      <div id="app">
        <h1>@ztrehagem/vue-modal@3</h1>

        <div>
          <input v-model={name.value} type="text" placeholder="your name" />
          <button type="button" onClick={showModal}>
            showModal
          </button>
        </div>

        <VueModalBackdrop />
        <VueModalRenderer />
      </div>
    );
  },
});
