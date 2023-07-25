import { createStore } from 'vuex';

export default createStore({
  state: {
    minPrice: 0,
    maxPrice: 0,
  },
  mutations: {
    updateMinPrice(state, price) {
      state.minPrice = price;
    },
    updateMaxPrice(state, price) {
      state.maxPrice = price;
    },
  },
  actions: {},
  modules: {}
});
