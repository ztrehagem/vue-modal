import Vue from "vue";
import { VueConstructor } from "vue/types/vue";
import { freezeBody, unfreezeBody } from "./freeze";

export type ModalState = Record<string, unknown> | null;

export type ModalTypes = Record<string, ModalState>;

export interface ModalStackItem<Decls extends ModalTypes> {
  name: keyof Decls;
  instanceId: string;
  component: VueConstructor;
  state: Decls[keyof Decls];
}

class ModalManagerState<Decls extends ModalTypes> {
  stack: ModalStackItem<Decls>[] = [];
}

export class ModalManager<Decls extends ModalTypes> {
  #state = Vue.observable(new ModalManagerState<Decls>());
  #components = new Map<keyof Decls, VueConstructor>();

  get stack(): readonly Readonly<ModalStackItem<Decls>>[] {
    return this.#state.stack;
  }

  get top(): Readonly<ModalStackItem<Decls>> | null {
    return this.stack.slice(-1).pop() ?? null;
  }

  addComponent(name: keyof Decls, component: VueConstructor): void {
    this.#components.set(name, component);
  }

  push<K extends keyof Decls>(name: K, state: Decls[K]): void {
    const component = this.#components.get(name);
    if (!component) {
      // console.error(`No component for '${this.$modal.top.name}' is provided to $modal`)
      return;
    }

    const instanceId = `${name}-${this.stack.length}`;
    const namedComponent = Vue.extend(component).extend({ name: instanceId });

    this.#state.stack.push({
      name,
      instanceId,
      component: namedComponent,
      state: Vue.observable(state),
    });

    if (this.stack.length === 1) {
      freezeBody();
    }
  }

  pop<K extends keyof Decls>(name?: K): keyof Decls | null {
    if (name && this.top?.name !== name) return null;
    const popped = this.#state.stack.pop()?.name ?? null;
    if (this.stack.length === 0) {
      unfreezeBody();
    }
    return popped;
  }

  replace<K extends keyof Decls>(name: K, state: Decls[K]): void {
    this.pop();
    this.push(name, state);
  }

  flush(): void {
    this.#state.stack = [];
    unfreezeBody();
  }
}
