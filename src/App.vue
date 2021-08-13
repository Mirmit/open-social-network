<template>
  <ion-app>
    <ion-header :style="shadow">
      <the-header></the-header>
    </ion-header>
    <ion-content>
      <ion-router-outlet :style="shadow"/>
      <new-post-button @custom-click="openNewBeat" :style="shadow"></new-post-button>
      <new-beat :class="{hidden: newBeatHidden}"></new-beat>
    </ion-content>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet, IonHeader, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";
import { Utils } from '@ethersphere/bee-js';
import NewPostButton from "./components/UI/NewPostButton";
import NewBeat from "./components/beats/NewBeat";

export default defineComponent({
  name: 'App',
  components: {
    NewBeat,
    IonApp,
    IonRouterOutlet,
    TheHeader,
    IonHeader,
    IonContent,
    NewPostButton
  },
  provide: {
    beeAddress: 'http://localhost:1633',
    beatTopic: 'opensocialnetwork.eth/beats'
  },
  data() {
    return {
      signer: '',
      newBeatHidden: true
    }
  },
  methods: {
    openNewBeat() {
      this.newBeatHidden = !this.newBeatHidden;
    }
  },
  async beforeCreate() {
    await Utils.Eth.makeEthereumWalletSigner(window.ethereum).then( (signer) => {
      this.signer = signer;
      console.log('Ethereum wallet signer', signer);
    });
  },
  computed: {
    shadow() {
      if (this.signer === '' || !this.newBeatHidden) {
        return {
          opacity: 0.6
        }
      } else {
        return {
          opacity: 1
        }
      }
    }
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
