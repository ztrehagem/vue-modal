# @ztrehagem/vue-modal

![](https://img.shields.io/github/package-json/v/ztrehagem/vue-modal/v2)
![](https://img.shields.io/github/license/ztrehagem/vue-modal)
![](https://img.shields.io/badge/vue-%5E3.0.0-brightgreen)

Stack-managed styleless modal library for Vue.js.

# Installation

```sh
npm install @ztrehagem/vue-modal@2
```

# Features

The modals are managed as stack structure with functions such as push and pop.
Only the top of stack is always rendered.
State of stacked modals are kept for each instances by using `<keep-alive>`.
In addition, multiple instances of same modal component can be in the stack.

# Usage

```ts
import { createApp } from "vue";
import { ModalManager, useModal } from "@ztrehagem/vue-modal";

// Optional. For using default modal/backdrop components.
import "@ztrehagem/vue-modal/style.css";

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
const app = createApp(/* ... */);
app.use(modalManager);
app.mount(/* ... */);

// Accessing ModalManager instance
const modal = useModal<ModalTypes>();
```

For example of other parts, please reference these:

- [src/components/HelloModal.vue](src/components/HelloModal.vue)
- [src/App.vue](src/App.vue)

`<VueModalRenderer>` is rendering container of modal components.
`<VueModal>` is base of modal component, which provides css transition.
`<VueModalBackdrop>` is backdrop of modals.

`<VueModal>` and `<VueModalBackdrop>` can be replaced your components.
In that case, please reference implementation of default components.

# API

## class `ModalManager`

- see [src/lib/ModalManager.ts](src/lib/ModalManager.ts)
