import { createStore } from 'vuex';

export default createStore({
  
  state: {
    isLoading: true, // Application starts loading and then change this value...
    minPrice: 0,
    maxPrice: 0,
    house_info: null, // Starts with null
    isMobile: false,
    isTablet: false,
    theme: 'day-theme', // Default theme is 'day'
    favorites: [], // Inicia com uma lista vazia de favoritos
  },
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
  },
  mutations: {
    addToFavorites(state, itemId) {
      if (!state.favorites.includes(itemId)) {
        state.favorites.push(itemId);
      }
    },
    removeFromFavorites(state, itemId) {
      const index = state.favorites.indexOf(itemId);
      if (index !== -1) {
        state.favorites.splice(index, 1);
      }
    },
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
    addToFavorites({ commit }, itemId) {
      commit('addToFavorites', itemId);
    },
    removeFromFavorites({ commit }, itemId) {
      commit('removeFromFavorites', itemId);
    },
    updateHouseInfo({ commit }, info) {
      commit('setHouseInfo', info);
    },
  },
  modules: {}
});