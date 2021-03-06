import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home/index.vue')
const Profile = () => import('@/views/Profile/index.vue')
const Discovery = () => import('@/views/Discovery/index.vue')

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
    path: '/discovery',
    name: 'Discovery',
    component: Discovery,
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
