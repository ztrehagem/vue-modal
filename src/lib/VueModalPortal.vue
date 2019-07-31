<script lang="ts">
import Vue from 'vue'
import VueModalContent from './VueModalContent.vue'
import VueModalBackdrop from './VueModalBackdrop.vue'
import { ModalMetadata } from './mediator'

const filterObject = <T extends object, K extends keyof T>(
  obj: T,
  fn: (value: T[K], key: K) => boolean,
) => {
  return (Object.keys(obj) as K[])
    .filter(key => fn(obj[key], key))
    .reduce((dest, key) => (dest[key] = obj[key]), {} as Partial<T>)
}

const mapObject = <T extends object, K extends keyof T, R>(
  obj: T,
  fn: (value: T[K], key: K) => R,
) => {
  return (Object.keys(obj) as K[]).map<R>(key => fn(obj[key], key))
}

export default Vue.extend({
  render(h) {
    // const pool = filterObject(this.$modal.pool, (_, name) => this.$modal.stack.indexOf(name) >= 0)
    // console.log(this.$modal.pool, pool)

    return h(
      'div',
      {
        staticClass: 'vue-modal-content',
      },
      [
        h(VueModalBackdrop),
        ...mapObject(this.$modal.pool, (modal, name) =>
          h(VueModalContent, { props: { name } }, modal.children),
        ),
      ],
    )
  },
})
</script>
