import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoading: true, // Application starts loading and then change this value...
    minPrice: 0,
    maxPrice: 0,
    house_info: null, // Starts with null
    isMobile: false,
    isTablet: false,
    theme: 'day', // Default theme is 'day'
  },
  mutations: {
    setTheme(state, newTheme) {
      state.theme = newTheme;
    },
    SET_IS_MOBILE(state, value) {
      state.isMobile = value;
    },
    SET_IS_TABLET(state, value) {
      state.isTablet = value;
    },
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