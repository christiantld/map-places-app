<template>
  <div class="map flex justify-center items-center z-1">
    <img src="../../assets/icons/map.svg" class="w-64" alt="" />
  </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
  component: { Icon },
  name: 'MapLoader'
}
</script>

<style lang="css" scoped>
.map {
  width: 100%;
  height: 87vh;
}
</style>
