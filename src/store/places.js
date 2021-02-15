import { reactive } from 'vue'

const state = reactive({
  places: {}
})

export default state

export function cleanPlaces() {
  state.places = {}
}

export function setPlaces(place) {
  state.places = place
}

export function getPlaces() {
  return state.places
}
