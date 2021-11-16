import {createStore} from "vuex";
import {Bee, Utils} from "@ethersphere/bee-js";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  plugins: [createPersistedState()],
  state () {
    return {
      myBeats: [],
      beats: [],
      beeAddress: 'http://localhost:1633',
      beatTopic: 'opensocialnetwork.eth/beats',
      biosTopic: 'opensocialnetwork.eth/beater',
      postageBatchId: 'cb6bc0c81c817fe25da3d379713eabf564d0a539a7fd743f5a646e25437e0f74',
      biosInfo: {},
      loading: false,
      logged: false,
      beeNodeConnected: false
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
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setLogged(state, logged) {
      state.logged = logged;
    },
    setPostageBatchId(state, postageBatchId) {
      state.postageBatchId = postageBatchId;
    },
    setBeeAddress(state, beeAddress) {
      state.beeAddress = beeAddress;
    },
    setBeeNodeConnected(state, beeNodeConnected) {
      state.beeNodeConnected = beeNodeConnected;
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
        console.log('topic in getOneBeat and more', topic);
      }
    },
    async getBeats(context, {ethAddress, number}) {
      const bee = new Bee(context.getters.beeAddress);
      console.log('inside the funciton',  ethAddress, number);
      const biosInfo = await bee.getJsonFeed(
        context.getters.biosTopic,
        { address: ethAddress }
      );
      console.log('other user bios info', biosInfo);
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
        newBeat.author = biosInfo.username;
        newBeat.userImage = biosInfo.image;
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
      //TODO set author of newbeat to username
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
      if (window.ethereum) {

        return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
      } else {

        return false;
      }
    },
    setLoading(context, loading) {
      context.commit('setLoading', loading);
    },
    setLogged(context, logged) {
      context.commit('setLogged', logged);
    },
    setPostageBatchId(context, postageBatchId) {
      context.commit('setPostageBatchId', postageBatchId);
    },
    setBeeAddress(context, beeAddress) {
      context.commit('setBeeAddress', beeAddress);
    },
    async checkBeeNodeConnected(context) {
      const bee = new Bee(context.getters.beeAddress);
      try {
        await bee.checkConnection();
        context.commit('setBeeNodeConnected', true);
      } catch(error) {
        console.log('Error checking connection to bee node');
        alert('Cannot connect to bee node');
        context.commit('setBeeNodeConnected', false);
      }
    }
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
    loading(state) {
      return state.loading;
    },
    logged(state) {
      return state.logged;
    },
    beeNodeConnected(state) {
      return state.beeNodeConnected;
    }
  }
});

export default store
