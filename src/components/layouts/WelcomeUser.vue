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
          placeholder="bios"
          v-model="bios"
      ></ion-input>
    </ion-item>
    <action-button @custom-click="createFirstBios" button-name="Start"></action-button>
  </ion-content>
</template>

<script>
import ActionButton from "../UI/ActionButton";
import { IonInput, IonItem, IonLabel, IonTitle, IonContent } from "@ionic/vue";
import {mapActions} from "vuex";

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
      'bios': ''
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
      await this.firstBeat();
      this.$emit('closeWelcomeUser');
    },
    ...mapActions([
      'setBiosInfo',
      'firstBeat'
    ]),
  }
}
</script>

<style scoped>

</style>
