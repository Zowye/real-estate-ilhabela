<template>
  <div class="container1x">
    <div class="item">
      <div class="icon">
        <i class="fas fa-bed"></i>
      </div>
      <div class="value">3</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-car"></i>
      </div>
      <div class="value">2</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-ruler-combined"></i>
      </div>
      <div class="value">120m²</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-umbrella-beach"></i>
      </div>
      <div class="value">500m</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-couch"></i>
      </div>
      <div class="value">Não</div>
    </div>
  </div>
</template>
  
<style scoped>
.container1x {
  margin: 2.65em 0 0.65em 0;
  font-size: 0.85em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.item {
  background-color: var(--chip-color);
  display: flex;
  margin-bottom: 10px;
  margin-right: 0.35em;
  padding: 0.25em 0.6em;
  border-radius: 0.82em;
  color: var(--cor-base);
  /* border: 1px solid var(--cor-text-subbase); */
}

.icon {
  margin-right: 0.30em;
  font-size: 0.8em;
  border-radius: 50%;
  color: var(--black-or-white-inverse-theme);
}

.title {
  font-weight: bold;
}

.value {
  margin-left: auto;
  color: var(--black-or-white-inverse-theme);
  /* color: rgb(115, 109, 109); */
}
</style>
  



<!-- <template>
  <div class="container">
    <div class="item">
      <div class="icon">
        <i class="fas fa-bed"></i>
      </div>
      <div class="title">Quartos</div>
      <div class="value">3</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-car"></i>
      </div>
      <div class="title">Garagem</div>
      <div class="value">Sim</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-ruler-combined"></i>
      </div>
      <div class="title">Área</div>
      <div class="value">120 m²</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-umbrella-beach"></i>
      </div>
      <div class="title">Distância Praia</div>
      <div class="value">500 metros</div>
    </div>
    <div class="item">
      <div class="icon">
        <i class="fas fa-couch"></i>
      </div>
      <div class="title">Mobiliada</div>
      <div class="value">Não</div>
    </div>
  </div>
</template>

<style scoped>
.container {
    font-size: 10px;
  display: flex;
  flex-wrap: wrap;
}

.item {
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 10px;
}

.icon {
  margin-right: 10px;
}

.title {
  font-weight: bold;
}

.value {
  margin-left: auto;
}
</style>



























 -->
