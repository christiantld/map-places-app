<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Logo from './Logo.vue'
import Loading from './Loading.vue'
export default {
  components: { Logo, Loading },
  props: {
    name: { type: String, required: true }
  }
}
</script>
