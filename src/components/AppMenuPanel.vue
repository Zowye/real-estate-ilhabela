<template>
  <nav>
    <ul class="menu-list">
      <li>
        <button class="menu-item" @click="toggleTheme">
          <span class="icon"><i :class="theme === 'day' ? 'fas fa-sun' : 'fas fa-moon'"></i></span>
          SWITCH TO {{ this.theme }}
        </button>
      </li>
      <li>
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
      </li>
    </ul>
  </nav>
</template>
  
<script>
export default {
  computed: {
    // Map the 'theme' variable from the store to the component's computed properties
    theme() {
      return this.$store.state.theme;
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
  },
};
</script>
  
<style scoped>
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
</style>
  