<template>
  <div>
    <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
    <div
      class="flex justify-center py-10 bg-brand-navyblue absolute bottom-0 w-full"
    >
      <p class="font-medium text-center text-brand-gray">
        Christian Toledo 2021 - Made with 💙 and ☕
      </p>
    </div>
  </div>
</template>
<script>
import CustomHeader from './CustomHeader.vue'
import useModal from '@/hooks/useModal'

export default {
  components: { CustomHeader },
  setup() {
    const modal = useModal()
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
