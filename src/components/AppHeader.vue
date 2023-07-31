<template>
  <header class="desktop-header" v-if="isDesktop">
    <div class="header_content_wrapper">
      <div id="left">
        <div id="logo">
          <img src="@/assets/images/logoNidus.png" class="logo" alt="nidus_real_estate" @click="goToHome">
        </div>
        <Menu />
      </div>
      <div id="right">
        <MenuPanel />
      </div>
    </div>
  </header>


  <!-- Header for smartphones -->
  <header class="mobile-header" v-else>
    <div class="header_content_wrapper_mobile">
      <div id="left-mobile">
        <div id="logo">
          <img src="@/assets/images/logoNidus.png" class="logo" alt="nidus_real_estate" @click="goToHome">
        </div>
        <button class="hamburger-menu" @click="toggleMenu">
          <span class="hamburger-icon" :class="{ 'open': showDropdown }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <div class="dropdown-menu" v-show="showDropdown">
          <ul class="dropdown-list">
            <li class="dropdown-item">Item 1</li>
            <li class="dropdown-item">Item 2</li>
            <li class="dropdown-item">Item 3</li>
            <li class="dropdown-item">Item 4</li>
            <li class="dropdown-item">Item 5</li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>
  
<script>
import Menu from './AppMenu.vue';
import MenuPanel from './AppMenuPanel.vue';

export default {
  data() {
    return {
      isDesktop: window.innerWidth >= 768, // Assuming 768px as the breakpoint for desktop
      showDropdown: false, // Control the visibility of the dropdown
    };
  },
  components: {
    Menu,
    MenuPanel
  },
  methods: {
    toggleMenu() {
      this.showDropdown = !this.showDropdown;
    },
    goToHome() {
      this.$router.push('/');
    },
    updateIsDesktop() {
      this.isDesktop = window.innerWidth >= 768;
    }
  },
  computed: {
    headerClass() {
      return this.isDesktop ? 'desktop-header' : 'mobile-header';
    }
  },
  mounted() {
    // Adicionar ouvinte de redimensionamento da janela
    window.addEventListener('resize', this.updateIsDesktop);
  },
  beforeUnmount() {
    // Remover o ouvinte de redimensionamento da janela antes do componente ser destruído
    window.removeEventListener('resize', this.updateIsDesktop);
  }
};
</script>
<style>
.mobile-header {
  /* ... existing styles for mobile header ... */
  display: none;
  /* Hide the mobile header by default */
}


.desktop-header {
  position: absolute;
  z-index: 19;
  display: flex;
  align-items: center;
  height: 110px;
  width: 100%;
  justify-content: center;
  margin-bottom: 40px;
  background-color: var(--header-background);
  color:var(--cor-base);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
}


#left-mobile {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  align-items: center;
}

#left {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 50%;
  align-items: center;
}


#right {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 40%;
  align-items: center;
}


.header_content_wrapper {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
}

.header_content_wrapper_mobile {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-left: 20px;
  margin-right: 20px;
  width: 199px;
  cursor: pointer;
}



.dropdown-menu {

  position: absolute;
  top: 120%;
  width: 90%;
  overflow: auto;
  background-color: var(--cor-base);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 100;
}

.dropdown-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  padding: 1em 2em;
  font-size: 1.3em;
  color: #333;
  cursor: pointer;
  transition: background-color 0.1s ease;
}

.dropdown-item:hover {
  background-color: #f3f3f3;
}


@media (max-width: 767px) {
  .desktop-header {
    display: none;
    /* Hide the desktop header on smaller screens */
  }

  .logo {
    margin: 0.5em;
    width: 129px;
    cursor: pointer;
  }

  .mobile-header {
    justify-content: space-around;
    padding: 0 0;
    display: flex;
    /* Show the mobile header on smaller screens */
    /* ... additional styles for the mobile header ... */
  }
}











.hamburger-menu {
  border: none;
  background: none;
  cursor: pointer;
}

.hamburger-icon {
  display: block;
  width: 35px;
  height: 20px;
  position: relative;
}

.hamburger-icon span {
  display: block;
  position: absolute;
  height: 0.2em;
  border-radius: 0.1em;
  width: 100%;
  background: #333;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}

.hamburger-icon span:nth-child(1) {
  top: 0px;
}

.hamburger-icon span:nth-child(2) {
  top: 8px;
}

.hamburger-icon span:nth-child(3) {
  top: 16px;
}

.hamburger-icon.open span:nth-child(1) {
  top: 8px;
  transform: rotate(135deg);
}

.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
  left: -60px;
}

.hamburger-icon.open span:nth-child(3) {
  top: 8px;
  transform: rotate(-135deg);
}
</style>