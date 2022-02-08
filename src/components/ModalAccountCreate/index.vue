<template>
  <div class="flex justify-between" data-cy="modal-signin">
    <h1 class="text-3xl font-black text-brand-navyblue">Crie uma conta</h1>

    <button
      class="text-4xl text-gray-400 hover:text-gray-600 focus:outline-none transition duration-300"
      @click="close"
      data-cy="modal-signin-close"
    >
      &times;
    </button>
  </div>

  <div class="mt-10">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-brand-navyblue">Nome</span>
        <input
          v-model.trim="state.name.value"
          ref="firstInput"
          type="text"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.name.errorMessage
          }"
          placeholder="Seu primeiro nome"
          data-cy="modal-signin-name"
        />
        <span
          v-if="!!state.name.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="modal-signin-name-error"
          >{{ state.name.errorMessage }}</span
        >
      </label>
      <label class="block mt-4">
        <span class="text-lg font-medium text-brand-navyblue">Sobrenome</span>
        <input
          v-model.trim="state.surname.value"
          type="text"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.surname.errorMessage
          }"
          placeholder="Seu sobrenome"
          data-cy="modal-signin-surname"
        />
        <span
          v-if="!!state.surname.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="modal-signin-surname-error"
          >{{ state.surname.errorMessage }}</span
        >
      </label>
      <label class="block mt-4">
        <span class="text-lg font-medium text-brand-navyblue">E-mail</span>
        <input
          v-model.trim="state.email.value"
          type="email"
          class="custom-input"
          :class="{
            'border-brand-danger': !!state.email.errorMessage
          }"
          placeholder="email@email.com"
          data-cy="modal-signin-email"
        />
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="modal-signin-email-error"
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
          data-cy="modal-signin-password"
        />
        <span
          v-if="!!state.password.errorMessage"
          v-html="state.password.errorMessage"
          class="block font-medium text-brand-danger"
          data-cy="modal-signin-password-error"
        ></span>
      </label>
      <button
        :disabled="state.isLoading"
        type="submit"
        class="mt-10 text-2xl font-bold text-white rounded-full bg-brand-navyblue hover:bg-mediumslateblue-500 custom-btn"
        :class="{ 'opacity-50': state.isLoading }"
        data-cy="modal-signin-submit"
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
  emptyOrLength3,
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
      emptyOrLength3
    )

    const { value: surnameValue, errorMessage: surnameErrorMessage } = useField(
      'surname',
      emptyOrLength3
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
      },
      surname: {
        value: surnameValue,
        errorMessage: surnameErrorMessage
      }
    })

    onMounted(() => {
      firstInput.value.focus()
    })

    async function handleSubmit() {
      toast.clear()
      if (
        !state.email.value ||
        !state.password.value ||
        !state.name.value ||
        !state.surname.value
      ) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }
      if (
        !!state.email.errorMessage ||
        !!state.password.errorMessage ||
        !!state.name.errorMessage ||
        !!state.surname.errorMessage
      ) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }
      try {
        state.isLoading = true
        const { errors } = await services.auth.register({
          name: state.name.value,
          surname: state.surname.value,
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
<style lang="postcss" scoped>
.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}

.custom-input {
  @apply outline-none block w-full px-4 py-3 mt-1 text-lg bg-gray-100 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}
</style>
