import { reactive } from 'vue'

const state = reactive({
  currentUser: {},
  favoritePlaces: []
})

export default state

export function cleanCurrentUser() {
  state.currentUser = {}
}

export function setCurrentUser(user) {
  state.currentUser = user
}

export function getCurrentUser() {
  return state.currentUser
}

export function cleanFavoritePlaces() {
  state.favoritePlaces = {}
}

export function setFavoritePlaces(user) {
  state.favoritePlaces = user
}

export function getFavoritePlaces() {
  return state.favoritePlaces
}
