import { defineAsyncComponent } from "vue";
import * as lib from "../lib/main";

export interface ModalTypes {
  hello: { name: string };
}

export const createModalManager = (): lib.ModalManager<ModalTypes> => {
  const manager = new lib.ModalManager<ModalTypes>();
  manager.addComponent(
    "hello",
    defineAsyncComponent(() => import("../components/HelloModal"))
  );
  return manager;
};

export const useModal = (): lib.ModalManager<ModalTypes> => {
  return lib.useModal<ModalTypes>();
};
