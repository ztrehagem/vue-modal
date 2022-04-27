import { defineComponent } from "vue";
import ModalDemo from "./components/ModalDemo";
import PackageInformation from "./components/PackageInformation";

export default defineComponent({
  setup() {
    return () => (
      <main>
        <PackageInformation />

        <ModalDemo />
      </main>
    );
  },
});
