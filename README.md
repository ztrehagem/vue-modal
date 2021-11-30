# @ztrehagem/vue-modal

Stack-managed styleless modal library for Vue.js.

## Installation

```sh
npm install @ztrehagem/vue-modal
```

## Features

The modals are managed as stack structure with functions such as push and pop.
Only the top of stack is always rendered.
State of stacked modals are kept for each instances by using `<keep-alive>`.
In addition, multiple instances of same modal component can be in the stack.

## Usage

```ts
import Vue from "vue";
import VueModal, { ModalManager } from "@ztrehagem/vue-modal";

// Optional. For using default modal/backdrop components.
import "@ztrehagem/vue-modal/dist/vue-modal.css";

// Import your modal components.
import HelloModal from "@/components/HelloModal.vue";

// Define id and arguments of each modals.
// In this example, there is `hello` modal which has an argument `{ nickname: string }`.
export interface ModalTypes {
  hello: { nickname: string };
}

// Create a ModalManager instance and associate your Vue components with ids defined above.
export const modalManager = new ModalManager<ModalTypes>();
modalManager.addComponent("hello", HelloModal);

// Install plugin
Vue.use(VueModal, { manager: modalManager });

// Type declarations for TypeScript
declare module "vue/types/vue" {
  interface Vue {
    readonly $modal: typeof modalManager;
  }
}
```

For details of other parts, please reference these:

- [src/components/HelloModal.vue](src/components/HelloModal.vue)
- [src/App.vue](src/App.vue)

The `VueModal` and `VueModalBackdrop` components can be replaced your components.
In that case, please reference implementation of default components.

## API

### class `ModalManager`

- see [src/lib/ModalManager.ts](src/lib/ModalManager.ts)
