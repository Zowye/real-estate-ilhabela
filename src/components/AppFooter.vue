<template>
  <footer>
    <div class="footer-top">
      <div class="column">
        <h3>Sobre Nós</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Aliquam</strong> tincidunt
          <strong>fringilla</strong> arcu, eget cursus elit tincidunt vitae.
        </p>
      </div>
      <div class="column">
        <div class="icon">
          <img src="@/assets/images/globe.png" alt="Globe Icon" class="globe-icon" />
        </div>
      </div>
      <div class="column">
        <h3>Coluna 3</h3>
        <ul class="menu">
          <li>
            <a href="#"><i class="fas fa-home"></i> Início</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-user"></i> Perfil</a>
          </li>
          <li>
            <a href="#"><i class="fas fa-cogs"></i> Configurações</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2023 Nidus. Todos os direitos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  margin-top:10em;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-color: var(--cor-clarinha);
}

.footer-top {
  display: flex;
  justify-content: center;
}

.footer-bottom {
  bottom: 0;
  background-color: var(--cor-clarinha2);
  color: var(--cor-base);
  padding: 10px;
  text-align: center;
}

.column {
  padding: 20px;
  width: 16%;
  text-align: center;
}

.column h3 {
  margin-bottom: 10px;
}

.column p strong {
  font-weight: bold;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.globe-icon {
  width: 80px;
  opacity: 0.8;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu li {
  margin-bottom: 10px;
}

.menu a {
  color: #fff;
  text-decoration: none;
}

.menu a i {
  margin-right: 5px;
}
</style>
