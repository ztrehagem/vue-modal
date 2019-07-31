<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  created() {
    this.$set(this.$modal.pool, this.name, {
      children: this.$slots.default,
    })
  },
  destroyed() {
    this.$delete(this.$modal.pool, this.name)
  },
  render(h) {
    return h()
  },
})
</script>
