<template>
  <nav>
    <ul class="menu-list">
      <li class="dropdown">
        <router-link to="#" class="menu-item">Pages &#9662;</router-link>
        <ul class="dropdown-content">
          <li><router-link to="/" class="submenu-item">Home Básica</router-link></li>
          <li><router-link to="/home_ultra_clean" class="submenu-item">Home Ultra Clean</router-link></li>
          <li><router-link to="/home_map" class="submenu-item">Home com Mapa</router-link></li>
          <li><router-link to="/home_big_map" class="submenu-item">Home com Mapa Grande</router-link></li>
        </ul>
      </li>
      <li><router-link to="/about" class="menu-item">Sobre Nós</router-link></li>
      <li><router-link to="/contact" class="menu-item">Contato</router-link></li>
      <li><router-link to="/super_filter" class="menu-item special-button"><i class="fa fa-search" aria-hidden="true"></i> Busca Avançada</router-link></li>

    </ul>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.menu-list {
  display: flex;
  list-style: none;
  padding: 0;
  white-space: nowrap;
  margin: 0;
}

.menu-item {
  margin-right: 2em;
}

.menu-item,
.submenu-item {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1.05em;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--cor-base);
  text-decoration: none;

  cursor: pointer;
}

.dropdown {
  border-radius: 1em;
  position: relative;
  display: inline-block;
}

.special-button{
  background-color: var(--cor-base);
  color: white;
  padding: 0.5em;
  font-size: 0.85em;
  border-radius: 0.95em;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  background-color: var(--card-background);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

}

.dropdown-content .submenu-item {

  text-transform: none;
  display: block;
  padding: 10px 15px;
  white-space: nowrap;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content .submenu-item:hover {
  background-color: var(--cor-base);
  color: var(--cor-visible-over-base);
}

.dropdown:last-child .menu-item {
  margin-right: 0;
  /* Remove a margem à direita do último item */
}
</style>
