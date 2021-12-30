<template>
  <ion-card>
    <ion-card-header>
      <ion-item>
        <ion-avatar v-if="userImage" slot="start">
          <img :src="userImage">
        </ion-avatar>
        <ion-card-title>{{ title }}</ion-card-title>
      </ion-item>
        <ion-card-subtitle color="primary">{{ username }} - {{ dateFormatted }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      {{ content }}
      <ion-button slot="end" @click="replyOpen = !replyOpen">
        Reply
      </ion-button>
    </ion-card-content>
    <new-beat v-if="replyOpen" :reply-to="author + id">
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
  IonItem
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
    IonItem
  },
  props: {
    title: String,
    author: String,
    datetime: [ Number, String],
    content: String,
    id: Number,
    userImage: String,
    username: String
  },
  data() {
    return {
      replyOpen: false
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
    ]),
  },
  methods: {
    ...mapActions([
      'getBiosInfo'
    ])
  }
}
</script>

<style scoped>

</style>
