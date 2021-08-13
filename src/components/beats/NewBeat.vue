<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
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
      title: 'New beat',
      author: 'me',
      content: '',
      datetime: 'now'
    }
  },
  methods: {
    async postBeat() {
      const bee = new Bee('http://localhost:1633');
      const topic = bee.makeFeedTopic('opensocialnetwork.eth/beats');
      const signer = await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
      const postageBatchId = '1cf22a5a35a4f6b9d97831c3fb34b12fe4852875415d5744579bf0105ce9cc71';
      console.log(signer, topic);
      const oldBeats = await bee.getJsonFeed(
          'opensocialnetwork.eth/beats',
          { signer: signer }
      );
      console.log('oldBeats', oldBeats);
      const beats = oldBeats;
      console.log('beats', beats);
      const newBeatId = Math.max.apply(Math, oldBeats.map(function(o) { return o.id; })) + 1;
      const newBeat = {
        id: newBeatId,
        title: 'My title',
        author: 'me',
        datetime: 'write datetime',
        content: this.content
      };
      beats.push(newBeat)
      await bee.setJsonFeed(
          postageBatchId,
          'opensocialnetwork.eth/beats',
          beats,
          { signer: signer }
      );
      const newBeats = await bee.getJsonFeed(
          'opensocialnetwork.eth/beats',
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
