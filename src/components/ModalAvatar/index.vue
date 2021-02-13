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

  <div class="mt-6">
    <form @submit.prevent>
      <label class="flex justify-center items-baseline">
        <span class="text-lg font-medium text-brand-navyblue">Url:</span>
        <input
          ref="firstInput"
          type="url"
          class="custom-input mx-4"
          placeholder="email@email.com"
        />
        <button
          :disabled="state.isLoading"
          type="submit"
          class="text-lg bg-mediumslateblue-900 rounded-full mt-2 text-brand-gray hover:bg-mediumslateblue-500 custom-btn mr-4"
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
      </label>
    </form>
    <!--
        <span
          v-if="!!state.email.errorMessage"
          class="block font-medium text-brand-danger"
          >{{ state.email.errorMessage }}</span
        >
    </form> -->
  </div>
</template>

<script>
import { reactive } from 'vue'
import useModal from '@/hooks/useModal'
export default {
  setup() {
    const modal = useModal()

    const state = reactive({
      isLoading: false
    })

    return { state, close: modal.close }
  }
}
</script>

<style lang="postcss" scoped>
.custom-input {
  @apply outline-none block w-full px-2 py-1 mt-1 text-lg bg-gray-100 focus:bg-white border-2 border-transparent rounded focus:ring-0 focus:border-mediumslateblue-600 ring-2 ring-mediumslateblue-100;
}
</style>
