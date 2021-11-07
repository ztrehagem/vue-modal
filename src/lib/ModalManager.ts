import Vue from "vue";
import { VueConstructor } from "vue/types/vue";
import { freezeBody, unfreezeBody } from "./freeze";

type ModalState = Record<string, unknown> | null;

type ModalTypes<Key extends string = string> = Record<Key, ModalState>;

type ModalKey<Types extends ModalTypes> = Types extends ModalTypes<infer U>
  ? U
  : never;

type ModalInstance<Types extends ModalTypes<Key>, Key extends string> = {
  name: Key;
  instanceId: string;
  component: VueConstructor;
  args: Types[Key];
};

class ModalManagerState<Types extends ModalTypes<Key>, Key extends string> {
  stack: ModalInstance<Types, Key>[] = [];
}

export class ModalManager<
  Types extends ModalTypes<Key>,
  Key extends string = ModalKey<Types>
> {
  #state = Vue.observable(new ModalManagerState<Types, Key>());
  #components = new Map<Key, VueConstructor>();

  get stack(): readonly Readonly<ModalInstance<Types, Key>>[] {
    return this.#state.stack;
  }

  get top(): Readonly<ModalInstance<Types, Key>> | null {
    return this.stack.slice(-1).pop() ?? null;
  }

  addComponent(name: Key, component: VueConstructor): void {
    this.#components.set(name, component);
  }

  push<K extends Key>(
    name: K,
    args: Types[K]
  ): ModalInstance<Types, Key> | null {
    const component = this.#components.get(name);
    if (!component) {
      // console.error(`No component for '${this.$modal.top.name}' is provided to $modal`)
      return null;
    }

    const instanceId = `${name}-${this.stack.length}`;
    const namedComponent = Vue.extend(component).extend({ name: instanceId });

    const instance: ModalInstance<Types, Key> = {
      name,
      instanceId,
      component: namedComponent,
      args,
    };

    this.#state.stack.push(instance);

    if (this.stack.length === 1) {
      freezeBody();
    }

    return instance;
  }

  pop<K extends Key>(name?: K): ModalInstance<Types, Key> | null {
    if (name && this.top?.name !== name) return null;
    const popped = this.#state.stack.pop() ?? null;
    if (this.stack.length === 0) {
      unfreezeBody();
    }
    return popped;
  }

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

  flush(): void {
    this.#state.stack = [];
    unfreezeBody();
  }
}