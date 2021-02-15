<template>
  <content-loader
    class="flex flex-col items-center rounded mt-2"
    width="100%"
    height="6rem"
    animation-duration="3s"
  >
    <content-loader class="rounded mt-2" width="90%" height="2rem" />
    <content-loader
      class="rounded mt-2"
      width="90%"
      height="2rem"
      animation-duration="2.2s"
    />
  </content-loader>
</template>

<script>
import ContentLoader from '@/components/ContentLoader'

export default {
  components: { ContentLoader }
}
</script>
