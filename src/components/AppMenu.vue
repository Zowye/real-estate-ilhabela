<template>
  <nav>
    <ul class="menu-list">
      <router-link to="/" class="menu-item">Home</router-link>
      <router-link to="/about" class="menu-item">Sobre Nós</router-link>
      <router-link to="/contact" class="menu-item">Contato</router-link>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style>
.menu-list {
  display: flex; /* Define o layout como flexível */
  list-style: none; /* Remove os estilos de lista */
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-right: 20px;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.05em;
  font-weight: 500;
  text-transform: uppercase;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.menu-item:last-child {
  margin-right: 0; /* Remove a margem à direita do último item */
}



</style>
