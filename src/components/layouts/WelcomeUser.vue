<template>
  <ion-title>You are new</ion-title>
  <ion-content v-if="!logged">
    This is the firt time you visit Open Social Network. You must initialize your account (just setting an username) in order to hear the network beating.


    Before starting, you should buy some stamps. Click here to buy your first batch
    <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
    <ion-spinner v-else-if="buyingBatch" name="dots">Buying some stamps</ion-spinner>
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
          placeholder="bios"
          v-model="bios"
      ></ion-input>
    </ion-item>
    <action-button @custom-click="createFirstBios" button-name="Start"></action-button>
  </ion-content>
  <ion-content v-else>
    You should buy some post stamps. Click here to buy your first batch
    <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
    <ion-spinner v-else-if="buyingBatch" name="dots">Buying some stamps</ion-spinner>
    <action-button @custom-click="close" button-name="Close"></action-button>
  </ion-content>
</template>

<script>
import ActionButton from "../UI/ActionButton";
import { IonInput, IonItem, IonLabel, IonTitle, IonContent, IonSpinner } from "@ionic/vue";
import {mapActions, mapGetters} from "vuex";
import {Bee} from "@ethersphere/bee-js";

export default {
  name: "WelcomeUser",
  components: {
    ActionButton,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonContent,
    IonSpinner
  },
  emits: ['closeWelcomeUser'],
  data() {
    return {
      'username': '',
      'bios': '',
      'buyingBatch' : false
    }
  },
  methods: {
    async createFirstBios() {
      const biosInfo = {
        username: this.username,
        image: '',
        bios: this.bios,
        following: [],
        numberOfBeats: 0
      };
      await this.setBiosInfo(biosInfo);
      this.$emit('closeWelcomeUser');
    },
    async buyPostageStampBatch() {
      this.buyingBatch = true;
      const bee = new Bee(this.beeAddress);
      const postageBatchId = await bee.createPostageBatch("100", 17);
      this.setPostageBatchId(postageBatchId);
      this.buyingBatch = false;
    },
    close() {
      this.$emit('closeWelcomeUser');
    },
    ...mapActions([
      'setBiosInfo',
      'setPostageBatchId'
    ]),
  },
  computed: {
    ...mapGetters([
      'beeAddress',
      'beatTopic',
      'biosTopic',
      'loading',
      'logged',
      'postageBatchId'
    ]),
  }
}
</script>

<style scoped>

</style>
