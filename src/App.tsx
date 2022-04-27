import { ref, defineComponent } from "vue";
import { VueModalBackdrop, VueModalRenderer } from "./lib/main";
import { useModal } from "./plugins/modal";
import pkg from "../package.json";

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
      <div id="app">
        <h1>
          {pkg.name}@{pkg.version}
        </h1>

        <div>
          <input v-model={name.value} type="text" placeholder="your name" />
          <button type="button" onClick={showModal}>
            showModal
          </button>
        </div>

        <div onClick={dismissModal}>
          <VueModalBackdrop />
          <VueModalRenderer />
        </div>
      </div>
    );
  },
});
