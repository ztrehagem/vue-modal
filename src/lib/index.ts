import Vue, { PluginFunction } from 'vue'
import VueModal from './VueModal.vue'
import VueModalBackdrop from './VueModalBackdrop.vue'

interface PublicData {
  stack: string[]
}

interface Data extends PublicData {
  namingId: number
}

interface Methods {
  push(name: string): void
  pop(): void
  replace(name: string): void
  naming(): string
}

type VueModalMediator = PublicData & Methods

const createMediator: () => VueModalMediator = () =>
  new Vue<Data, Methods>({
    data: {
      stack: [],
      namingId: 0,
    },
    methods: {
      push(name: string) {
        if (this.stack.every(n => n !== name)) {
          this.stack.push(name)
        }
      },
      pop() {
        this.stack.pop()
      },
      replace(name: string) {
        this.stack.pop()
        this.stack.push(name)
      },
      naming() {
        return `vue-modal/${this.namingId++}`
      },
    },
  })

export interface Options {
  vueModal?: string
  vueModalBackdrop?: string
}

const install: PluginFunction<Options> = (Vue, options = {}) => {
  if ('$modal' in Vue.prototype) {
    return
  }

  const mediator = createMediator()

  Vue.component(options.vueModal || 'vue-modal', VueModal)
  Vue.component(
    options.vueModalBackdrop || 'vue-modal-backdrop',
    VueModalBackdrop,
  )
  Object.defineProperty(Vue.prototype, '$modal', {
    get() {
      return mediator
    },
  })
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $modal: VueModalMediator
  }
}

export default {
  install,
}
