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
    },
    registering(state) {
      return state.registering;
    },
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
    setRegistering(state, registering) {
      state.registering = registering;
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
      let myBeats = context.getters.myBeats;
      for (let i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        let beatId = context.getters.myEthAddress.toLowerCase() + i;
        if (!(beatId in myBeats )) {
           let currentBeat = await context.dispatch(
            'getOneBeat',
            {
              ethAddress: context.getters.myEthAddress,
              id: i
            }
          );
          if (currentBeat != null) {
            const biosInfo = context.getters.biosInfo;
            currentBeat.username = biosInfo.username;
            currentBeat.userImage = biosInfo.image;
            myBeats[beatId] = currentBeat;
            while (currentBeat.replyTo != null) {
              let replyTo = currentBeat.replyTo;
              currentBeat = await context.dispatch(
                  'loadReplyToBeat',
                  { replyTo }
              );
            }
          }
        } else {
          break;
        }
      }
      context.commit('setMyBeats', myBeats);
    },
    async refreshBeats(context, {ethAddress, number}) {
      const biosInfo = await context.dispatch(
        'getBiosInfo',
         ethAddress
      );
      const numberOfBeats = biosInfo.numberOfBeats;
      const totalBeats = Math.min(number, numberOfBeats);
      let beats = context.getters.beats;
      for (var i = numberOfBeats; i > numberOfBeats - totalBeats; i--) {
        let beatId = ethAddress.toLowerCase() + i;
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
            while (currentBeat.replyTo != null) {
              let replyTo = currentBeat.replyTo;
              currentBeat = await context.dispatch(
                  'loadReplyToBeat',
                  { replyTo }
              );
            }
          }
        } else {
          break;
        }
      }
      context.commit('setBeats', beats);
    },
    async loadReplyToBeat(context, { replyTo }) {
      let myBeats = context.getters.myBeats;
      let beats = context.getters.beats;
      let currentBeat = null;
      if (replyTo in beats) {
        currentBeat = beats[replyTo];
      } else if (replyTo in myBeats) {
        currentBeat = myBeats[replyTo];
      } else {
        const replyEthAddress = replyTo.substring(0, 42);
        const replyBeatId = replyTo.substring(42,99999)*1;
        currentBeat = await context.dispatch(
            'getOneBeat',
            {
              ethAddress: replyEthAddress,
              id: replyBeatId
            }
        );
        if (currentBeat) {
          if (replyEthAddress === this.getters.myEthAddress) {
            currentBeat.username = 'me';
            myBeats[replyTo] = currentBeat;
          } else {
            const biosInfo = await context.dispatch(
                'getBiosInfo',
                replyEthAddress
            );
            currentBeat.username = biosInfo.username;
            currentBeat.userImage = biosInfo.image;
            beats[replyTo] = currentBeat;
          }
        }
        context.commit('setBeats', beats);
        context.commit('setMyBeats', myBeats);
      }

      return currentBeat;
    }
    ,
    async getOneBeat(context, { ethAddress, id }) {
      const bee = new Bee(context.getters.beeAddress);
      const topic = context.getters.beatTopic + '/' + id;
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
      const beatNumber = (biosInfo.numberOfBeats ? biosInfo.numberOfBeats : 0) + 1;
      try {
        await bee.setJsonFeed(
          context.getters.postageBatchId,
          context.getters.beatTopic + '/' + beatNumber,
          newBeat,
          { signer: signer }
        );
        biosInfo.numberOfBeats = beatNumber;
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
      } else {
        if (typeof ethAddress === 'string') {
          if (this.getters.myEthAddress === ethAddress.toLowerCase()) {
            myBios = true;
          }
        }
      }
      ethAddress = ethAddress.toLowerCase();
      let othersBiosInfo = context.getters.othersBiosInfo;
      let biosInfo = {};
      //Check if we already have this bios in storage. If we do not, we make the query and store the result in state
      if (othersBiosInfo[ethAddress] && !forceRefresh && !myBios) {
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
      try {
        const signer = await context.dispatch('signer');
        console.log('signer in setBiosInfo', signer)
        await bee.setJsonFeed(
            context.getters.postageBatchId,
            context.getters.biosTopic,
            biosInfo,
            { signer }
        ).then(() => {
          context.commit('setBiosInfo', biosInfo);
        })
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
        const signer = await Utils.makeEthereumWalletSigner(window.ethereum);
        context.commit('setMyEthAddress', '0x' + Utils.makeHexEthAddress(signer.address));

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
      await context.dispatch('getBiosInfo', null, true);
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
    setRegistering(context, registering) {
      context.commit('setRegistering', registering);
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
        console.log('Error checking connection to bee node', error);
        alert('Cannot connect to bee node');
        context.commit('setBeeNodeConnected', false);
      }
    }
  }
});

export default store
