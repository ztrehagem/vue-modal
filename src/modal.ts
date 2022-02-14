import { ModalManager, useModal as baseUseModal } from "./lib/main";

export interface ModalTypes {
  hello: { name: string };
}

export function useModal(): ModalManager<ModalTypes> {
  return baseUseModal<ModalTypes>();
}
