import { PluginFunction } from 'vue'
import VueModal from './VueModal.vue'
import VueModalPortal from './VueModalPortal.vue'
import { createMediator, VueModalMediator } from './mediator'

export interface Options {
  vueModal?: string
  vueModalPortal?: string
}

const install: PluginFunction<Options> = (Vue, options = {}) => {
  if ('$modal' in Vue.prototype) {
    return
  }

  const mediator = createMediator()

  Vue.component(options.vueModal || 'vue-modal', VueModal)
  Vue.component(options.vueModalPortal || 'vue-modal-portal', VueModalPortal)
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
