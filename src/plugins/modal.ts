import { ModalManager, useModal as baseUseModal } from "../lib/main";
import HelloModal from "../components/HelloModal.vue";

export interface ModalTypes {
  hello: { name: string };
}

export function createModalManager(): ModalManager<ModalTypes> {
  const manager = new ModalManager<ModalTypes>();
  manager.addComponent("hello", HelloModal);
  return manager;
}

export function useModal(): ModalManager<ModalTypes> {
  return baseUseModal<ModalManager<ModalTypes>, keyof ModalTypes>();
}
