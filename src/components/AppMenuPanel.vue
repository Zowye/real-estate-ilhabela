<template>
  <nav>
    <ul class="menu-list">
      <li>
        <button class="icon_menu_item" @click="toggleTheme">
          <img :src="themeIcon" alt="Theme Icon" />
        </button>
        <!-- <span class="theme-label">{{ theme === 'day-theme' ? 'Switch to Dark Mode' : 'Switch to Light Mode' }}</span> -->

      </li>
      <li>
        <div id="fav_div_section" :v-click-outside="toggleFavoritesDropdown">
          <button class="icon_menu_item fav" :class="{ active: dropdownvisible }" @click="toggleFavoritesDropdown">
            <i class="fas fa-heart"></i>
            <div v-if="favorites.length > 0 && favorites.length < 10" class="number-of-favs">{{ favorites.length }}</div>
            <div v-if="favorites.length >= 10" class="number-of-favs">9+</div>

          </button>
          <transition name="fade">
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
                    <button class="close-button-card-fav" @click.stop="removeFromFavorites(card_fav)">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>

                </li>
              </ul>
            </div>
          </transition>
        </div>
      </li>
      <li>
        <div :v-click-outside="toggleFavoritesDropdown">
          <button class="icon_menu_item user" :class="{ active: dropdownvisible }">
            <i class="fas fa-user"></i>

          </button>


        </div>
      </li>

      <li>
        <div :v-click-outside="toggleFavoritesDropdown">
          <button class="icon_menu_item user" :class="{ active: dropdownvisible }">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </li>
      <li><button class="button-menu-panel">LOGIN</button></li>

    </ul>
  </nav>
</template>
  
<script>
import { mapActions, mapMutations } from 'vuex';


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
    themeIcon() {
      console.log("O tema é: ", this.theme);
      return this.theme === 'day-theme'
        ? require('@/assets/images/ico-moon-small.png')
        : require('@/assets/images/ico-sun.svg');
    },
    // Computed property que retorna a lista de favoritos do Vuex
    favorites() {
      let favorites = this.$store.getters.getFavorites; // Acesso direto ao getter
      return favorites;
    },
  },
  methods: {
    ...mapActions(['addToFavorites', 'removeFromFavorites']),
    ...mapMutations(['setTheme']),

    toggleTheme() {
      const newTheme = document.documentElement.classList.contains('day-theme')
        ? 'night'
        : 'day';
      document.documentElement.classList.remove('day-theme', 'night-theme');
      document.documentElement.classList.add(newTheme + '-theme');
      localStorage.setItem('theme', newTheme);

      this.setTheme(`${newTheme}-theme`);
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
  border-radius: 0.4em;
  width: 2.2em;
  color: rgb(139, 137, 137);
  height: 2.2em;
  background-color: transparent;
  padding: 0.2em;
  cursor: pointer;
  font-size: 1.2em;
  transition: all 200ms;
}

.icon_menu_item:hover {
  animation: bounce 0.5s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: var(--app-bg-color);

}

.fav:hover {
  color: rgb(182, 79, 79);
}

.user:hover {
  color: rgb(89, 138, 135);
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



.button-menu-panel {
  cursor: pointer;
  margin-left: 1em;
  background-color: var(--app-bg-color);
  color: var(--app-bg-color-inverse);
  border-radius: 0.7em;
  border: none;
  padding: 1em 2em;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 200ms ease;
}


.button-menu-panel:hover {
  background-color: var(--cor-base);
  color: var(--app-bg-color);
}




.icon_menu_item {
  /* Restante do estilo */
  position: relative;
}

.favorites-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: max-content;
  background-color: var(--app-bg-color);
  padding: 0.5em;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

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
  border-radius: 0.3em;
  left: 0;
  width: 6em;
  height: 6em;
}


/* Botão de fechar */
.close-button-card-fav {
  position: absolute;
  top: -0.5em;
  right: 0.0em;
  height: 100%;
  border: none;
  background: none;
  color: rgb(139, 42, 42);
  font-size: 1.0em;
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s ease;
}

/* Exibir o botão de fechar quando o cursor estiver sobre a li */
li:hover .close-button-card-fav {
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



@keyframes bounce {
  0% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.1);
  }

  40% {
    transform: scale(0.9);
  }

  60% {
    transform: scale(1.05);
  }

  80% {
    transform: scale(0.95);
  }

  100% {
    transform: scale(1);
  }
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.33s;
}

.fade-enter-from,
.fade-leave-to

/* .fade-leave-active no <2.1.8 */
  {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from

/* .fade-leave no <2.1.8 */
  {
  opacity: 1;
}</style>
  