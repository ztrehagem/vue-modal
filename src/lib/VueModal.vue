<script lang="ts">
import Vue from 'vue'
import { ModalMetadata } from './mediator'

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  created() {
    this.$modal.register(this.name, {
      children: this.$slots.default || [],
      disableBackdrop: this.disableBackdrop,
    })
  },
  destroyed() {
    this.$modal.unregister(this.name)
  },
  render(h) {
    return h()
  },
})
</script>
