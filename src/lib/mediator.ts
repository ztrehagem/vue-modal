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

interface Computed {
  current: string | undefined
}

interface Methods {
  push(name: string): void
  pop(): void
  replace(name: string): void
  flush(): void
  isStacked(name: string): boolean
  naming(): string
  register(name: string, metadata: ModalMetadata): void
  update(name: string, metadata: ModalMetadata): void
  unregister(name: string): void
}

export type EventName = 'pushed' | 'poped' | 'afterLeave'

export interface EventEmitter {
  $emit(eventName: EventName, modalName: string): void
  $on(eventName: EventName, fn: (modalName: string) => void): void
  $once(eventName: EventName, fn: (modalName: string) => void): void
  $off(eventName: EventName, fn?: (modalName: string) => void): void
}

export type VueModalMediator = PublicData & Methods & Computed & EventEmitter

export function createMediator(): VueModalMediator {
  return new Vue<Data, Methods, {}, Computed>({
    data: {
      stack: [],
      namingId: 0,
      pool: {},
    },
    computed: {
      current(): string | undefined {
        return this.stack.slice(-1).pop()
      },
    },
    methods: {
      push(name) {
        if (this.stack.every(n => n !== name)) {
          this.stack.push(name)
          window.document.body.style.overflow = 'hidden'
          this.$emit('pushed', name)
        }
      },
      pop() {
        if (!this.stack.length) {
          return
        }
        const name = this.stack.pop()
        if (!this.stack.length) {
          window.document.body.style.overflow = null
        }
        this.$emit('poped', name)
      },
      replace(name) {
        this.stack.pop()
        this.stack.push(name)
      },
      flush() {
        this.stack.splice(0, Infinity)
      },
      isStacked(name) {
        return this.stack.indexOf(name) >= 0
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
}
