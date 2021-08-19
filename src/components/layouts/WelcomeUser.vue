<template>
  <ion-title>You are new</ion-title>
  <ion-content>
    This is the firt time you visit Open Social Network. You must initialize your account (just setting an username) in order to hear the network beating.
    <ion-item>
      <ion-label position="stacked">Username:</ion-label>
      <ion-input
          placeholder="username"
          v-model="username"
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Something about you:</ion-label>
      <ion-input
          placeholder="biosInfo"
          v-model="biosInfo"
      ></ion-input>
    </ion-item>
    <action-button @custom-click="createFirstBios" button-name="Start"></action-button>
  </ion-content>
</template>

<script>
import ActionButton from "../UI/ActionButton";
import {Bee, Utils} from "@ethersphere/bee-js";
import { IonInput, IonItem, IonLabel, IonTitle, IonContent } from "@ionic/vue";

export default {
  name: "WelcomeUser",
  components: {
    ActionButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonContent
  },
  emits: ['closeWelcomeUser'],
  inject: [
    'beeAddress',
    'biosTopic',
    'beatTopic',
    'postageBatchId'
  ],
  data() {
    return {
      'username': '',
      'biosInfo': ''
    }
  },
  methods: {
    async createFirstBios() {
      const bee = new Bee(this.beeAddress);
      const signer = await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
      const postageBatchId = this.postageBatchId;
      const bios = {
        username: this.username,
        image: '',
        biosInfo: this.biosInfo,
        following: []
      };
      console.log(this.biosInfo, this.username, 'new data entered by user');
      await bee.setJsonFeed(
          postageBatchId,
          this.biosTopic,
          bios,
          { signer: signer }
      );
      await bee.setJsonFeed(
          postageBatchId,
          this.beatTopic,
          [],
          { signer: signer }
      );
      this.$emit('closeWelcomeUser');
    }
  }
}
</script>

<style scoped>

</style>
