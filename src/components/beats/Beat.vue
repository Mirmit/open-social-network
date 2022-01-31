<template>
  <ion-card>
    <ion-card-header v-if="replyToBeat">
      <ion-card-subtitle color="primary">Replies to</ion-card-subtitle>
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
    <ion-card-content>
      <ion-row>
        <ion-col size="4" style="display: flex; justify-content: center">
          <ion-avatar v-if="userImage" >
            <img :src="userImage">
          </ion-avatar>
        </ion-col>
        <ion-col size="8">
          <ion-card-subtitle color="primary" style="padding-bottom:10px">{{ username }} - {{ dateFormatted }}</ion-card-subtitle>
          <ion-card-title>{{ title }}</ion-card-title>
          <p style="color:black;margin-top:5px">{{ content }}</p>
        </ion-col>
      </ion-row>
     <ion-row>
        <ion-col size="10" style="display: flex">
          <ion-icon v-if="hasReplies" @click="viewBeatDetail = !viewBeatDetail" color="primary" :icon="chatbubbles" style="font-size:25px"></ion-icon>
        </ion-col>
        <ion-col col="2" style="display: flex">
          <ion-icon @click="replyOpen = !replyOpen" color="secondary" :icon="heartCircle" style="font-size:30px"></ion-icon>
        </ion-col>
      </ion-row>
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
  IonIcon,
  IonRow,
  IonCol
} from "@ionic/vue";
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import {mapActions, mapGetters} from "vuex";
import NewBeat from "./NewBeat";
import {chatbubbles, heartCircle} from 'ionicons/icons';

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
    IonIcon,
    IonRow,
    IonCol
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
    checkForReplies() {
      if (this.replyTo) {
        if (this.replyTo in this.beats) {
          this.replyToBeat = this.beats[this.replyTo];
        } else if (this.replyTo in this.myBeats) {
          this.replyToBeat = this.myBeats[this.replyTo];
        }
      }
      const beatId = this.author + this.id;
      // Look up for beat answers loaded in storage
      const replies1 = Object.fromEntries(Object.entries(this.beats).filter(beat => beat[1].replyTo === beatId))
      const replies2 = Object.fromEntries(Object.entries(this.myBeats).filter(beat => beat[1].replyTo === beatId))
      this.replies = {
        ...replies1,
        ...replies2
      }
      if (Object.keys(this.replies).length > 0) {
        this.hasReplies = true;
      }
    },
    ...mapActions([
      'getBiosInfo',
      'getOneBeat',
    ])
  },
  watch: {
    beats: {
      handler(){
        this.checkForReplies();
      },
      deep: true
    },
    myBeats: {
      handler(){
        this.checkForReplies();
      },
      deep: true
    },
  },
  async mounted() {
    this.checkForReplies();
  },
  setup(){
    return { chatbubbles, heartCircle};
  },
}
</script>

<style scoped>
ion-card-title{
  font-size:16px;
  font-weight: bold;
}
ion-card-content{
  padding-bottom:0px
}
</style>
