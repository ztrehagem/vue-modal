import { defineComponent } from "vue";
import pkg from "../package.json";
import ModalDemo from "./components/ModalDemo";

export default defineComponent({
  setup() {
    return () => (
      <div>
        <h1>
          {pkg.name}@{pkg.version}
        </h1>

        <ModalDemo />
      </div>
    );
  },
});
