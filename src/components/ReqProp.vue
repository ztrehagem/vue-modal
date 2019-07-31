<template lang="pug">
.req-prop req-prop {{prop}}
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    prop: { type: String, required: true },
  },
})
</script>
