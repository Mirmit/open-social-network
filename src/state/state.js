import { createStore } from "vuex";
import {Bee, Utils} from "@ethersphere/bee-js";

const store = createStore({
  state () {
    return {
      myBeats: [],
      beats: [],
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
    setBeats(state, beats) {
      state.beats = beats;
    },
    setBiosInfo(state, biosInfo) {
      state.biosInfo = biosInfo;
    }
  },
  actions: {
    async getMyBeats(context) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      try {
        const beats = await bee.getJsonFeed(
          context.getters.beatTopic,
          { signer: signer }
        );
        context.commit('setMyBeats', beats);
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async getBeats(context, ethAddress) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = Utils.Eth.makeHexEthAddress(ethAddress);
      console.log(signer);
      try {
        const beats = await bee.getJsonFeed(
          context.getters.beatTopic,
          { signer: signer }
        );
        context.commit('setBeats', beats);
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async getBiosInfo(context) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      try {
        const biosInfo = await bee.getJsonFeed(
          context.getters.biosTopic,
          { signer: signer }
        );
        context.commit('setBiosInfo', biosInfo);
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async setBiosInfo(context, biosInfo) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      try {
        await bee.setJsonFeed(
          context.getters.postageBatchId,
          context.getters.biosTopic,
          biosInfo,
          { signer: signer }
        );
        context.commit('setBiosInfo', biosInfo);
      } catch(error) {
        console.log('custom error', error);
      }
    }
    ,
    addNewBeat(context, newBeat) {
      const beats = context.getters.myBeats;
      beats.unshift(newBeat);
      context.commit('setMyBeats', beats);
    },
    async firstBeat(context) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      await bee.setJsonFeed(
        context.getters.postageBatchId,
        context.getters.beatTopic,
        [],
        { signer: signer }
      );
    },
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    },
  },
  getters: {
    myBeats(state) {
      return state.myBeats;
    },
    beats(state) {
      return state.beats;
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
