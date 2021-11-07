import Vue from "vue";
import VueModal, { ModalManager } from "@/lib/main";
import HelloModal from "@/components/HelloModal.vue";

export interface ModalTypes {
  hello: { name: string };
}

export const modalManager = new ModalManager<ModalTypes>();

modalManager.addComponent("hello", HelloModal);

Vue.use(VueModal, { manager: modalManager });

declare module "vue/types/vue" {
  interface Vue {
    readonly $modal: typeof modalManager;
  }
}
