<template>
  <div class="map" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'GMap',
  props: {
    center: { lat: Number, lng: Number },
    zoom: Number,
    mapType: String,
    disableUI: Boolean
  },
  setup(props) {
    // the google map object
    const map = ref(null)

    // the map element in the templste
    const mapDivRef = ref(null)

    // load in the google script
    onMounted(() => {
      // key is is the .env file
      const key = process.env.VUE_APP_PLACES_API_KEY

      // create the script element to load
      const googleMapScript = document.createElement('SCRIPT')
      googleMapScript.setAttribute(
        'src',
        `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
      )
      googleMapScript.setAttribute('defer', '')
      googleMapScript.setAttribute('async', '')
      document.head.appendChild(googleMapScript)
    })

    /**
     * this function is called as soon as the map is initialized
     */
    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || 'hybrid',
        zoom: props.zoom || 3,
        disableDefaultUI: props.disableUI || false,
        center: props.center || { lat: -8.09574, lng: -43.6864998 },
        marker: { lat: -22.81292680000001, lng: -47.0302357 }
      })
    }

    return {
      mapDivRef
    }
  }
}
</script>

<style lang="css" scoped>
.map {
  width: 100%;
  height: 87vh;
  background-color: azure;
}
</style>
