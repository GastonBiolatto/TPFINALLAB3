import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
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
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);

        if (validUser) {
          localStorage.setItem('login_success', JSON.stringify(validUser));
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
      localStorage.removeItem('login_success');
      commit('logout');
    }
  },
  modules: {
  }
})
