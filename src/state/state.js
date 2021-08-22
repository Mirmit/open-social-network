import {createStore} from "vuex";
import {Bee, Utils} from "@ethersphere/bee-js";

const store = createStore({
  state () {
    return {
      myBeats: [],
      beats: [],
      beeAddress: 'http://localhost:1633',
      beatTopic: 'opensocialnetwork.eth/beats',
      biosTopic: 'opensocialnetwork.eth/beater',
      postageBatchId: '2c9a1e6e2ed74a77f441e38fe718e87b4d8ec6786aaf4b2b4c9bfb6d522f2de3',
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
    async getMyBeats(context, number) {
      const signer = await context.dispatch('signer');
      const numberOfBeats = context.getters.biosInfo.numberOfBeats;
      const totalBeats = Math.min(number, numberOfBeats);
      let beats = [];
      for (var i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        console.log('inside the loooo', i);
        const newBeat = await context.dispatch(
          'getOneBeat',
          {
            ethAddress: signer.address,
            id: i
          }
        );
        beats.push(newBeat);
      }
      context.commit('setMyBeats', beats);
    },
    async getOneBeat(context, { ethAddress, id }) {
      console.log('parameters in function',  id);
      const bee = new Bee(context.getters.beeAddress);
      const topic = context.getters.beatTopic + '/' + id;
      try {
        console.log('topic in getOneBeat',topic);
        const beat = await bee.getJsonFeed(
          topic,
          { address: ethAddress }
        );
        console.log('beat in getOneBeat', beat);
        return beat;
      } catch (error) {
        console.log('custom error getOneBeat', error);
        console.log('id in getOneBEat and more', id);
        console.log('topic in getOneBEat and more', topic);
      }
    },
    async getBeats(context, {ethAddress, number}) {
      const bee = new Bee(context.getters.beeAddress);
      const biosInfo = await bee.getJsonFeed(
        context.getters.biosTopic,
        { address: ethAddress }
      );
      const numberOfBeats = biosInfo.numberOfBeats;
      const totalBeats = Math.min(number, numberOfBeats);
      let beats = [];
      for (var i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        console.log('inside the loooo', i);
        const newBeat = await context.dispatch(
          'getOneBeat',
          {
            ethAddress: ethAddress,
            id: i
          }
        );
        beats.push(newBeat);
      }
      context.commit('setBeats', beats);
    },
    async addNewBeat(context, newBeat) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      let biosInfo = await context.dispatch('getBiosInfo');
      const beats = context.getters.myBeats;
      const numberOfBeats = beats.length + 1;
      try {
        await bee.setJsonFeed(
          context.getters.postageBatchId,
          context.getters.beatTopic + '/' + numberOfBeats,
          newBeat,
          { signer: signer }
        );
        biosInfo.numberOfBeats = numberOfBeats;
        beats.unshift(newBeat);
        context.commit('setBeats', beats);
        await context.dispatch('setBiosInfo', biosInfo);
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

        return biosInfo;
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async setBiosInfo(context, biosInfo) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      console.log('signer',signer);
      console.log('postageBatchId',context.getters.postageBatchId);
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
