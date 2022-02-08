<template>
  <div class="flex justify-between align-baseline" data-cy="modal-login">
    <h1 class="text-3xl text-center font-black text-brand-navyblue">
      Entre na sua conta
    </h1>

    <button
      class="text-4xl text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300"
      @click="close"
      data-cy="close-modal-login"
    >
      &times;
    </button>
  </div>

  <div class="mt-10">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-brand-navyblue">E-mail</span>
        <input
          v-model.trim="state.email.value"
          ref="firstInput"
          type="email"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          placeholder="email@email.com"
          data-cy="login-email-input"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="email-error"
          >{{ state.email.errorMessage }}</span
        >
      </label>
      <label class="block mt-4">
        <span class="text-lg font-medium text-brand-navyblue">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          placeholder="*******"
          data-cy="login-password-input"
        />
        <span
          v-if="!!state.password.errorMessage"
          v-html="state.password.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="password-error"
        ></span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        class="mt-10 text-2xl text-white rounded-full bg-brand-navyblue hover:bg-mediumslateblue-500 custom-btn"
        :class="{ 'opacity-50': state.isLoading }"
        data-cy="submit-login"
      >
        <icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
          size="32"
        />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>
<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useField } from 'vee-validate'
import useModal from '@/hooks/useModal'
import Icon from '@/components/Icon'
import { emailValidFormat, passwordValidFormat } from '@/utils/validators'
import services from '@/services'
import { setCurrentUser } from '@/store/user'

export default {
  components: { Icon },
  setup() {
    // Hooks
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      emailValidFormat
    )

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', passwordValidFormat)

    const firstInput = ref(null)

    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    onMounted(() => {
      firstInput.value.focus()
    })

    async function handleSubmit() {
      toast.clear()
      if (!state.email.value || !state.password.value) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }

      if (!!state.email.errorMessage || !!state.password.errorMessage) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }

      try {
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })
        const { data: userData } = await services.user.getMe()

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          setCurrentUser(userData.data)
          /* Using localStorage for further updates because
          Reqres API don't really update the user data */
          const currentUser = JSON.stringify(userData.data)
          window.localStorage.setItem('currentUser', currentUser)
          router.push({ name: 'Discovery' })
          state.isLoading = false
          modal.close()
          return
        }
        if (errors.status === 404) {
          toast.error('Cadastro não encontrado')
        }
        if (errors.status === 401) {
          toast.error('Cadastro inválido')
        }
        if (errors.status === 400) {
          toast.error('Cadastro não encontrado')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasError = !!error
        toast.error('Ocorreu um erro ao fazer login')
      }
    }

    return { state, close: modal.close, handleSubmit, firstInput }
  }
}
</script>
<style lang="postcss" scoped>
.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}

.custom-input {
  @apply outline-none block w-full px-4 py-3 mt-1 text-lg bg-gray-100 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}
</style>
