<template>
  <ion-title v-if="!logged">You are new</ion-title>
  <ion-title v-else-if="logged">Welcome back</ion-title>
  <ion-content v-if="!logged">
    This is the first time you visit Open Social Network. You must initialize your account (just setting an username) in order to hear the network beating.

    First of all, lets connect to your bee node. If you don't have one available, start bzzzing with th following link:
    <a href="https://docs.ethswarm.org/docs/">Run your bee</a>
    If you want to learn more about Swarm and Bee:
    <a href="https://www.ethswarm.org">Learn more</a>
    <ion-item>
      <ion-label position="stacked">Bee node url (default http://localhost:1633):</ion-label>
      <ion-input
          placeholder="username"
          v-model="beeAddressToChange"
          value="http://localhost:1633"
      ></ion-input>
    </ion-item>
    <ion-item v-if="!beeNodeConnected">
      <action-button  @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
      <action-button @custom-click="saveBeeAddress" button-name="Change address"></action-button>
    </ion-item>
    <ion-item v-else>
      Connection successful
    </ion-item>
    <ion-content v-if="postageBatchId === ''">
      Before starting, you should buy some stamps. Click here to buy your first batch
      <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
      <ion-item v-else-if="buyingBatch">
        <ion-spinner name="dots"></ion-spinner>
        Buying some stamps
      </ion-item>
    </ion-content>
    <ion-content v-else>
      Fantastic, you have already bought some stamps. Your postage stamp batch id is:
      <ion-item>
        {{ postageBatchId }}
      </ion-item>
    </ion-content>
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
  <ion-content v-else-if="logged">
    <ion-item>
    <ion-label position="stacked">Bee node url (default http://localhost:1633):</ion-label>
    <ion-input
        placeholder="username"
        v-model="beeAddressToChange"
        value="http://localhost:1633"
    ></ion-input>
  </ion-item>
    <ion-item v-if="!beeNodeConnected">
      <action-button  @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
      <action-button @custom-click="saveBeeAddress" button-name="Change address"></action-button>
    </ion-item>
    <ion-item v-else>
      Connection successful
    </ion-item>
    <ion-content v-if="postageBatchId === ''">
      You should buy some post stamps. Click here to buy your first batch
      <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
      <ion-spinner v-else-if="buyingBatch" name="dots">Buying some stamps</ion-spinner>
    </ion-content>
    <ion-content v-else>
      Fantastic, you have already bought some stamps. Your postage stamp batch id is:
      {{ postageBatchId }}
      <action-button @custom-click="close" button-name="Close"></action-button>
    </ion-content>
  </ion-content>
  <ion-content v-else>
    You don't have Metamask or another ethereum wallet EIP-1193 compatible provider
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
      'buyingBatch' : false,
      'beeAddressToChange' : this.beeAddress
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
    saveBeeAddress() {
      this.setBeeAddress(this.beeAddressToChange);
    },
    ...mapActions([
      'setBiosInfo',
      'setPostageBatchId',
      'signer',
      'setBeeAddress',
      'checkBeeNodeConnected'
    ]),
  },
  computed: {
    ...mapGetters([
      'beeAddress',
      'beatTopic',
      'biosTopic',
      'loading',
      'logged',
      'postageBatchId',
      'beeNodeConnected'
    ]),
  }
}
</script>

<style scoped>

</style>
