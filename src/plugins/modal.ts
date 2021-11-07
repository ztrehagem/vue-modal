import Vue from "vue";
import * as modal from "@/lib/main";
import FooModal from "@/components/FooModal.vue";

export interface ModalTypes extends modal.ModalTypes {
  foo: { name: string };
}

export const modalManager = new modal.ModalManager<ModalTypes>();

modalManager.addComponent("foo", FooModal);

Vue.use(modal.plugin, { manager: modalManager });

declare module "vue/types/vue" {
  interface Vue {
    readonly $modal: typeof modalManager;
  }
}
