import { createStore } from "vuex";
import {Bee, Utils} from "@ethersphere/bee-js";

const store = createStore({
  state () {
    return {
      myBeats: [],
      beeAddress: 'http://localhost:1633',
      beatTopic: 'opensocialnetwork.eth/beats',
      biosTopic: 'opensocialnetwork.eth/beater',
      postageBatchId: '18b343cbc3d0abf3232b6287a47754314c3264f9d6ffa89cc4294a8b7f85bfb7',
      biosInfo: {}
    }
  },
  mutations: {
    setMyBeats(state, myBeats) {
      state.myBeats = myBeats;
    },
    setBiosInfo(state, biosInfo) {
      state.biosInfo = biosInfo;
    }
  },
  actions: {
    async getMyBeats(context) {
      console.log('bee address', context.getters.beeAddress);
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      try {
        const beats = await bee.getJsonFeed(
          context.getters.beatTopic,
          { signer: signer }
        );
        const biosInfo = await bee.getJsonFeed(
          context.getters.biosTopic,
          { signer: signer }
        );
        console.log('beats', beats);
        console.log('biosInfo', biosInfo);
        context.commit('setBiosInfo', biosInfo);
        if (beats.length > 0) {
          beats.sort(function(a, b) {
            return - ( a.id - b.id  ||  a.name.localeCompare(b.name) );
          });
          context.commit('setMyBeats', beats);
        }
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    },
  },
  getters: {
    myBeats(state) {
      return state.myBeats;
    },
    biosInfo(state) {
      return state.biosInfo;
    },
    beeAddress(state) {
      return state.beeAddress;
    },
    beatTopic(state) {
      return state.beatTopic;
    },
    biosTopic(state) {
      return state.biosTopic;
    },
    postageBatchId(state) {
      return state.postageBatchId;
    },
  }
});

export default store
