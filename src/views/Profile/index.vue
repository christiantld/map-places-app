<template>
  <div class="flex justify-center w-full h-28 bg-brand-navyblue">
    <header-logged />
  </div>

  <div class="flex flex-col items-center justify-center h-44 bg-white">
    <h1 class="text-4xl font-black text-center text-brand-navyblue">
      Meu perfil
    </h1>
    <p class="text-lg text-center text-brand-darkinfo font-regular mt-2">
      Visualize e edite suas informações.
    </p>
    <button
      @click="toggleEditUser"
      :class="{ 'custom-btn--disabled': state.isActive }"
      :disabled="state.isActive"
      class="bg-brand-navyblue rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn"
    >
      Editar
    </button>
  </div>

  <div class="flex justify-center">
    <profile-loading v-if="state.isLoading" />
    <div
      v-else
      class="flex py-3 pl-5 mt-2 rounded relative justify-center align-center content-center flex-col bg-mediumslateblue-50 items-center w-4/5 lg:w-3/5"
    >
      <img
        :src="state.avatar"
        alt=""
        class="rounded-full ring-4 ring-mediumslateblue-400 my-4 h-36 w-36 z-1"
        :class="{ 'img--disabled': !state.isActive }"
      />
      <div
        @click="handleAvatarUpdate"
        class="rounded-full absolute bg-gray-600 opacity-0 hover:opacity-40 transition duration-300 my-4 h-36 w-36 z-2 flex justify-center align-center cursor-pointer"
        style="top: 12px"
        :class="{ 'custom-overlap--disabled': !state.isActive }"
      >
        <icon name="photo" class="m-6" size="100" />
      </div>
      <form @submit.prevent>
        <label class="flex flex-col md:flex-row">
          <div class="flex flex-col w-64">
            <span class="text-lg font-medium text-brand-navyblue">Nome</span>
            <input
              ref="firstInput"
              type="text"
              class="custom-input"
              :class="{ 'custom-input--disabled': !state.isActive }"
              :disabled="!state.isActive"
              v-model="state.first_name.value"
              :placeholder="store.User.currentUser.first_name"
            />
            <span
              v-if="!!state.first_name.errorMessage"
              class="block font-medium text-brand-danger"
              >{{ state.first_name.errorMessage }}</span
            >
          </div>
          <div class="flex flex-col mt-4 md:ml-6 md:mt-0 w-64">
            <span class="text-lg font-medium text-brand-navyblue"
              >Sobrenome</span
            >
            <input
              type="text"
              class="custom-input"
              :class="{ 'custom-input--disabled': !state.isActive }"
              :disabled="!state.isActive"
              v-model="state.last_name.value"
              :placeholder="store.User.currentUser.last_name"
            />
            <span
              v-if="!!state.last_name.errorMessage"
              class="block font-medium text-brand-danger"
              >{{ state.last_name.errorMessage }}</span
            >
          </div>
        </label>
        <label class="flex flex-col mt-4">
          <span class="text-lg font-medium text-brand-navyblue">E-mail</span>
          <input
            type="email"
            class="custom-input"
            :disabled="!state.isActive"
            :class="{ 'custom-input--disabled': !state.isActive }"
            v-model="state.email.value"
            :placeholder="store.User.currentUser.email"
          />
          <span
            v-if="!!state.email.errorMessage"
            v-html="state.email.errorMessage"
            class="block font-medium text-brand-danger"
          ></span>
        </label>
        <div class="my-4 flex justify-center">
          <button
            @click="handleSubmit"
            class="bg-mediumslateblue-900 rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn mr-4"
            :class="{
              'custom-btn--disabled': !state.isActive,
              'opacity-50': state.isLoadingButton
            }"
            :disabled="!state.isActive"
          >
            <icon
              v-if="state.isLoadingButton"
              name="loading"
              class="animate-spin mx-3"
              size="22"
            />
            <span v-else>Salvar</span>
          </button>
          <button
            @click="toggleEditUser"
            class="bg-brand-navyblue rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn"
            :class="{
              'custom-btn--disabled': !state.isActive
            }"
            :disabled="!state.isActive"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { reactive, watch, ref } from 'vue'
