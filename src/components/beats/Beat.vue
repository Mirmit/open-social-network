<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle color="primary">{{ author }} {{ datetime }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ content }}
    </ion-card-content>
  </ion-card>
</template>

<script>


import { IonCardHeader ,IonCardTitle, IonCardSubtitle, IonCardContent, IonCard } from "@ionic/vue";

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
    datetime: String,
    content: String
  }
}
</script>

<style scoped>

</style>
