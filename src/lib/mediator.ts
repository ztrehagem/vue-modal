import Vue, { VNode } from 'vue'

export interface ModalMetadata {
  children?: VNode[]
  props: {
    name: string
    disableBackdrop: boolean
  }
}

interface PublicData {
  stack: string[]
  pool: Record<string, ModalMetadata>
}

interface Data extends PublicData {
  namingId: number
}

interface Methods {
  push(name: string): void
  pop(): void
  replace(name: string): void
  flush(): void
  naming(): string
  register(name: string, metadata: ModalMetadata): void
  update(name: string, metadata: ModalMetadata): void
  unregister(name: string): void
}

export interface EventEmitter {
  $emit(eventName: 'afterLeave', modalName: string): void
  $on(eventName: 'afterLeave', fn: (modalName: string) => void): void
  $once(eventName: 'afterLeave', fn: (modalName: string) => void): void
  $off(eventName: 'afterLeave'): void
}

export type VueModalMediator = PublicData & Methods & EventEmitter

export const createMediator: () => VueModalMediator = () =>
  new Vue<Data, Methods>({
    data: {
      stack: [],
      namingId: 0,
      pool: {},
    },
    watch: {
      stack() {
        if (this.stack.length) {
          window.document.body.style.overflow = 'hidden'
        } else {
          window.document.body.style.overflow = null
        }
      },
    },
    methods: {
      push(name) {
        if (this.stack.every(n => n !== name)) {
          this.stack.push(name)
        }
      },
      pop() {
        this.stack.pop()
      },
      replace(name) {
        this.stack.pop()
        this.stack.push(name)
      },
      flush() {
        this.stack.splice(0, Infinity)
      },
      naming() {
        return `vue-modal/${this.namingId++}`
      },
      register(name, metadata) {
        this.$set(this.pool, name, metadata)
      },
      update(name, metadata) {
        this.$set(this.pool, name, metadata)
      },
      unregister(name) {
        this.$delete(this.pool, name)
      },
    },
  })
