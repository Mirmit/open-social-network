import {createStore} from "vuex";
import {Bee, Utils} from "@ethersphere/bee-js";
import createPersistedState from "vuex-persistedstate";
import state from "./state";
import defaultState from "./state";

const store = createStore({
  plugins: [createPersistedState()],
  state () {
    return {...state}
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
    myEthAddress(state) {
      return state.myEthAddress;
    },
    postageBatchId(state) {
      return state.postageBatchId;
    },
    loading(state) {
      return state.loading;
    },
    registered(state) {
      return state.registered;
    },
    logged(state) {
      return state.logged;
    },
    waitForSigner(state) {
      return state.waitForSigner;
    },
    beeNodeConnected(state) {
      return state.beeNodeConnected;
    }
  },
  mutations: {
    setMyBeats(state, myBeats) {
      console.log('I set my beats to this', myBeats);
      state.myBeats = myBeats;
    },
    setBeats(state, beats) {
      state.beats = beats;
    },
    setBiosInfo(state, biosInfo) {
      state.biosInfo = biosInfo;
    },
    setMyEthAddress(state, myEthAddress) {
      state.myEthAddress = myEthAddress;
    },
    setOthersBiosInfo(state, othersBiosInfo) {
      state.othersBiosInfo = othersBiosInfo;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setRegistered(state, registered) {
      state.registered = registered;
    },
    setLogged(state, logged) {
      state.logged = logged;
    },
    setWaitForSigner(state, waitForSigner) {
      state.waitForSigner = waitForSigner;
    },
    setPostageBatchId(state, postageBatchId) {
      state.postageBatchId = postageBatchId;
    },
    setBeeAddress(state, beeAddress) {
      state.beeAddress = beeAddress;
    },
    setBeeNodeConnected(state, beeNodeConnected) {
      state.beeNodeConnected = beeNodeConnected;
    },
    RESET_STATE(state) {
      Object.assign(state, defaultState);
    }
  },
  //TODO check if postage stamp is still valid before trying to post
  actions: {
    resetState(context) {
      context.commit('RESET_STATE');
    },
    async refreshMyBeats(context, number) {
      const numberOfBeats = context.getters.biosInfo.numberOfBeats;
      const totalBeats = Math.min(number, numberOfBeats);
      let beats = context.getters.myBeats;
      console.log('beats before setting anything', beats);
      for (let i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        let beatId = context.getters.myEthAddress + i;
        if (!(beatId in beats )) {
           let currentBeat = await context.dispatch(
            'getOneBeat',
            {
              ethAddress: context.getters.myEthAddress,
              id: i
            }
          );
          if (currentBeat) {
            currentBeat.username = 'me';
            beats[beatId] = currentBeat;
          }
        } else {
          break;
        }
      }
      context.commit('setMyBeats', beats);
    },
    async refreshBeats(context, {ethAddress, number}) {
      console.log('eth address for bios info', ethAddress)
      const biosInfo = await context.dispatch(
        'getBiosInfo',
         ethAddress
      );
      console.log('getBiosInfo in refreshBeats', biosInfo);
      const numberOfBeats = biosInfo.numberOfBeats;
      const totalBeats = Math.min(number, numberOfBeats);
      let beats = context.getters.beats;
      for (var i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        console.log('inside the loooo', i);
        let beatId = ethAddress + i;
        if (!(beatId in beats)) {
          let currentBeat = await context.dispatch(
            'getOneBeat',
            {
              ethAddress: ethAddress,
              id: i
            }
          );
          if (currentBeat) {
            currentBeat.username = biosInfo.username;
            currentBeat.userImage = biosInfo.image;
            beats[beatId] = currentBeat;
          }
        } else {
          break;
        }
      }
      console.log('beats in other user beats', beats);
      context.commit('setBeats', beats);
    },
    async getOneBeat(context, { ethAddress, id }) {
      const bee = new Bee(context.getters.beeAddress);
      const topic = context.getters.beatTopic + '/' + id;
      console.log('ethaddress in get one beat', ethAddress, id);
      try {
        return await bee.getJsonFeed(
          topic,
          {address: ethAddress}
        );
      } catch (error) {
        console.log('custom error getOneBeat', error);

        return false;
      }
    },
    async addNewBeat(context, newBeat) {
      const bee = new Bee(context.getters.beeAddress);
      const signer = await context.dispatch('signer');
      let biosInfo = await context.getters.biosInfo;
      console.log('biosInfo before posting new Beat', biosInfo);
      const beatNumber = (biosInfo.numberOfBeats ? biosInfo.numberOfBeats : 0) + 1;
      try {
        await bee.setJsonFeed(
          context.getters.postageBatchId,
          context.getters.beatTopic + '/' + beatNumber,
          newBeat,
          { signer: signer }
        );
        biosInfo.numberOfBeats = beatNumber;
        console.log('biosInfo after posting new Beat', biosInfo);
        await context.dispatch('setBiosInfo', biosInfo);
        await context.dispatch('refreshMyBeats', 5);
      } catch(error) {
        console.log('custom error', error);
      }
    },
    async getBiosInfo(context, ethAddress = null, forceRefresh = false) {
      const bee = new Bee(context.getters.beeAddress);
      let myBios = false;
      if (!ethAddress) {
        ethAddress = context.getters.myEthAddress;
        myBios = true;
      }
      let othersBiosInfo = context.getters.othersBiosInfo;
      let biosInfo = {};
      //Check if we already have this bios in storage. If we do not, we make the query and store the result in state
      if (othersBiosInfo[ethAddress] && !forceRefresh) {
        biosInfo = othersBiosInfo[ethAddress];
      } else {
        try {
          if (myBios) {
            if (this.getters.biosInfo !== {} || forceRefresh) {
              biosInfo = await bee.getJsonFeed(
                  context.getters.biosTopic,
                  {address: ethAddress}
              );
              context.commit('setBiosInfo', biosInfo);
            } else {
              biosInfo = this.getters.biosInfo;
            }
          } else {
            biosInfo = await bee.getJsonFeed(
                context.getters.biosTopic,
                { address: ethAddress }
            );
            console.log('Im here in other bios', biosInfo)
            othersBiosInfo[ethAddress] = biosInfo;
            context.commit('setOthersBiosInfo', othersBiosInfo);
          }
        } catch (error) {
          console.log('custom error', error);
        }
      }

      return biosInfo;
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
    emptyBiosInfo(context)
    {
        context.commit('setBiosInfo', null);
    },
    async signer(context) {
      if (window.ethereum) {
        const signer = await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
        context.commit('setMyEthAddress', '0x' + Utils.Eth.makeHexEthAddress(signer.address));

        return signer;
      } else {

        return false;
      }
    },
    async logout(context) {
      await context.dispatch('setMyEthAddress');
      await context.dispatch('emptyBiosInfo');
      context.commit('setLogged', false);
    },
    async login(context) {
      await context.dispatch('signer');
      await context.dispatch('getBiosInfo', { ethAddress: null, forceRefresh: true });
      context.commit('setLogged', true);
    },
    waitForSigner(context, wait = true) {
      context.commit('setWaitForSigner', wait);
    },
    setMyEthAddress(context, ethAddress = null) {
      context.commit('setMyEthAddress', ethAddress);
    },
    setLoading(context, loading) {
      context.commit('setLoading', loading);
    },
    setRegistered(context, registered) {
      context.commit('setRegistered', registered);
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
