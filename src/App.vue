<template>
  <div id="app">
    <div v-if="isLoading">Carregando...</div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'App',
  computed: {
    ...mapState(["isLoading"]),
    theme() {
      return this.$store.state.theme;
    }
  },
  mounted() {
    document.documentElement.classList.add(this.theme); // apply the theme when the app is loaded
    this.$store.commit('SET_LOADING_STATE', false);
  },
  created() {
    window.addEventListener('resize', this.updateViewportType);
    this.updateViewportType();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateViewportType);
  },
  methods: {
    updateViewportType() {
      const width = window.innerWidth;
      this.$store.commit('SET_IS_MOBILE', width <= 768);
      this.$store.commit('SET_IS_TABLET', width > 768 && width <= 1024);
    },
  }

};

</script>

<style>
/* Estilos para o App.vue */
@import url('https://fonts.googleapis.com/css2?family=Francois+One:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,900;1,100;1,200;1,300;1,600;1,900&family=KoHo:wght@0,100;0,200;&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Ysabeau+Office:ital,wght@0,1;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,1;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&family=Amatic+SC:wght@400;700&family=Unna&family=DM+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,600;0,700;0,900;1,100;1,200;1,300;1,600;1,900&family=Oswald:wght@200;300;400;500;600;700&family=DM+Sans:opsz,wght@9..40,100;9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Poiret+One&family=Kaushan+Script&family=The+Nautigal:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');


h1 {
  font-family: Playfair, sans-serif;
  font-weight: 700;
  font-size: 2em;
  color: black;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}

h2 {
  font-family: Playfair, sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: black;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}


* {
  font-family: Playfair, sans-serif;
  user-zoom: fixed;
}

p {
  margin-top: 0.2em;
  font-size: 1em;
  line-height: 1.2em;
  color: #888;
}

.default-separator {
    border-color: var(--gray-80);
    border-width: 0 0 1px;
    margin: 2em 2em;
    border-style: solid;
    width: 80%;
}

body {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  background-color: var(--app-bg-color);
}


/* Estilo para o fundo da barra de rolagem (track) */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background-color: var(--scroll-bgcolor);
  /* Cor de fundo #614dd5 para o track */
}

/* Estilo para a parte móvel da barra de rolagem (thumb) */
::-webkit-scrollbar-thumb {
  background-color: var(--cor-base);
  /* Cor de fundo cinza claro para o thumb */
  border-radius: 6px;
  /* Define a forma arredondada do thumb */
}
</style>
