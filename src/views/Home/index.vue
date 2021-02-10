<template>
  <div>
    <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
    <div
      class="flex justify-center py-10 bg-brand-navyblue sm:absolute bottom-0 w-full"
    >
      <p class="font-medium text-center text-brand-gray">
        Christian Toledo 2021 - Made with 💙 and ☕
      </p>
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import useModal from '@/hooks/useModal'

export default {
  components: { CustomHeader },
  setup() {
    const router = useRouter()
    const modal = useModal()
    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        router.push({ name: 'Discovery' })
      }
    })

    function handleLogin() {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleAccountCreate() {
      modal.open({
        component: 'ModalAccountCreate'
      })
    }

    return { handleLogin, handleAccountCreate }
  }
}
</script>
