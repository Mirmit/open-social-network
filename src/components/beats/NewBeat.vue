<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle color="primary">{{ author }} - {{ datetime }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-input placeholder="Write your beat" v-bind:value="content"
      ></ion-input>
      <p>{{ content }}</p>
    </ion-card-content>
    <action-button></action-button>
  </ion-card>
</template>

<script>
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle, IonInput } from "@ionic/vue";
import ActionButton from "../UI/ActionButton";

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
  }
}
</script>

<style scoped>
  .card-style {
    z-index: 5;
    opacity: 1;
  }
</style>
