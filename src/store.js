import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoading: true, // Application starts loading and then change this value...
    minPrice: 0,
    maxPrice: 0,
    house_info: null, // Starts with null
  },
  mutations: {
    updateMinPrice(state, price) {
      state.minPrice = price;
    },
    updateMaxPrice(state, price) {
      state.maxPrice = price;
    },
    setHouseInfo(state, info) {
      state.house_info = info;
    },
    SET_LOADING_STATE(state, status) {
      state.isLoading = status;
    },
  },
  actions: {
    updateHouseInfo({ commit }, info) {
      commit('setHouseInfo', info);
    },
  },
  modules: {}
});