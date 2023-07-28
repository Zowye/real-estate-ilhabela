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
  },
  mounted() {
    this.$store.commit('SET_LOADING_STATE', false);
  },
}
</script>

<style>
/* Estilos para o App.vue */
@import url('https://fonts.googleapis.com/css2?family=Francois+One&family=KoHo:wght@200&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=KoHo:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Francois+One&family=KoHo:wght@200&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Francois+One&family=KoHo:wght@200&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Francois+One&family=KoHo:wght@200&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Ysabeau+Office:ital,wght@0,1;0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;0,1000;1,1;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900;1,1000&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Unna&display=swap');
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons+Outlined');

* {
  font-family: Playfair, sans-serif;
}

p {
  font-size: 1.2em;
  line-height: 1.3em;
  font-family: var(--font-text);
  color: var(--cor-text-base)
}

body {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}


  /* Estilo para o fundo da barra de rolagem (track) */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background-color: #e3e3e3; /* Cor de fundo #614dd5 para o track */
  }

  /* Estilo para a parte móvel da barra de rolagem (thumb) */
  ::-webkit-scrollbar-thumb {
    background-color: #614dd5; /* Cor de fundo cinza claro para o thumb */
    border-radius: 6px; /* Define a forma arredondada do thumb */
  }


</style>
