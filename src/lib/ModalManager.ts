import {
  App,
  defineComponent,
  h,
  inject,
  InjectionKey,
  shallowReactive,
} from "vue";
import {
  ModalComponentNotProvidedError,
  ModalManagerInjectionError,
} from "./errors";
import { freezeBody, unfreezeBody } from "./freeze";
import { ModalComponent, ModalInstance, ModalKey, ModalTypes } from "./types";
import { incrementor } from "./utils";

export class ModalManager<
  Types extends ModalTypes<Key> = ModalTypes<ModalKey>,
  Key extends ModalKey = keyof Types
> {
  readonly #id = incrementor();
  readonly #stack = shallowReactive<ModalInstance<Types, Key>[]>([]);
  readonly #components = new Map<Key, ModalComponent>();

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
   * Register a modal component and associate it with key to call it.
   * @param key Modal key
   * @param component Modal component
   */
  addComponent(key: Key, component: ModalComponent): void {
    this.#components.set(key, component);
  }

  /**
   * Create new modal instance and push it into the stack. If there are some instances in the stack, new modal will be instead of currently displayed.
   * @param key Modal key
   * @param args A value passed to the modal component as `args` prop
   * @returns Pushed modal instance
   * @throws {ModalComponentNotProvidedError} The modal component specified with `key` was not provided.
   */
  push<K extends Key>(key: K, args: Types[K]): ModalInstance<Types, Key> {
    const component = this.#components.get(key);
    if (!component) {
      throw new ModalComponentNotProvidedError(key);
    }

    const instanceId = `VueModal[${this.#id.next().value}]::${key.toString()}`;

    const namedComponent = defineComponent({
      name: instanceId,
      setup(props, { attrs }) {
        return () => h(component, attrs);
      },
    });

    // TODO: Capture current focused element to restore focusing when closing the modal.
    const instance: ModalInstance<Types, Key> = {
      key,
      instanceId,
      component: namedComponent,
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
   * @returns Popped modal instance
   */
  pop(): ModalInstance<Types, Key> | null {
    const popped = this.#stack.pop();

    if (!popped) {
      return null;
    }

    if (this.stack.length === 0) {
      unfreezeBody();
    }

    return popped;
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

/**
 * Get ModalManager instance provided in current context.
 * @returns ModalManager instance
 * @throws {ModalManagerInjectionError} Injection failure
 */
export const useModal = <
  Types extends ModalTypes<keyof Types>
>(): ModalManager<Types> => {
  const manager = inject<ModalManager<Types>>(injectionKey);
  if (!manager) {
    throw new ModalManagerInjectionError();
  }
  return manager;
};
