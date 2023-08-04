<template>
  <nav>
    <ul class="menu-list">
      <li>
        <button class="icon_menu_item" @click="toggleTheme">
          <svg class="moon_toggle" viewBox="0 0 512 512" data-fa-i2svg="">
            <path fill="#2c7be5"
              d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z">
            </path>
          </svg>
        </button>
        <!-- <span class="theme-label">{{ theme === 'day-theme' ? 'Switch to Dark Mode' : 'Switch to Light Mode' }}</span> -->

      </li>
      <li>
        <div id="fav_div_section" :v-click-outside="toggleFavoritesDropdown">
          <button class="icon_menu_item" :class="{ active: dropdownvisible }" @click="toggleFavoritesDropdown">
            <i class="fas fa-heart"></i>
            <div v-if="favorites.length > 0 && favorites.length < 10" class="number-of-favs">{{ favorites.length }}</div>
            <div v-if="favorites.length >= 10" class="number-of-favs">9+</div>

          </button>
          <div class="favorites-dropdown" v-show="dropdownvisible">
            <ul>
              <!-- Show the current favorite list -->
              <li v-if="favorites.length === 0" class="empty-fav">Vazio</li>
              <li v-else v-for="card_fav in favorites" :key="card_fav">
                <div class="left"><img :src="card_fav.card_images[0]"></div>
                <div class="right">
                  <div>{{ card_fav.street }}</div>
                  <div>{{ card_fav.neighborhood }}</div>
                  <div style="font-weight: 900;">R$ {{ card_fav.price }}</div>
                  <button class="close-button" @click.stop="removeFromFavorites(card_fav)">
                    <i class="fas fa-times"></i>
                  </button>
                </div>

              </li>
            </ul>
          </div>
        </div>
      </li>
      <!-- <li>
        <button class="menu-item" @click="toggleTheme">
          <span class="icon"><i :class="theme === 'day' ? 'fas fa-sun' : 'fas fa-moon'"></i></span>
          SWITCH TO {{ this.$store.state.theme }}
        </button>
      </li> -->
      <!-- <li>
        <button class="menu-item" @click="goTo('dashboard')">
          <span class="icon"><i class="fas fa-chart-bar"></i></span>
          Painel
        </button>
      </li>
      <li>
        <button class="menu-item" @click="goTo('profile')">
          <span class="icon"><i class="fas fa-user"></i></span>
          Perfil
        </button>
      </li>
      <li>
        <button class="menu-item" @click="goTo('settings')">
          <span class="icon"><i class="fas fa-cog"></i></span>
          Configurações
        </button>
      </li>
      <li>
        <button class="menu-item" @click="logout">
          <span class="icon"><i class="fas fa-sign-out-alt"></i></span>
          Logout
        </button>
      </li> -->
    </ul>
  </nav>
</template>
  
<script>
import { mapActions } from 'vuex';


export default {

  data() {
    return {
      dropdownvisible: false,
    }
  },
  computed: {

    // Map the 'theme' variable from the store to the component's computed properties
    theme() {
      return this.$store.state.theme;
    },
    // Computed property que retorna a lista de favoritos do Vuex
    favorites() {
      let favorites = this.$store.getters.getFavorites; // Acesso direto ao getter
      return favorites;
    },
  },
  methods: {
    ...mapActions(['addToFavorites', 'removeFromFavorites']),

    toggleTheme() {
      const newTheme = document.documentElement.classList.contains('day-theme')
        ? 'night'
        : 'day';
      document.documentElement.classList.remove('day-theme', 'night-theme');
      document.documentElement.classList.add(newTheme + '-theme');
      localStorage.setItem('theme', newTheme);
    },
    goTo(a) {
      return a
    },
    logout(a) {
      return a
    },
    toggleFavoritesDropdown() {
      this.dropdownvisible = !this.dropdownvisible;
    }
  },
  mounted() {
    document.documentElement.classList.add(this.theme); // apply the theme when the app is loaded
  }
};
</script>
  
<style scoped>
.empty-fav {
  padding: 0.2em;
  font-size: 1.0em;
  background-color: rgba(255, 255, 255, 0.695) !important;
  color: rgb(0, 0, 0);
}

#fav_div_section {
  position: relative;
}

.theme-label {
  font-size: 1.0em;
  margin-left: 0.3em;
}

.icon_menu_item {
  margin-left: 0.5em;
  position: relative;
  border: none;
  border-radius: 50%;
  width: 2.2em;
  color: rgb(189, 146, 146);
  height: 2.2em;
  background-color: rgb(223, 243, 248);
  padding: 0.2em;
  cursor: pointer;
  font-size: 1.2em;
  transition: color 200ms;
}

.icon_menu_item:hover {
  color: rgb(182, 79, 79);
}


.moon_toggle {
  height: 1.2em;
}


.menu-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 0.85em;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--cor-base);
  cursor: pointer;
  display: flex;
  align-items: center;
  background: none;
  border: none;
}

.menu-item .icon {
  margin-right: 8px;
}

.menu-item:last-child {
  margin-right: 0;
}


.heart-icon {
  display: inline-block;
  cursor: pointer;
  color: pink;
  transition: transform 300ms ease;
}

.heart-icon:hover {
  color: rgb(160, 32, 53);
  /* ou a cor desejada ao ser clicado (pressionado) */
}








.icon_menu_item {
  /* Restante do estilo */
  position: relative;
}

.favorites-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: auto;
  background-color: var(--app-bg-color);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5em;
  border-radius: 5px;
}

/* Mostra o dropdown quando houver favoritos */
.icon_menu_item.active .favorites-dropdown {
  display: block;
}

.favorites-dropdown ul {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  list-style: none;
  margin: 0;
  padding: 0;
}

.favorites-dropdown li {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: start;
  width: 100%;
  white-space: nowrap;
  cursor: pointer;
  margin-bottom: 0.3em;
  background-color: var(--cor-visible-over-base);
  border-radius: 0.85em;
  justify-content: space-around;
  text-decoration: none;
  transform-origin: 10% 50%;
  position: relative;
}

/* .card_fav_small{

} */

.right {
  flex-grow: 1;
  padding: 1em 3em 1em 1em;
  font-size: 1.0em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
}

.left img {
  border-top-left-radius: 1em;
  border-bottom-left-radius: 1em;
  left: 0;
  width: 6em;
  height: 6em;
}


/* Botão de fechar */
.close-button {
  position: absolute;
  top: -1.0em;
  right: 0.0em;
  border: none;
  border-radius: 0em 0em 0em 0em;
  background: none;
  color: rgb(139, 42, 42);
  font-size: 1.0em;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

/* Exibir o botão de fechar quando o cursor estiver sobre a li */
li:hover .close-button {
  opacity: 1;
}


.number-of-favs {
  position: absolute;
  top: 0;
  right: 0;
  width: 11px;
  height: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6em;
  font-weight: 700;
  background-color: darkred;
  color: white;
  border-radius: 50%;
  padding: 0.3em;
}
</style>
  