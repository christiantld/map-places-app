<template>
  <component :is="name" v-bind="$props" />
</template>

<script>
import Logo from './Logo.vue'
import Loading from './Loading.vue'
import Photo from './Photo.vue'
import Place from './Place.vue'
import Star from './Star'
import StarStroke from './StarStroke'
export default {
  components: { Logo, Loading, Photo, Place, Star, StarStroke },
  props: {
    name: { type: String, required: true }
  }
}
</script>
