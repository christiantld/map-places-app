<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Logo from './Logo.vue'
import Loading from './Loading.vue'
import Photo from './Photo.vue'
export default {
  components: { Logo, Loading, Photo },
  props: {
    name: { type: String, required: true }
  }
}
</script>
