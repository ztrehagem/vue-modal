# @ztrehagem/vue-modal

A simple modal component inspired by [vue-thin-modal](https://github.com/ktsn/vue-thin-modal).

## Installation

```sh
npm install @ztrehagem/vue-modal
```

## Features

- The `$modal` mediator global injected controls modals with stack.

- It can be nesting-placed modal.

  The nested modal is ready to appear only if its parent modal is in stack.
  This means must not do `pop()` or `replace()` the parent modal while the nested modal is appear.

## Usage

First, activate this plugin.

```ts
import Vue from 'vue'
import VueModal from '@ztrehagem/vue-modal'
import '@ztrehagem/vue-modal/dist/vue-modal.css' // optional

Vue.use(VueModal)
```

Then, the components `vue-modal` and `vue-modal-portal` are available in your app.
The component `vue-modal-portal` should exist only one in the app.

```html
<template>
  <div>
    <button type="button" @click="open">Open Modal</button>
    <vue-modal name="example">
      <div>
        <p>modal content here</p>
        <button type="button" @click="close">Close Modal</button>
      </div>
    </vue-modal>
    <vue-modal-portal />
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$modal.push('example')
    },
    close() {
      this.$modal.pop()
    }
  }
}
</script>
```

## Advanced Usage

###

- A way to access the mediator from out of Vue's lifecycle:

  ```ts
  import Vue from 'vue'
  import VueModal, { createMediator } from '@ztrehagem/vue-modal'

  const mediator = createMediator()

  Vue.use(VueModal, { mediator })

  export default mediator
  ```

  ```ts
  import modal from './path/to/that'

  modal.pop()
  modal.flush()
  ```



## API

### Options

- `vueModal`? : string | undefined, default: `'vue-modal'`
- `vueModalPortal`? : string | undefined, default: `'vue-modal-portal'`

  Providing custom name for the components.

- `mediator`? : VueModalMediator, default: `createMediator()`

  A mediator object.


### Component `vue-modal`

#### Props

- `name` - String, required

  Required as the modal name.
  The `name` must be unique against every modal you would use.
  The `naming` function is useful for giving unique name to each modals as mentioned later.

- `disable-backdrop` - Boolean, default: `false`

  It disables to close the modal by clicking the backdrop.

#### Slots

- `default` - A modal content.

### Mediator `$modal`

#### Properties

- `stack` : string[]

  A stack of pushed modal names.

- `current` : string

  The modal name stacked on top.

#### Methods

- `push` : (name: string) => void

  Show the modal that cooresponding with the `name`.

- `pop` : () => void

  Hide the modal that is appearing.

- `replace` : (name: string) => void

  It does `pop()` and `push(name)`.

- `flush` : () => void

  Hide the all modals in stack.

- `isStacked` : (name: string) => boolean

  Whether the modal is in the stack.

- `naming` : () => string

  It generates a unique name. Use like:
  ```html
  <script>
    export default {
      data () {
        modalName: this.$modal.naming()
      },
      methods: {
        openModal () {
          this.$modal.push(this.modalName)
        }
      }
    }
  </script>
  ```

### Events

- `pushed` : (name: string)

  When a new modal is pushed.

- `popped` : (name: string)

  When a stacked modal is popped.

- `afterLeave` : (name: string)

  When a popped modal is disappeared from the DOM tree.
