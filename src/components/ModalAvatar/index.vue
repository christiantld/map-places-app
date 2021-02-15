<template>
  <div class="flex justify-between align-baseline">
    <h1 class="text-3xl text-center font-black text-brand-navyblue">
      Selecione seu avatar
    </h1>

    <button
      class="text-4xl text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300"
      @click="close"
    >
      &times;
    </button>
  </div>

  <div class="mt-6 flex flex-col justify-center items-center">
    <form @submit.prevent>
      <div class="flex items-baseline">
        <label class="flex items-baseline">
          <span class="text-lg font-medium text-brand-navyblue">Url:</span>
          <input
            ref="firstInput"
            type="url"
            class="custom-input ml-4"
            v-model="state.avatar"
          />
        </label>
      </div>
      <div class="flex justify-center">
        <button
          @click="handleSubmit"
          type="submit"
          class="text-lg bg-mediumslateblue-900 rounded-full mt-6 text-brand-gray hover:bg-mediumslateblue-500 custom-btn mr-4"
          :class="{ 'opacity-50': state.isLoading }"
        >
          <icon
            v-if="state.isLoading"
            name="loading"
            class="animate-spin"
            size="32"
          />
          <span v-else>Salvar</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useToast } from 'vue-toastification'
import Icon from '@/components/Icon'
import { setCurrentUser } from '@/store/user'
import useStore from '@/hooks/useStore'
import useModal from '@/hooks/useModal'
// import services from '@/services'
export default {
  components: { Icon },
  setup() {
    // Hooks
    const modal = useModal()
    const toast = useToast()
    const store = useStore()

    const userStore = store.User.currentUser
    const state = reactive({
      isLoading: false,
      avatar: ''
    })

    async function handleSubmit() {
      toast.clear()
      if (!state.avatar) {
        toast.warning('Avatar em branco')
        return
      }

      const data = {
        newAvatar: state.avatar
      }

      setCurrentUser({ ...userStore, ...data })

      state.isActive = false
      state.isLoading = false
      modal.close()
    }

    return { state, close: modal.close, handleSubmit }
  }
}
</script>

<style lang="postcss" scoped>
.custom-input {
  @apply outline-none block w-full px-2 py-1 mt-1 text-lg bg-gray-100 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}
</style>
