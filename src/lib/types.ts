import { DefineComponent } from "vue";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ModalComponent = DefineComponent<any, any, any>;

export type ModalKey = string | number | symbol;

export type ModalState<T = unknown> = Record<ModalKey, T> | null;

export type ModalTypes<Key extends ModalKey> = Record<Key, ModalState>;

export type ModalInstance<
  Types extends ModalTypes<Key>,
  Key extends ModalKey
> = {
  key: Key;
  instanceId: string;
  component: ModalComponent;
  args: Types[Key];
};
