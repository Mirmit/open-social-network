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
    <action-button @custom-click="postBeat" button-name="Beat"></action-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput } from "@ionic/vue";
import { Bee } from "@ethersphere/bee-js";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewBeat",
  emits: [ 'closeNewBeat' ],
  components: {
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
  computed: {
    ...mapGetters([
      'beeAddress',
      'postageBatchId',
      'beatTopic',
      'myBeats'
    ]),
  },
  methods: {
    async postBeat() {
      const beats = this.myBeats;
      const date = Date.now();
      const newBeatId = Math.max.apply(Math, beats.map(function(o) { return o.id; })) + 1;
      console.log('beats aasa', beats);
      const newBeat = {
        id: newBeatId,
        title: this.title,
        author: 'me',
        datetime: date,
        content: this.content
      };
      this.addNewBeat(newBeat);
      const bee = new Bee(this.beeAddress);
      const signer = await this.signer();
      await bee.setJsonFeed(
          this.postageBatchId,
          this.beatTopic,
          this.myBeats,
          { signer: signer }
      );
      this.$emit('closeNewBeat');
      console.log('myBeats from state', this.myBeats);
      await this.getMyBeats();
    },
    ...mapActions([
      'getMyBeats',
      'signer',
      'addNewBeat'
    ]),
  }
}
</script>

<style scoped>
  .card-style {
    z-index: 5;
    opacity: 1;
  }
</style>
