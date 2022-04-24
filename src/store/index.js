import { createStore } from 'vuex'
import { isProxy, toRaw } from 'vue';

// The Vuex store manages the data (state) shared between components and enables a central access to it
export default createStore({
  // The shared data
  state: {
    apiKey : '18f0e56333fe7988fb15f351af41f492',
    message: { }
  },
  // For getting the state
  getters: {
    getApiKey(state) {
      // state variable contains our state data
      return state.apiKey;
    },

    getMessage(state) {
      return state.message;
    }
  },

  // For changing the state (Synchronous)
  mutations: {
    setMessage(state, [key, value]) {
      state.message[key] = value;
    }
  },

  // For changing the state (Asynchronous)
  actions: {
  },

  modules: {
  }
})
