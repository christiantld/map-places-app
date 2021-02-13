
<template>
  <modal-factory />
  <router-view />
</template>
<script>
/* eslint-disable space-before-function-paren */
import { watch } from 'vue'
import ModalFactory from '@/components/ModalFactory'
import { useRouter, useRoute } from 'vue-router'
import services from './services'
import { setCurrentUser } from '@/store/user'
// import useStore from '@/hooks/useStore'
export default {
  components: { ModalFactory },
  setup() {
    const router = useRouter()
    const route = useRoute()
    // const store = useStore('User')

    watch(
      () => route.path,
      async () => {
        if (route.meta.hasAuth) {
          const token = window.localStorage.getItem('token')
          const currentUser = window.localStorage.getItem('currentUser')
          if (!token) {
            router.push({ name: 'Home' })
            return
          }

          if (!currentUser) {
            const { data: userData } = await services.user.getMe()
            setCurrentUser(userData.data)
          }
          setCurrentUser(JSON.parse(currentUser))
        }
      }
    )
  }
}
</script>
