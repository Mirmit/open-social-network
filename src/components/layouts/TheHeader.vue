<template>
  <ion-header :translucent="true">
    <ion-toolbar :color="'primary'">
      <ion-title><h1>Open Social Network</h1></ion-title>
      <ion-button @click="resetState"></ion-button>
    </ion-toolbar>
    <the-tabs></the-tabs>
  </ion-header>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import TheTabs from "./TheTabs";
import {mapActions} from "vuex";

export default {
  name: "TheHeader",
  components: {
    TheTabs,
    IonHeader,
    IonTitle,
    IonToolbar
  },
  ...mapActions([
    'resetState',
  ]),
}
</script>

<style scoped>
ion-title {
  color: white
}
h1 {
  font-size: 20px
}
h2 {
  font-size: 20px
}
h3 {
  font-size: 16px
}
</style>
