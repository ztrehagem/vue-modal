import Vue, { VNode } from 'vue'

export interface ModalMetadata {
  children: VNode[]
  disableBackdrop: boolean
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
  naming(): string
  register(name: string, metadata: ModalMetadata): void
  unregister(name: string): void
}

export type EventName = 'afterLeave'

export interface EventEmitter {
  $emit(eventName: EventName, modalName: string): void
  $on(eventName: EventName, fn: (modalName: string) => void): void
  $once(eventName: EventName, fn: (modalName: string) => void): void
  $off(eventName: EventName): void
}

export type VueModalMediator = PublicData & Methods & EventEmitter

export const createMediator: () => VueModalMediator = () =>
  new Vue<Data, Methods>({
    data: {
      stack: [],
      namingId: 0,
      pool: {},
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
      naming() {
        return `vue-modal/${this.namingId++}`
      },
      register(name, metadata) {
        this.$set(this.pool, name, metadata)
      },
      unregister(name) {
        this.$delete(this.pool, name)
      },
    },
  })
