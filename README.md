# @ztrehagem/vue-modal

![](https://img.shields.io/npm/v/@ztrehagem/vue-modal/latest)
![](https://img.shields.io/npm/dependency-version/@ztrehagem/vue-modal/peer/vue)
![](https://img.shields.io/npm/types/@ztrehagem/vue-modal)
![](https://img.shields.io/github/license/ztrehagem/vue-modal)

Stacking-managed styleless modal library for Vue.js.

# Installation

```sh
npm install @ztrehagem/vue-modal
```

# Features

The modals are managed as stack structure with functions such as push and pop.
Only the top of stack is always rendered.
State of stacked modals are kept for each instances by using `<keep-alive>`.
In addition, multiple instances of same modal component can be in the stack.

# Usage

1. Declare all modal names and theirs argument schema.
   In this example, there is a modal named `hello` with an argument `{ nickname: string }`.

```tsx
export interface ModalTypes {
  hello: { nickname: string };
}
```

2. Implement modal components declared above.

```tsx
// HelloModal.tsx
import { useModal, VueModal } from "@ztrehagem/vue-modal";

export default defineComponent({
  props: {
    args: {
      type: Object as PropType<ModalTypes["hello"]>,
      required: true,
    },
  },

  setup(props) {
    const modal = useModal<ModalTypes>();

    const closeModal = (e: Event) => {
      e.preventDefault();
      modal.pop();
    };

    return () => (
      <VueModal>
        <p>Hello, {props.args.nickname}!</p>

        <button type="button" onClick={closeModal}>
          closeModal
        </button>
      </VueModal>
    );
  },
});
```

3. Implement root component.

```tsx
// App.tsx
import {
  useModal,
  VueModalBackdrop,
  VueModalRenderer,
} from "@ztrehagem/vue-modal";

export default defineComponent({
  setup() {
    const modal = useModal<ModalTypes>();

    const nickname = ref("");

    const openModal = (e: Event) => {
      e.preventDefault();
      modal.push("hello", { nickname: nickname.value });
    };

    return () => (
      <div>
        <input v-model={nickname.value} type="text" />

        <button type="button" onClick={openModal}>
          showModal
        </button>

        <VueModalBackdrop />
        <VueModalRenderer />
      </div>
    );
  },
});
```

4. Create app instance and install plugin.

```ts
import { ModalManager } from "@ztrehagem/vue-modal";
import HelloModal from "./HelloModal";
import App from "./App";

// Styles for <VueModal> and <VueModalBackdrop>.
// If you don't use these library components, this is not required.
import "@ztrehagem/vue-modal/style.css";

const modalManager = new ModalManager<ModalTypes>();
modalManager.addComponent("hello", HelloModal);

// Dynamic import is available through async components.
const asyncHelloModal = defineAsyncComponent(() => import("./HelloModal"));
modalManager.addComponent("hello", asyncHelloModal);

const app = createApp(App);
app.use(modalManager);
app.mount("#app");
```

See sources in this repo for example implementations of other parts,

## Library Components

- [`<VueModalRenderer>`](src/lib/VueModalRenderer.tsx) renders modal components with `<KeepAlive>` and `<Transition>`.
- [`<VueModal>`](src/lib/VueModal.tsx) provides default styles for CSS transition of modal components. It is optional to use.
- [`<VueModalBackdrop>`](src/lib/VueModalBackdrop.tsx) provides default styles for backdrop of modals. It is also optional to use.

# API

## class `ModalManager`

- see [src/lib/ModalManager.ts](src/lib/ModalManager.ts)
