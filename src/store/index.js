import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('login_success')) || null,
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
    currentUser(state) {
      return state.user;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    
  },
  actions: {
    login({ commit }, { email, password }) {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
          // No es necesario establecer un nuevo ítem en local storage
          commit('setUser', validUser);
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log('Error:', e);
        return false;
      }
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  modules: {
  }
});
