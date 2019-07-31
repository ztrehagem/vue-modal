<script lang="ts">
import Vue from 'vue'
import VueModalContent from './VueModalContent.vue'
import VueModalBackdrop from './VueModalBackdrop.vue'

const mapObject = <T extends object, K extends keyof T, R>(
  obj: T,
  fn: (value: T[K], key: K) => R,
) => {
  return (Object.keys(obj) as K[]).map<R>(key => fn(obj[key], key))
}

export default Vue.extend({
  render(h) {
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