import HeaderLogged from '@/components/HeaderLogged'
import useStore from '@/hooks/useStore'
import useModal from '@/hooks/useModal'
import ProfileLoading from './ProfileLoading.vue'
import services from '@/services'
import Icon from '@/components/Icon'
import { setCurrentUser } from '@/store/user'
import { emailValidFormat, emptyOrLength3 } from '@/utils/validators'
import { useToast } from 'vue-toastification'
import { useField } from 'vee-validate'
export default {
  components: { HeaderLogged, ProfileLoading, Icon },
  setup() {
    // Hooks
    const store = useStore()
    const toast = useToast()
    const modal = useModal()

    const firstInput = ref(null)
    const userStore = store.User.currentUser

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      'email',
      emailValidFormat
    )

    const {
      value: firstNameValue,
      errorMessage: firstNameErrorMessage
    } = useField('first_name', emptyOrLength3)

    const {
      value: lastNameValue,
      errorMessage: lastNameErrorMessage
    } = useField('last_name', emptyOrLength3)

    const state = reactive({
      isActive: false,
      isLoading: false,
      isLoadingButton: false,
      first_name: {
        value: firstNameValue,
        errorMessage: firstNameErrorMessage
      },
      last_name: {
        value: lastNameValue,
        errorMessage: lastNameErrorMessage
      },
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      avatar: userStore.avatar
    })

    watch(
      () => userStore,
      () => {
        if (!userStore) {
          handleError(true)
        }
      }
    )

    function handleError(error) {
      state.isLoading = false
      state.hasError = !!error
    }

    function toggleEditUser() {
      state.isActive = !state.isActive
      resetUserData()
      if (state.isActive) {
        firstInput.value.focus()
      }
    }

    function resetUserData() {
      firstNameValue.value = userStore.first_name
      lastNameValue.value = userStore.last_name
      emailValue.value = userStore.email
      state.avatar = userStore.avatar
    }

    function handleAvatarUpdate() {
      modal.open({
        component: 'ModalAvatar'
      })
    }

    async function handleSubmit() {
      toast.clear()
      if (
        !state.email.value ||
        !state.first_name.value ||
        !state.last_name.value
      ) {
        toast.warning('Verifique seus dados, há campos em branco')
        return
      }
      if (
        !!state.email.errorMessage ||
        !!state.first_name.errorMessage ||
        !!state.last_name.errorMessage
      ) {
        toast.warning('Verifique seus dados e tente novamente')
        return
      }
      try {
        state.isLoadingButton = true
        const data = {
          first_name: state.first_name.value,
          last_name: state.last_name.value,
          email: state.email.value
        }
        const { data: userData, errors } = await services.user.updateUser({
          ...userStore,
          ...data
        })

        if (!errors) {
          // Using localStorage because Reqres API don't really update data
          const currentUser = JSON.stringify(userData)
          window.localStorage.setItem('currentUser', currentUser)
          /* By this way data is still available
          even when route updates
          */
          setCurrentUser({ ...userStore, ...data })
          state.isActive = false
          state.isLoadingButton = false
          toast.success('Dados alterados com sucesso')
          return
        }
        if (errors.status === 404) {
          toast.error('Cadastro não encontrado')
        }
        if (errors.status === 401) {
          toast.error('Cadastro inválido')
        }
        if (errors.status === 400) {
          toast.error('Ocorreu um erro ao atualizar dados')
        }
        state.isLoadingButton = false
      } catch (error) {
        state.isLoadingButton = false
        state.hasError = !!error
        toast.error('Ocorreu um erro ao atualizar dados')
      }
    }

    return {
      state,
      store,
      handleSubmit,
      toggleEditUser,
      firstInput,
      handleAvatarUpdate
    }
  }
}
</script>
<style lang="postcss" scoped>
.custom-input {
  @apply outline-none block w-full px-4 py-3 mt-1 text-lg bg-gray-50 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}

.custom-input--disabled {
  @apply text-gray-400 bg-gray-200 ring-0;
}

.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}

.custom-btn--disabled {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300  bg-gray-400 hover:bg-gray-400 cursor-default;
}

.img--disabled {
  filter: grayscale(1);
}

.custom-overlap--disabled {
  display: none;
}
</style>
