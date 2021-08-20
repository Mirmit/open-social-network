import { createStore } from "vuex";

const store = createStore({
  state () {
    return {
      myBeats: []
    }
  },
  mutations: {
    setMyBeats(state, myBeats) {
      state.myBeats = myBeats;
    },
    increment (state) {
      state.count++
    }
  },
  getters: {
    myBeats(state) {
      return state.myBeats;
    }
  }
});

export default store
