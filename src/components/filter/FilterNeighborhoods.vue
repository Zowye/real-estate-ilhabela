<template>
    <div class="dropdown" ref="dropdownRef">
      <button @click="toggleDropdown" class="dropdown-button">
        {{ selectedBairros.length > 1 ? 'Selecione mais bairros' : 'Selecione os bairros' }}
        <i class="fas fa-angle-down"></i>
      </button>
      <div v-if="showDropdown" class="dropdown-content">
        <label v-for="bairro in filteredBairros" :key="bairro.value" class="checkbox-label">
          <input type="checkbox" :value="bairro.value" v-model="selectedBairros" />
          {{ bairro.text }}
        </label>
      </div>
      <div class="chips-container">
        <div v-for="(bairro, index) in selectedBairros.slice(0, 3)" :key="index" class="chip" @click="removeBairro(index)">
          {{ getBairroText(bairro) }}
        </div>
        <div v-if="selectedBairros.length > 3" class="chip more-chips" @click="toggleDropdown">
          Mais {{ selectedBairros.length - 3 }}
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {

    data() {
        return {
            bairros: [
                { text: 'Perequê', value: 'pereque' },
                { text: 'Barra Velha', value: 'barra_velha' },
                { text: 'Itaquanduba', value: 'itaquanduba' },
                { text: 'Cocaia', value: 'cocaia' },
                { text: 'Portinho', value: 'portinho' },
                { text: 'Perequê Mirim', value: 'pereque_mirim' },
                { text: 'Saco da Capela', value: 'saco_da_capela' },
                { text: 'Engenho D\'Água', value: 'engenho_dagua' },
                { text: 'Ponta das Canas', value: 'ponta_das_canas' },
                { text: 'Praia Grande', value: 'praia_grande' },
                { text: 'Feiticeira', value: 'feiticeira' },
                { text: 'Siriúba', value: 'siriuba' },
                { text: 'Veloso', value: 'veloso' },
                { text: 'Praia do Curral', value: 'praia_curral' },
                { text: 'Praia do Julião', value: 'praia_juliao' },
                { text: 'Praia do Portinho', value: 'praia_portinho' },
                { text: 'Praia do Saco do Indaiá', value: 'praia_saco_do_indaia' },
            ],

            selectedBairros: [],
            showDropdown: false,
        };
    },
    computed: {
        filteredBairros() {
            return this.bairros.filter((bairro) => !this.selectedBairros.includes(bairro.value));
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
            if (this.showDropdown) {
                document.addEventListener('click', this.closeDropdownOnClickOutside);
            } else {
                document.removeEventListener('click', this.closeDropdownOnClickOutside);
            }
        },
        closeDropdownOnClickOutside(event) {
            if (!this.$refs.dropdownRef.contains(event.target)) {
                this.showDropdown = false;
                document.removeEventListener('click', this.closeDropdownOnClickOutside);
            }
        },
        getBairroText(bairro) {
            const foundBairro = this.bairros.find((item) => item.value === bairro);
            return foundBairro ? foundBairro.text : '';
        },
        removeBairro(index) {
            this.selectedBairros.splice(index, 1);
        },
    },
};
</script>
  
<style scoped>
* {
    user-select: none;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-button {
    padding: 1em;
    cursor: pointer;
    user-select: none;
    border-radius: 2em;
    display: flex; /* Alterado para flex */
    align-items: center;
    justify-content: space-between; /* Alterado para space-between */
    border: 2px solid #fff;
    width: 90%;
    position: relative; /* Adicionado para posicionar corretamente o ícone */
}

.dropdown-button i {
    
    margin-left: auto; /* Alinha o ícone à direita */
}



.dropdown-content {
    z-index: 1;
    position: absolute;
    top: 100%;
    left: 0;
    color: var(--cor-text-base);
    background-color: var(--card-background);
    border-radius: 0.88em;
    border-top: none;
    min-width: 200px;
    padding: 8px;
}

.checkbox-label {
    display: block;
    cursor: pointer;
    margin-bottom: 4px;
    padding: 0.5em;
    border-radius: 0.75em;
    transition: background-color 0.2s ease;
}

.checkbox-label:hover {
    color: var(--cor-destaque);
    background-color: var(--cor-clarinha);
}

.selected-item {
    background-color: #614dd5;
    width: 100%;
    color: #fff;
    padding: 0.3em;
}

.checkbox-label input[type="checkbox"] {
    display: none;
}


.chips-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
}

.chip {
    font-size: 0.85em;
    background-color: #614dd5;
    color: #fff;
    border-radius: 1em;
    padding: 0.5em 0.8em;
    margin-right: 8px;
    margin-bottom: 8px;
    cursor: pointer;
}

.close-icon {
    margin-left: 4px;
    cursor: pointer;
}
</style>
  