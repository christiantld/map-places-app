<template>
  <header class="header">
    <div class="header-group">
      <div
        class="flex items-center justify-between py-8 border-b-2 border-brand-navyblue w-full"
      >
        <div class="w-10">
          <icon
            name="logo"
            size="42"
            :color="brandColors.navyblue"
            alt="logo"
            class="w-full"
          />
        </div>
        <div class="flex">
          <button
            class="rounded-full text-brand-darkinfo hover:text-brand-success custom-btn"
            @click="() => emit('create-account')"
          >
            Crie uma conta
          </button>
          <button
            @click="() => emit('login')"
            class="bg-brand-navyblue rounded-full text-brand-gray hover:bg-brand-success custom-btn"
          >
            Entrar
          </button>
        </div>
      </div>

      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-brand-navyblue">
          Encontre locais<br />
          próximos a você.
          <br class="hidden lg:inline-block" />
        </h1>
        <p class="text-lg font-medium pt-5 text-brand-darkinfo">
          Explore,favorite, avalie e compartilhe
          <br />
          seus locais com outros usuários.
        </p>
        <div>
          <button
            @click="() => emit('create-account')"
            class="mt-10 bg-brand-navyblue rounded-full text-brand-gray hover:bg-brand-success custom-btn"
          >
            Crie sua conta agora
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import Icon from '@/components/Icon'
import palette from '../../../palette'

export default {
  components: { Icon },
  setup(_, { emit }) {
    return { emit, brandColors: palette.brand }
  }
}
</script>
<style lang="postcss" scoped>
.header {
  @apply bg-white w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

.custom-btn {
  @apply px-6 py-2 font-bold focus:outline-none transition duration-300;
}

@media (min-width: 1079px) {
  .header-group {
    background-image: url('../../assets/images/ocean.png');
    background-size: 628px;
    background-position: 100% 80%;
    background-repeat: no-repeat;
  }
}
@media (max-width: 1079px) {
  .header-group {
    background-image: url('../../assets/images/ocean.png');
    background-size: 500px;
    background-position: 100% 65%;
    background-repeat: no-repeat;
  }
}

@media (max-width: 930px) {
  .header-group {
    background-image: url('../../assets/images/ocean.png');
    background-size: 400px;
    background-position: 100% 50%;
    background-repeat: no-repeat;
  }
}

@media (max-width: 830px) {
  .header-group {
    background-image: none;
  }
}
</style>
