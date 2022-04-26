import { computed, defineComponent, KeepAlive, Transition } from "vue";
import { useModal } from "./ModalManager";

export default defineComponent({
  setup() {
    const modal = useModal();

    const keepAliveNames = computed(() =>
      modal.stack.map((instance) => instance.instanceId)
    );

    return () => (
      <Transition mode="out-in">
        {modal.top && (
          <KeepAlive key={modal.top.instanceId} include={keepAliveNames.value}>
            <modal.top.component
              key={modal.top.instanceId}
              args={modal.top.args}
            />
          </KeepAlive>
        )}
      </Transition>
    );
  },
});
