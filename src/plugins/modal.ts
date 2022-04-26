import { ModalManager, useModal as baseUseModal } from "../lib/main";

export interface ModalTypes {
  hello: { name: string };
}

export const createModalManager = (): ModalManager<ModalTypes> => {
  return new ModalManager<ModalTypes>();
};

export const useModal = (): ModalManager<ModalTypes> => {
  return baseUseModal<ModalTypes>();
};
