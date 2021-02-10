<template>
  <div class="flex justify-between">
    <h1 class="text-3xl font-black text-brand-darkinfo">Crie uma conta</h1>

    <button
      class="text-4xl text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300"
      @click="close"
    >
      &times;
    </button>
  </div>

  <div class="mt-10">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-brand-darkinfo">Nome</span>
        <input
          v-model.trim="state.name.value"
          ref="firstInput"
          type="text"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          placeholder="Seu nome completo"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.name.errorMessage }}</span
        >
      </label>
      <label class="block mt-4">
        <span class="text-lg font-medium text-brand-darkinfo">E-mail</span>
        <input
          v-model.trim="state.email.value"
          type="email"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          placeholder="email@email.com"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        >
      </label>
      <label class="block mt-4">
        <span class="text-lg font-medium text-brand-darkinfo">Senha</span>
        <input
          v-model="state.password.value"
          type="password"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          placeholder="*******"
        />
        <span
          v-if="!!state.password.errorMessage"
          v-html="state.password.errorMessage"
          class="block font-medium text-brand-danger"
        ></span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        class="mt-10 text-2xl font-bold text-white rounded-full bg-brand-navyblue hover:bg-brand-success custom-btn"
        :class="{ 'opacity-50': state.isLoading }"
      >
        <icon
          v-if="state.isLoading"
          name="loading"
          class="animate-spin"
          size="32"
        />
        <span v-else>Criar</span>
      </button>
    </form>
  </div>
</template>
<script>
import { reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useField } from 'vee-validate'
import useModal from '@/hooks/useModal'
import Icon from '@/components/Icon'
import {
  nameValidFormat,
  emailValidFormat,
  passwordValidFormat
} from '@/utils/validators'
import services from '@/services'

export default {
  components: { Icon },
  setup() {
    // Hooks
    const modal = useModal()
    const router = useRouter()
    const toast = useToast()

    const { value: nameValue, errorMessage: nameErrorMessage } = useField(
      'name',
      nameValidFormat
    )

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
      },
      name: {
        value: nameValue,
        errorMessage: nameErrorMessage
      }
    })

    onMounted(() => {
      firstInput.value.focus()
    })

    async function handleSubmit() {
      if (!state.email.value || !state.password.value || !state.name.value) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }
      try {
        toast.clear()
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value
        })
        if (!errors) {
          toast.success(
            'Cadastro realizado com sucesso! Agora acesse a plataforma'
          )
          modal.close()
          return
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao fazer o cadastro')
        }
        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasError = !!error
        toast.error('Ocorreu um erro ao fazer o cadastro')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
      toast,
      router,
      firstInput
    }
  }
}
</script>
<style lang="postcss">
.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}

.custom-input {
  @apply outline-none block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded focus:ring-0 focus:border-brand-success;
}
</style>