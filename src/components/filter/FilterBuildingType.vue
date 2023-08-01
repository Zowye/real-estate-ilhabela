<template>
    <div class="chips-container">
      <div
        v-for="(chip, index) in chips"
        :key="index"
        class="chip"
        :style="{ backgroundColor: chip.selected ? '#614dd5' : 'transparent', color: chip.selected ? '#fff' : '#614dd5' }"
        @click="toggleSelected(index)"
      >
        {{ chip.label }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        chips: [
          { label: 'Flat', selected: false },
          { label: 'Casa', selected: false },
          { label: 'Sítio', selected: false },
          { label: 'Apartamento', selected: false },
          { label: 'Outros', selected: false },
        ],
      };
    },
    methods: {
      toggleSelected(index) {
        this.chips[index].selected = !this.chips[index].selected;
      },
    },
  };
  </script>
  
  <style scoped>
  .chips-container {
    display: flex;
    flex-wrap: wrap;
  }
  
  .chip {
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--cor-base);
    padding: 8px 12px;
    margin-right: 0.6em;
    margin-top: 0.4em;
    border-radius: 20px;
    cursor: pointer;
  }
  </style>
  