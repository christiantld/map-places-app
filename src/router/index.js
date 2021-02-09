import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const Home = defineAsyncComponent(() => import('@/views/Home/index.vue'))
const Profile = defineAsyncComponent(() => import('@/views/Profile/index.vue'))

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      hasAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
