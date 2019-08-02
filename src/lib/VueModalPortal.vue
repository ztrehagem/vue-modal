<script lang="ts">
import Vue from 'vue'
import VueModalContent from './VueModalContent.vue'
import VueModalBackdrop from './VueModalBackdrop.vue'
import { mapObject } from './utils'

export default Vue.extend({
  render(h) {
    return h(
      'div',
      {
        staticClass: 'vue-modal-portal',
      },
      [
        h(VueModalBackdrop),
        ...mapObject(this.$modal.pool, (modal, name) =>
          h(VueModalContent, { key: name, props: modal.props }, modal.children),
        ),
      ],
    )
  },
})
</script>
