<template>
  <div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
    <div class="w-28 lg:w-36">
      <icon name="logo" size="42" color="#fff" alt="logo" class="w-full" />
    </div>

    <div class="flex">
      <ul class="flex list-none">
        <li
          @click="() => router.push({ name: 'Discovery' })"
          class="mr-2 text-white hover:text-gray-400 rounded-full cursor-pointer custom-btn"
        >
          Descobrir locais
        </li>
        <li
          @click="() => router.push({ name: 'Profile' })"
          class="mr-2 text-white hover:text-gray-400 rounded-full cursor-pointer custom-btn"
        >
          Meu perfil
        </li>
        <li
          @click="handleLogout"
          class="bg-white rounded-full cursor-pointer text-brand-navyblue hover:bg-gray-400 custom-btn"
        >
          {{ logoutLabel }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import useStore from '../../hooks/useStore'
import { cleanCurrentUser } from '../../store/user'
import Icon from '@/components/Icon'

export default {
  components: { Icon },
  setup() {
    const router = useRouter()
    const store = useStore('User')

    const logoutLabel = computed(() => {
      if (!store.currentUser.first_name) {
        return 'Sair'
      }
      return `${store.currentUser.first_name} (sair)`
    })

    function handleLogout() {
      window.localStorage.removeItem('token')
      cleanCurrentUser()
      router.push({ name: 'Home' })
    }

    // onMounted(() => {
    //   console.log(store.currentUser)
    // })

    return {
      router,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
<style lang="postcss">
.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}
</style>
