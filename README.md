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

// Optional. For using default components.
import "@ztrehagem/vue-modal/dist/vue-modal.css";

// Import your modal components.
import HelloModal from "@/components/HelloModal.vue";

// Define id and arguments of each modals.
// In this example, there is `hello` modal with an argument `{ nickname: string }`.
export interface ModalTypes {
  hello: { nickname: string };
}

export const modalManager = new ModalManager<ModalTypes>();

// Associate your Vue components with ids defined above.
modalManager.addComponent("hello", HelloModal);

Vue.use(VueModal, { manager: modalManager });

declare module "vue/types/vue" {
  interface Vue {
    readonly $modal: typeof modalManager;
  }
}
```

The `Modal` and `ModalBackdrop` components can be replaced your component.
In that case, please reference implementation of default components.

WIP

## API

WIP
