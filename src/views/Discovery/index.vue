<template>
  <div class="flex justify-center w-full h-28 bg-brand-navyblue">
    <header-logged />
  </div>
  <div class="flex justify-start w-full flex-col md:flex-row">
    <div class="md:w-3/5 lg:w-2/5 min-w-2/5">
      <div>
        <form-place-search @coordinates="setCoordinates" />
      </div>
    </div>
    <g-map
      v-if="state.showMap"
      :disableUI="false"
      mapType="roadmap"
      :zoom="state.zoom"
      :center="{ lat: state.geo.lat, lng: state.geo.lng }"
    >
    </g-map>
    <map-loader v-else />
  </div>
</template>
<script>
import { reactive } from 'vue'
import HeaderLogged from '@/components/HeaderLogged'
import GMap from './Map.vue'
import MapLoader from './MapLoader'
import FormPlaceSearch from './FormPlaceSearch.vue'
export default {
  components: { HeaderLogged, FormPlaceSearch, GMap, MapLoader },
  setup() {
    const state = reactive({
      geo: {
        lat: -8.09574,
        lng: -43.6864998
      },
      zoom: 3,
      showMap: false
    })

    function setCoordinates({ latitude, longitude }) {
      state.geo = {
        lat: latitude,
        lng: longitude
      }
      state.zoom = 15
      state.showMap = true
    }
    return { setCoordinates, state }
  }
}
</script>
<style lang="postcss">
</style>
