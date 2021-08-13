<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-card-title>
        <ion-input placeholder="Title" v-model="title"
        ></ion-input>
      </ion-card-title>
      <ion-card-subtitle color="primary">{{ author }} - {{ datetime }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-input placeholder="Write your beat" v-model="content"
      ></ion-input>
    </ion-card-content>
    <action-button @custom-click="postBeat"></action-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput } from "@ionic/vue";
import ActionButton from "../UI/ActionButton";
import { Bee } from "@ethersphere/bee-js";
import { Utils } from '@ethersphere/bee-js';

export default {
  name: "NewBeat",
  inject: [
    'beeAddress',
    'beatTopic'
  ],
  components: {
    ActionButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonInput
  },
  data() {
    return {
      title: '',
      author: 'me',
      content: '',
      datetime: 'now'
    }
  },
  methods: {
    async postBeat() {
      const bee = new Bee(this.beeAddress);
      const topic = bee.makeFeedTopic(this.beatTopic);
      const signer = await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
      const postageBatchId = '1cf22a5a35a4f6b9d97831c3fb34b12fe4852875415d5744579bf0105ce9cc71';
      console.log(signer, topic);
      const oldBeats = await bee.getJsonFeed(
          this.beatTopic,
          { signer: signer }
      );
      console.log('oldBeats', oldBeats);
      const beats = oldBeats;
      console.log('beats', beats);
      const date = Date.now();
      console.log('date', date);
      const newBeatId = Math.max.apply(Math, oldBeats.map(function(o) { return o.id; })) + 1;
      const newBeat = {
        id: newBeatId,
        title: this.title,
        author: 'me',
        datetime: date,
        content: this.content
      };
      beats.push(newBeat)
      await bee.setJsonFeed(
          postageBatchId,
          this.beatTopic,
          beats,
          { signer: signer }
      );
      const newBeats = await bee.getJsonFeed(
          this.beatTopic,
          { signer: signer }
      );
      console.log(newBeats);
    }
  }
}
</script>

<style scoped>
  .card-style {
    z-index: 5;
    opacity: 1;
  }
</style>
