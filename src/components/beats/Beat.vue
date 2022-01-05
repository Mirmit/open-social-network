<template>
  <ion-card>
    <ion-card-header v-if="replyToBeat">
      <ion-card-subtitle>Replies to</ion-card-subtitle>
      <beat
        :key="replyToBeat.id"
        :title="replyToBeat.title"
        :author="replyToBeat.author"
        :datetime="replyToBeat.datetime"
        :content="replyToBeat.content"
        :username="replyToBeat.username"
        :userImage="replyToBeat.userImage"
      >
      </beat>
    </ion-card-header>
    <ion-card-header>
      <ion-item>
        <ion-avatar v-if="userImage" slot="start">
          <img :src="userImage">
        </ion-avatar>
        <ion-card-title>{{ title }}</ion-card-title>
        <ion-button slot="end" @click="replyOpen = !replyOpen">
          Reply
        </ion-button>
      </ion-item>
        <ion-card-subtitle color="primary">{{ username }} - {{ dateFormatted }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      {{ content }}
    </ion-card-content>
    <ion-card-content v-if="hasReplies">
      <ion-card-subtitle @click="viewBeatDetail = !viewBeatDetail">Has replies</ion-card-subtitle>
      <div v-if="viewBeatDetail">
        <beat v-for="reply in replies"
              :key="reply.id"
              :title="reply.title"
              :author="reply.author"
              :datetime="reply.datetime"
              :content="reply.content"
              :username="reply.username"
              :userImage="reply.userImage"
        >
      </beat>
      </div>
    </ion-card-content>
    <new-beat v-if="replyOpen" :reply-to="author + id" @close-new-beat="replyOpen = !replyOpen">
    </new-beat>
  </ion-card>
</template>

<script>
import {
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonCard,
  IonAvatar,
  IonItem,
  IonButton
} from "@ionic/vue";
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import {mapActions, mapGetters} from "vuex";
import NewBeat from "./NewBeat";

export default {
  name: "Beat",
  components: {
    NewBeat,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonCard,
    IonAvatar,
    IonItem,
    IonButton
  },
  props: {
    title: String,
    author: String,
    datetime: [ Number, String],
    content: String,
    id: Number,
    userImage: String,
    username: String,
    replyTo: String
  },
  data() {
    return {
      replyOpen: false,
      replyToBeat: null,
      hasReplies: false,
      replies: null,
      viewBeatDetail: false
    }
  },
  computed: {
    dateFormatted() {
      if (typeof this.datetime === 'number') {
        dayjs.extend(relativeTime);

        return dayjs(this.datetime).fromNow();
      }

      return this.datetime;
    },
    ...mapGetters([
      'myEthAddress',
      'myBeats',
      'beats'
    ]),
  },
  methods: {
    ...mapActions([
      'getBiosInfo',
      'getOneBeat',
    ])
  },
  async mounted() {
    if (this.replyTo) {
      if (this.replyTo in this.beats) {
        this.replyToBeat = this.beats[this.replyTo];
      } else if (this.replyTo in this.myBeats) {
        this.replyToBeat = this.myBeats[this.replyTo];
      }
    }
    const beatId = this.author + this.id;
    // Look up for beat answers loaded in storage
    const replies1 = Object.fromEntries(Object.entries(this.beats).filter( beat => beat[1].replyTo === beatId))
    const replies2 = Object.fromEntries(Object.entries(this.myBeats).filter( beat => beat[1].replyTo === beatId))
    this.replies = {
      ...replies1,
      ...replies2
    }
    if (Object.keys(this.replies).length > 0) {
      this.hasReplies = true;
    }
  }
}
</script>

<style scoped>

</style>
