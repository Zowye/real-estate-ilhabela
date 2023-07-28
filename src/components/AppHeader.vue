<template>
  <header>
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
</template>
  
<script>
import Menu from './AppMenu.vue';
import MenuPanel from './AppMenuPanel.vue';

export default {
  components: {
    Menu,
    MenuPanel
  },
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>
<style>
header {
  position: absolute;
  z-index: 19;
  display: flex;
  align-items: center;
  height: 110px;
  width: 100%;
  justify-content: center;
  margin-bottom: 40px;
  background-color: rgba(255, 255, 255, 0.818);
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.1);
}

#left{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  width: 40%;
  align-items: center;
}

#right{
  display: flex;
  flex-direction: row;
  justify-content:space-around;
  width: 40%;
  align-items: center;
}

.header_content_wrapper {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: space-between;
}

.logo {
  margin-left: 20px;
  margin-right: 20px;
  width: 199px;
  cursor: pointer;
}
</style>