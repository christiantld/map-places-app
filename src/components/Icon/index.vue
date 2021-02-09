<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Logo from './Logo.vue'
export default {
  components: { Logo },
  props: {
    name: { type: String, required: true }
  }
}
</script>
