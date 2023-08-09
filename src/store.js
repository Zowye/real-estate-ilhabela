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
    activeMap: false,
    visibleMarkersData: [],
  },
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
    getVisibleMarkersData(state) {
      return state.visibleMarkersData;
    },
  },
  mutations: {
    TOGGLE_ACTIVE_MAP(state) {
      state.activeMap = !state.activeMap;
    },
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
    SET_VISIBLE_MARKERS_DATA(state, data) {
      state.visibleMarkersData = data;
    },
  },
  actions: {
    toggleActivateMap({ commit }) {
      commit('TOGGLE_ACTIVE_MAP');
    },
    addToFavorites({ commit }, itemId) {
      commit('addToFavorites', itemId);
    },
    removeFromFavorites({ commit }, itemId) {
      commit('removeFromFavorites', itemId);
    },
    updateHouseInfo({ commit }, info) {
      commit('setHouseInfo', info);
    },
    setVisibleMarkersData({ commit }, data) {
      commit('SET_VISIBLE_MARKERS_DATA', data);
    },
  },
  modules: {}
});