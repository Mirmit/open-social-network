<template>
  <ion-app :style="isLoggedIn">
    <ion-header>
      <the-header></the-header>
    </ion-header>
    <ion-content>
      <ion-router-outlet />
    </ion-content>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet, IonHeader, IonContent } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";
import { Utils } from '@ethersphere/bee-js';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    TheHeader,
    IonHeader,
    IonContent
  },
  // provide() {
  //   return {
  //     signer: computed(() => {
  //       if (this.signer === '') {
  //         return 'No signer yet';
  //       } else {
  //         return this.signer;
  //       }
  //     })
  //   }
  // },
  data() {
    return {
      signer: ''
    }
  },
  async beforeCreate() {
    await Utils.Eth.makeEthereumWalletSigner(window.ethereum).then( (signer) => {
      this.signer = signer;
      console.log('Ethereum wallet signer', signer);
    });
  },
  computed: {
    isLoggedIn() {
      if (this.signer === '') {
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
