<template>
  <div class="wrapper">
    <div class="price-input">
      <div class="field">
        <input ref="minInput" type="text" class="input-min" :value="minInputText" @input="updateMinInputText($event.target.value)" @blur="updateMinPriceInput()" @focus="clearInput('min')" @keyup.enter="this.$refs.maxInput.focus();"  />
      </div>

      <div class="field">
        <input ref="maxInput" type="text" class="input-max" :value="maxInputText" @input="updateMaxInputText($event.target.value)" @blur="updateMaxPriceInput()" @focus="clearInput('max')" @keyup.enter="this.$refs.maxInput.blur();"  />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minInputValue: null,
      maxInputValue: null,
      minInputText: 'R$ 0,00',
      maxInputText: 'R$ 0,00',
    };
  },
  computed: {
    minPrice() {
      return this.$store.state.minPrice;
    },
    maxPrice() {
      return this.$store.state.maxPrice;
    },
  },
  methods: {
    formatCurrency(value) {
      if (!value) return '';
      const numberFormat = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
      const amount = parseFloat(value.replace(/\D/g, ''));
      return isNaN(amount) ? '' : numberFormat.format(amount);
    },
    clearInput(input) {
      if (input === 'min') {
        this.minInputValue = null;
        this.minInputText = '';
      } else if (input === 'max') {
        this.maxInputValue = null;
        this.maxInputText = '';
      }
    },
    updateMinInputText(value) {
      this.minInputText = value;
    },
    updateMaxInputText(value) {
      this.maxInputText = value;
    },
    updateMinPriceInput() {
      const price = parseFloat(this.minInputText.replace(/\D/g, ''));
      this.$store.commit('updateMinPrice', isNaN(price) ? 0 : price);
      this.minInputText = this.formatCurrency(price.toString());
    },
    updateMaxPriceInput() {
      const price = parseFloat(this.maxInputText.replace(/\D/g, ''));
      this.$store.commit('updateMaxPrice', isNaN(price) ? 0 : price);
      this.maxInputText = this.formatCurrency(price.toString());
    },
  },
};
</script>

<style scoped>
/* Import Google Font - Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
  font-family: var(--font-text);
}

.wrapper {
  width: 90%;
}

.input-min,
.input-max {}

.price-input {
  width: 100%;
  display: flex;
}

.price-input .field {
  display: flex;
  width: 100%;
  height: 45px;
  align-items: center;
}

.field input {
  width: 100%;
  height: 100%;
  outline: none;
  font-size: 1em;
  margin-left: 12px;
  color: var(--cor-text-base);
  border-radius: 1.5em;
  background-color: #e3e3e3;
  text-align: center;
  border: none;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.price-input .separator {
  width: 130px;
  display: flex;
  font-size: 19px;
  align-items: center;
  justify-content: center;
}

.slider {
  height: 5px;
  position: relative;
  background: #ddd;
  border-radius: 5px;
}

.slider .progress {
  height: 100%;
  left: 25%;
  right: 25%;
  position: absolute;
  border-radius: 5px;
  background: var(--cor-base);
}

.range-input {
  position: relative;
}

.range-input input {
  position: absolute;
  width: 100%;
  height: 5px;
  top: -5px;
  background: none;
  pointer-events: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input[type="range"]::-webkit-slider-thumb {
  height: 17px;
  width: 17px;
  border-radius: 50%;
  cursor: pointer;
  background: var(--cor-base);
  pointer-events: auto;
  -webkit-appearance: none;
  box-shadow: 0 0 6px rgba(253, 253, 253, 0.05);
}

input[type="range"]::-moz-range-thumb {
  height: 17px;
  width: 17px;
  border: none;
  border-radius: 50%;
  background: #625555;
  pointer-events: auto;
  -moz-appearance: none;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);

  .range-input .range-thumb {
    position: absolute;
    top: -25px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    transition: top 0.3s ease;
  }

  .range-input .min-thumb {
    left: 0;
  }

  .range-input .max-thumb {
    right: 0;
  }

  .range-input input[type='range']:active~.range-thumb {
    top: -35px;
  }

}
</style>
