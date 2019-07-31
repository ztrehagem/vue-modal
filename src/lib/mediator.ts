import Vue, { VNode } from 'vue'

export interface ModalMetadata {
  children: VNode[]
  mounted: boolean
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
}

export type VueModalMediator = PublicData & Methods

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
    },
  })
