<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle color="primary">{{ author }} - {{ dateFormatted }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ content }}
    </ion-card-content>
  </ion-card>
</template>

<script>
import { IonCardHeader ,IonCardTitle, IonCardSubtitle, IonCardContent, IonCard } from "@ionic/vue";
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  name: "Beat",
  components: {
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonCard
  },
  props: {
    title: String,
    author: String,
    datetime: [ Number, String],
    content: String
  },
  computed: {
    dateFormatted: function () {
      if (typeof this.datetime === 'number') {
        dayjs.extend(relativeTime);

        return dayjs(this.datetime).fromNow();
      }

      return this.datetime;
    }
  }
}
</script>

<style scoped>

</style>
