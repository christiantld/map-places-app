<template>
  <div class="flex flex-col bg-mediumslateblue-50 rounded p-5">
    <h1 class="text-xl mb-2 font-regular text-brand-darkgray">
      Descobrir lugares
    </h1>
    <form @submit.prevent>
      <div class="flex items-center">
        <input
          type="text"
          class="focus:outline-none custom-input w-full"
          disabled
          placeholder="Latitude, Longitude"
          v-model="geolocation"
        />
        <button
          @click="getUserGeolocation"
          class="bg-brand-navyblue rounded-full text-brand-gray hover:bg-mediumslateblue-500 p-2 ml-2 transition duration-300 focus:outline-none"
        >
          <Icon name="place" :color="brandColors.gray" />
        </button>
      </div>
      <div class="flex justify-between mt-2">
        <select class="custom-input w-1/3 mr-14" v-model="state.radius">
          <option value="1">1 Km</option>
          <option value="5">5 Km</option>
          <option value="10">10 Km</option>
          <option value="15">15 Km</option>
          <option value="20">20Km</option>
        </select>

        <button
          :disabled="!state.latitude"
          @click="findNearbyPlaces"
          :class="{
            'custom-btn--disabled': !state.latitude
          }"
          class="custom-btn bg-mediumslateblue-900 rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn"
        >
          Buscar
        </button>
      </div>
    </form>
    <div v-if="state.isLoading">
      <place-loading />
      <place-loading />
      <place-loading />
    </div>

    <div
      v-if="state.places"
      class="flex flex-col bg-white mt-6 overflow-y-auto custom-list"
    >
      <div
        v-for="place in parsedPlaces"
        :key="place.id"
        class="border-b-2 py-3 px-4"
      >
        <div class="flex justify-end">
          <icon
            name="star-stroke"
            :color="brandColors.graydark"
            class="cursor-pointer"
          />
        </div>
        <p class="text-lg font-bold text-brand-navyblue">{{ place.name }}</p>
        <span>{{ place.vicinity }}</span>
      </div>
    </div>

    <div
      v-if="state.hasError && !state.places"
      class="flex flex-col bg-white mt-6 overflow-y-auto custom-list"
    >
      <div class="border-b-2 py-3 px-4">
        <p class="text-lg font-bold text-brand-navyblue">
          Ops! Erro ao buscar locais próximos a você. 😥
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'
import Icon from '@/components/Icon'
import { setPlaces } from '@/store/places'
import PlaceLoading from './PlaceLoading.vue'
import palette from '../../../palette'

import axios from 'axios'
export default {
  components: { Icon, PlaceLoading },
  setup(_, { emit }) {
    const toast = useToast()

    const state = reactive({
      latitude: '',
      longitude: '',
      radius: '1',
      places: false,
      isLoading: false,
      hasError: false
    })

    const geolocation = computed(() => {
      if (state.latitude && state.longitude) {
        return ` ${state.latitude.toFixed(4)}, ${state.longitude.toFixed(4)}`
      }

      return 'Latitude, Longitude'
    })

    const parsedPlaces = computed(() => {
      const places = state.places

      return places.filter((place) => {
        return place.name !== place.vicinity
      })
    })

    async function getUserGeolocation() {
      toast.clear()
      if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((position) => {
          state.latitude = position.coords.latitude
          state.longitude = position.coords.longitude
        })

        return true
      }
      return false
    }

    async function findNearbyPlaces() {
      state.places = false
      const CORS = 'https://cors-anywhere.herokuapp.com/'
      const API_KEY = process.env.VUE_APP_PLACES_API_KEY
      const URL = `${CORS}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
        state.latitude
      },${state.longitude}&radius=${state.radius * 1000}&key=${API_KEY}`
      state.isLoading = true
      await axios
        .get(URL)
        .then((res) => {
          state.places = res.data.results
          // clearPlaces()
          setPlaces(state.places)
          state.isLoading = false
          const data = {
            latitude: state.latitude,
            longitude: state.longitude
          }

          emit('coordinates', data)
        })
        .catch((err) => {
          toast.error('Erro ao buscar locais. Tente novamente')
          state.isLoading = false
          state.hasError = true
          console.log(err)
        })
    }

    return {
      state,
      brandColors: palette.brand,
      geolocation,
      getUserGeolocation,
      findNearbyPlaces,
      parsedPlaces
    }
  }
}
</script>

<style lang="postcss" scoped>
.custom-input {
  @apply outline-none  px-2 py-1 mt-1 text-lg bg-gray-100 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}
.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}
.custom-btn--disabled {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300  bg-gray-400 hover:bg-gray-400 cursor-default;
}
.custom-list {
  max-height: 65.5vh;
}
</style>
