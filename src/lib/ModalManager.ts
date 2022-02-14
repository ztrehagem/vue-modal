import {
  App,
  DefineComponent,
  inject,
  InjectionKey,
  shallowReactive,
} from "vue";
import { freezeBody, unfreezeBody } from "./freeze";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DefinedComponent = DefineComponent<any, any, any>;

type AnyKey = string | number | symbol;

export type ModalState = Record<AnyKey, unknown> | null;

export type ModalTypes<Key extends AnyKey = AnyKey> = Record<Key, ModalState>;

export type ModalKey<Types extends ModalTypes> = Types extends ModalTypes<
  infer U
>
  ? U
  : never;

export type ModalInstance<Types extends ModalTypes<Key>, Key extends AnyKey> = {
  name: Key;
  instanceId: string;
  component: DefinedComponent;
  args: Types[Key];
};

export class ModalManager<
  Types extends ModalTypes<Key> = ModalTypes,
  Key extends AnyKey = ModalKey<Types>
> {
  readonly #stack = shallowReactive<ModalInstance<Types, Key>[]>([]);
  readonly #components = new Map<Key, DefinedComponent>();

  /**
   * The stack of modal instances.
   */
  get stack(): readonly Readonly<ModalInstance<Types, Key>>[] {
    return this.#stack;
  }

  /**
   * The top of stack, which means current rendered modal.
   */
  get top(): Readonly<ModalInstance<Types, Key>> | null {
    return this.stack.slice(-1).pop() ?? null;
  }

  /**
   * Register a modal component and associate it with name to call it.
   * @param name Modal name
   * @param component Modal component
   */
  addComponent(name: Key, component: DefinedComponent): void {
    this.#components.set(name, component);
  }

  /**
   * Create new modal instance and push it into the stack. If there are some instances in the stack, new modal will be instead of currently displayed.
   * @param name Modal name
   * @param args A value passed to the modal component as `args` prop
   * @returns Pushed modal instance
   */
  push<K extends Key>(
    name: K,
    args: Types[K]
  ): ModalInstance<Types, Key> | null {
    const component = this.#components.get(name);
    if (!component) {
      // console.error(`No component for '${this.$modal.top.name}' is provided to $modal`)
      return null;
    }

    const instanceId = `${name.toString()}-${this.stack.length}`;
    // FIXME: uncomment
    // const namedComponent = defineComponent({
    //   ...component,
    //   name: instanceId,
    // });

    const instance: ModalInstance<Types, Key> = {
      name,
      instanceId,
      // component: namedComponent,
      component,
      args,
    };

    this.#stack.push(instance);

    if (this.stack.length === 1) {
      freezeBody();
    }

    return instance;
  }

  /**
   * Remove the modal currently rendered. If it is remained some modal instances in the stack, the next one is rendered.
   * @param name If specified, pop is executed only when it is equal to name of the top of stack.
   * @returns Popped modal instance
   */
  pop<K extends Key>(name?: K): ModalInstance<Types, Key> | null {
    if (name && this.top?.name !== name) return null;
    const popped = this.#stack.pop() ?? null;
    if (this.stack.length === 0) {
      unfreezeBody();
    }
    return popped;
  }

  /**
   * Pop then push. Arguments are same as `push()`.
   * @param name
   * @param args
   * @returns Popped and pushed modal instances
   */
  replace<K extends Key>(
    name: K,
    args: Types[K]
  ): {
    pushed: ModalInstance<Types, Key> | null;
    popped: ModalInstance<Types, Key> | null;
  } {
    const popped = this.pop();
    const pushed = this.push(name, args);
    return { pushed, popped };
  }

  /**
   * Wipe all modal instances, resulting no modals will be rendered.
   */
  flush(): void {
    this.#stack.splice(0, Infinity);
    unfreezeBody();
  }

  install(app: App): void {
    app.provide(injectionKey, this);
  }
}

const injectionKey: InjectionKey<ModalManager> = Symbol();

export function useModal<
  T extends ModalManager<Types, Keys>,
  Keys extends AnyKey = AnyKey,
  Types extends ModalTypes = ModalTypes<Keys>
>(): T {
  const manager = inject<T>(injectionKey);
  if (!manager) {
    throw new ModalManagerInjectionError();
  }
  return manager;
}

export class ModalManagerInjectionError extends Error {
  static get errorName(): string {
    return "ModalManagerInjectionError";
  }

  static get errorMessage(): string {
    return "No ModalManager instance is injected.";
  }

  constructor(message = ModalManagerInjectionError.errorMessage) {
    super(message);
    this.name = ModalManagerInjectionError.errorName;
  }
}
