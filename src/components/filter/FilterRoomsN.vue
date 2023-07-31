<template>
  <div class="dropdown" ref="dropdownRef">
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selectedOption ? `Quartos: ${selectedOption}` : 'Quartos' }}
      <i class="fas fa-angle-down"></i>
    </button>
    <div v-if="showDropdown" class="dropdown-content">
      <label v-for="option in options" :key="option.value" class="checkbox-label">
        <input type="radio" :value="option.value" v-model="selectedOption" />
        {{ option.text }}
        <i v-if="selectedOption === option.value" class="fas fa-check-circle checked-icon"></i>
      </label>
    </div>
  </div>
</template>

  
<script>
export default {
  data() {
    return {
      options: [
        { text: '1 quarto', value: '1+' },
        { text: '2 quartos', value: '2+' },
        { text: '3 quartos', value: '3+' },
        { text: '4 quartos', value: '4+' },
        { text: '5+ quartos', value: '5+' },
      ],
      selectedOption: null,
      showDropdown: false,
    };
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
  },
};
</script>
  
<style scoped>
* {
  user-select: none;
}

.dropdown {
  width: 90%;
  position: relative;
  display: inline-block;
}

.checked-icon {
  color: rgb(98, 155, 65);
  margin-left: 8px;
}


.checkbox-label input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.dropdown-button {
    padding: 1em;
    cursor: pointer;
    user-select: none;
    color: var(--cor-texto-base);
    border-radius: 2em;
    display: flex; /* Alterado para flex */
    align-items: center;
    justify-content: space-between; /* Alterado para space-between */
    border: 2px solid #fff;
    width: 100%;
    position: relative; /* Adicionado para posicionar corretamente o ícone */
}

.dropdown-button i {
    margin-left: auto; /* Alinha o ícone à direita */
}

.dropdown-content {
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
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
  background-color: #614dd5;
  color: #fff;
  border-radius: 1em;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  cursor: pointer;
}

.close-icon {
  margin-left: 4px;
  cursor: pointer;
}
</style>
  