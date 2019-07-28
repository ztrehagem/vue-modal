# @ztrehagem/vue-modal

A simple modal component inspired by [vue-thin-modal](https://github.com/ktsn/vue-thin-modal).

## Installation

```sh
npm install @ztrehagem/vue-modal
```

## Usage

1. Activate this plugin.

```ts
import Vue from 'vue'
import VueModal from '@ztrehagem/vue-modal'
import '@ztrehagem/vue-modal/dist/vue-modal.css' // optional

Vue.use(VueModal)
```

It's able to pass some options like:

```ts
Vue.use(VueModal, {
  vueModal: 'vue-modal',
  vueModalBackdrop: 'vue-modal-backdrop',
})
```

2. The components `vue-modal` and `vue-modal-backdrop` are available in your app.
If you need to show the backdrop, it should exist only one in the app.

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
    <vue-modal-backdrop />
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

## API

### `<vue-modal>` component

#### Props

- `name` - String, required

  Required as the modal name.
  The `name` must be unique against every modal you would use.
  The `naming` function is useful for giving unique name to each modals as mentioned later.

- `disable-backdrop` - Boolean, default: `false`

  It disables to close the modal by clicking the backdrop.

#### Slots

- `default` - A modal content.

### `this.$modal` mediator

#### Properties

- `stack` : string[]

  A stack of pushed modal names.

#### Methods

- `push` : (name: string) => void

  Show the modal that cooresponding with the `name`.

- `pop` : () => void

  Hide the modal that is appearing.

- `replace` : (name: string) => void

  It does `pop()` and `push(name)`.

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
