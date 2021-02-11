<template>
  <content-loader
    class="flex flex-col items-center rounded mt-2"
    width="60%"
    height="470px"
    animation-duration="3s"
  >
    <content-loader class="my-5 rounded-full" width="9rem" height="9rem" />
    <content-loader
      class="mt-4 rounded"
      width="90%"
      height="75px"
      animation-duration="2s"
    />

    <content-loader
      class="mt-4 rounded"
      width="90%"
      height="75px"
      animation-duration="2.2s"
    />

    <content-loader
      class="my-4 rounded"
      width="90%"
      height="75px"
      animation-duration="2.4s"
    />
  </content-loader>
</template>

<script>
import ContentLoader from '@/components/ContentLoader'

export default {
  components: { ContentLoader }
}
</script>
