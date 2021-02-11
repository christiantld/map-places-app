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
    <div
      class="flex py-3 pl-5 mt-2 rounded justify-center align-center content-center flex-col bg-mediumslateblue-50 items-center w-4/5 lg:w-3/5"
    >
      <img
        :src="store.User.currentUser.avatar"
        alt=""
        class="rounded-full ring-4 ring-mediumslateblue-400 my-4"
        :class="{ 'img--disabled': !state.isActive }"
      />
      <form @submit.prevent="handleSubmit">
        <label class="flex">
          <div class="flex flex-col">
            <span class="text-lg font-medium text-brand-navyblue">Nome</span>
            <input
              ref="firstInput"
              type="text"
              class="custom-input"
              :class="{ 'custom-input--disabled': !state.isActive }"
              :disabled="!state.isActive"
              v-model="store.User.currentUser.first_name"
            />
            <!-- <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        > -->
          </div>
          <div class="flex flex-col ml-6">
            <span class="text-lg font-medium text-brand-navyblue"
              >Sobrenome</span
            >
            <input
              type="text"
              class="custom-input"
              :class="{ 'custom-input--disabled': !state.isActive }"
              :disabled="!state.isActive"
              v-model="store.User.currentUser.last_name"
            />
            <!-- <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        > -->
          </div>
        </label>
        <label class="flex flex-col mt-4">
          <span class="text-lg font-medium text-brand-navyblue">E-mail</span>
          <input
            type="email"
            class="custom-input"
            :disabled="!state.isActive"
            :class="{ 'custom-input--disabled': !state.isActive }"
            v-model="store.User.currentUser.email"
          />
          <!-- <span
          v-if="!!state.password.errorMessage"
          v-html="state.password.errorMessage"
          class="block font-medium text-brand-danger"
        ></span> -->
        </label>
        <div class="my-4 flex justify-center">
          <button
            @click="() => {}"
            class="bg-brand-navyblue rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn mr-4"
            :class="{ 'custom-btn--disabled': !state.isActive }"
            :disabled="!state.isActive"
          >
            Salvar
          </button>
          <button
            @click="toggleEditUser"
            class="bg-mediumslateblue-900 rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn"
            :class="{ 'custom-btn--disabled': !state.isActive }"
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
export default {
  components: { HeaderLogged },
  setup() {
    const store = useStore()
    const firstInput = ref(null)
    const state = reactive({
      isActive: false
    })

    watch(
      () => store.User.currentUser,
      () => {
        if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
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
      if (state.isActive) {
        firstInput.value.focus()
      }
    }

    function handleSubmit() {}

    return { state, store, handleSubmit, toggleEditUser, firstInput }
  }
}
</script>
<style lang="postcss">
.custom-input {
  @apply outline-none block w-full px-4 py-3 mt-1 text-lg bg-gray-50 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600;
}

.custom-input--disabled {
  @apply text-gray-400 bg-gray-200;
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
</style>
