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
        <div id="fav_div_section">
          <button class="icon_menu_item" :class="{ active: dropdownvisible }" @click="toggleFavoritesDropdown">
            <!-- Ícone do coração -->
            <i class="fas fa-heart"></i>
            <!-- Dropdown de favoritos -->

          </button>
          <div class="favorites-dropdown" v-show="dropdownvisible">
            <ul>
              <li>teste1</li>
              <!-- Mostrar a lista de favoritos -->
              <li v-for="favoriteId in favorites" :key="favoriteId">{{ favoriteId }}</li>
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
      let teste = this.$store.getters.getFavorites; // Acesso direto ao getter
      console.log(`Os favoritos até então são: ${teste}`);
      return teste;
    },
  },
  methods: {
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


#fav_div_section{
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
  height: 2.2em;
  background-color: rgb(223, 243, 248);
  padding: 0.2em;
  /* border: 1px solid var(--cor-base); */
  cursor: pointer;
  font-size: 1.2em;

  /* Hide the overflow of the ball */
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
  width: 5em;
  background-color: #eeebeb;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
}

/* Mostra o dropdown quando houver favoritos */
.icon_menu_item.active .favorites-dropdown {
  display: block;
}

.favorites-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.favorites-dropdown li {
  padding: 5px 0;
}
</style>
  