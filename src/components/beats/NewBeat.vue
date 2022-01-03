<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-card-title>
        <ion-header v-if="replyTo !== ''">
          Reply:
        </ion-header>
        <ion-input placeholder="Title" v-model="title"></ion-input>
      </ion-card-title>
      <ion-card-subtitle color="primary">{{ author }} - {{ datetime }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-input placeholder="Write your beat" v-model="content"
      ></ion-input>
    </ion-card-content>
    <div class="ion-text-center">
      <action-button @custom-click="postBeat" button-name="Beat"></action-button>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput, IonHeader } from "@ionic/vue";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "NewBeat",
  emits: [ 'closeNewBeat' ],
  props: {
    replyTo: {
      default: '',
      type: String
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonInput,
    IonHeader
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
      'myBeats',
      'biosInfo',
      'myEthAddress'
    ]),
  },
  methods: {
    async postBeat() {
      this.waitForSigner();
      const beats = this.myBeats;
      const date = Date.now();
      const newBeatId = this.biosInfo.numberOfBeats + 1;
      console.log('beats aasa', beats);
      const newBeat = {
        id: newBeatId,
        title: this.title,
        author: this.myEthAddress,
        datetime: date,
        content: this.content
      };
      if (this.replyTo !== '') {
        newBeat.replyTo = this.replyTo;
      }
      await this.addNewBeat(newBeat);
      this.waitForSigner(false);
      await this.refreshMyBeats();
      this.$emit('closeNewBeat');
      this.title = '';
      this.content = '';
    },
    ...mapActions([
      'signer',
      'addNewBeat',
      'waitForSigner',
      'refreshMyBeats'
    ]),
  }
}
</script>

<style scoped>
  .card-style {
    z-index: 5;
    opacity: 1;
    padding-bottom: 20px;
  }
</style>
