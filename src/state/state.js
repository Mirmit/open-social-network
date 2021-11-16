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
      postageBatchId: '',
      biosInfo: {},
      othersBiosInfo: {},
      loading: false,
      logged: false,
      beeNodeConnected: false
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
    othersBiosInfo(state) {
      return state.othersBiosInfo;
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
    setOthersBiosInfo(state, othersBiosInfo) {
      state.othersBiosInfo = othersBiosInfo;
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
  //TODO check if posatage stam is still valid before trying to post
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
      const bee = new Bee(context.getters.beeAddress);
      const topic = context.getters.beatTopic + '/' + id;
      try {
        const beat = await bee.getJsonFeed(
          topic,
          { address: ethAddress }
        );
        return beat;
      } catch (error) {
        console.log('custom error getOneBeat', error);
      }
    },
    async getBeats(context, {ethAddress, number}) {
      const bee = new Bee(context.getters.beeAddress);
      let othersBiosInfo = context.getters.othersBiosInfo;
      let biosInfo = {};
      //Check if we already have this bios in storage. If we do not, we make the query and store the result in state
      if (othersBiosInfo[ethAddress]) {
        biosInfo = othersBiosInfo[ethAddress];
      } else {
        biosInfo = await bee.getJsonFeed(
          context.getters.biosTopic,
          { address: ethAddress }
        );
        othersBiosInfo[ethAddress] = biosInfo;
        context.commit('setOthersBiosInfo', othersBiosInfo);
      }
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
      console.log('setBiosInfo', bee);
      const signer = await context.dispatch('signer');
      console.log(signer);
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
  }
});

export default store
