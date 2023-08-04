<template>
  <footer>
    <div class="footer-top">
      <div class="column">
        <h3>Sobre Nós</h3>
        <ul>
          <li><a href="#">Nossos imóveis</a></li>
          <li><a href="#">Nossa história</a></li>
          <li><a href="#">Nossa equipe</a></li>
          <li><a href="#">Testemunhos</a></li>
          <li><a href="#">Parceiros</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </div>
      <div class="column">
        <h3>Informações</h3>
        <ul>
          <li><a href="#">Regras</a></li>
          <li><a href="#">Trabalhe conosco</a></li>
          <li><a href="#">Responsabilidade social</a></li>
          <li><a href="#">Sustentabilidade</a></li>
          <li><a href="#">Perguntas Frequentes</a></li>
          <li><a href="#">Guias e Recursos</a></li>
        </ul>
      </div>
      <div class="column">
        <h3>Serviços</h3>
        <ul>
          <li><a href="#">Compra de Imóveis</a></li>
          <li><a href="#">Venda de Imóveis</a></li>
          <li><a href="#">Aluguel de Imóveis</a></li>
          <li><a href="#">Gestão de Propriedades</a></li>
          <li><a href="#">Consultoria Imobiliária</a></li>
          <li><a href="#">Avaliação de Imóveis</a></li>
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
h3{
  color:white;
}

footer {
  margin-top:10em;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  background-color: var(--cor-footer-regular);
}

.footer-top {
  display: flex;
  justify-content: center;
}

.footer-bottom {
  bottom: 0;
  background-color: var(--cor-footer-darker);
  color: white;
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

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.globe-icon {
  width: 80px;
  opacity: 0.8;
}

ul{
  list-style: none;
}

ul li {
  margin-bottom: 10px;
}

ul li a {
  color: #fff;
  text-decoration: none;
  transition: color 0.2s;
}

ul li a:hover {
  color: #91a9e4;
}
</style>