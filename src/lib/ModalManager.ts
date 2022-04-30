import {
  App,
  defineComponent,
  h,
  inject,
  InjectionKey,
  shallowReactive,
} from "vue";
import { ModalManagerInjectionError } from "./errors";
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
   * Register a modal component and associate it with name to call it.
   * @param name Modal name
   * @param component Modal component
   */
  addComponent(name: Key, component: ModalComponent): void {
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

    const instanceId = `VueModal[${this.#id.next().value}]::${name.toString()}`;

    const namedComponent = defineComponent({
      name: instanceId,
      setup(props, { attrs }) {
        return () => h(component, attrs);
      },
    });

    // TODO: Capture current focused element to restore focusing when closing the modal.
    const instance: ModalInstance<Types, Key> = {
      name,
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

export const useModal = <
  Types extends ModalTypes<keyof Types>
>(): ModalManager<Types> => {
  const manager = inject<ModalManager<Types>>(injectionKey);
  if (!manager) {
    throw new ModalManagerInjectionError();
  }
  return manager;
};
