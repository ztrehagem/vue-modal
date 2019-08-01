<script lang="ts">
import Vue from 'vue'
import { ModalMetadata } from './mediator'

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  data() {
    return {
      updatedFlag: false,
    }
  },
  created() {
    this.$modal.register(this.name, this.createMetadata())
  },
  updated() {
    if (this.updatedFlag) return
    this.updatedFlag = true
    this.$modal.update(this.name, this.createMetadata())
    this.$nextTick(() => (this.updatedFlag = false))
  },
  beforeDestroy() {
    this.$modal.unregister(this.name)
  },
  methods: {
    createMetadata() {
      return {
        children: this.$slots.default,
        disableBackdrop: this.disableBackdrop,
      }
    },
  },
  render(h) {
    return h()
  },
})
</script>
