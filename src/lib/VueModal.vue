<script lang="ts">
import Vue from 'vue'
import { ModalMetadata } from './mediator'

interface Data {
  metadata: ModalMetadata
}

export default Vue.extend({
  props: {
    name: { type: String, required: true },
    disableBackdrop: { type: Boolean, default: false },
  },
  data(): Data {
    return {
      metadata: {
        disableBackdrop: this.disableBackdrop,
      },
    }
  },
  computed: {
    // metadata(): ModalMetadata {
    //   return {
    //     children: this.$slots.default || [],
    //     disableBackdrop: this.disableBackdrop,
    //   }
    // },
  },
  created() {
    // this.metadata = this.createMetadata()
    this.$set(this.metadata, 'children', this.$slots.default)
    this.$modal.register(this.name, this.metadata)
    debugger
  },
  beforeMount() {
    debugger
  },
  updated() {
    console.log('updated', this.name)
    this.$set(this.metadata, 'children', this.$slots.default)
    this.$modal.update(this.name, this.metadata)
  },
  beforeDestroy() {
    console.log('unregister!', this.name)
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
    console.log('render', this.name)
    // this.metadata = this.createMetadata()
    // this.$set(this.metadata, 'children', this.$slots.default)
    return h()
  },
})
</script>
