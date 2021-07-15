<template>
  <ion-header :translucent="true">
    <ion-toolbar :color="'primary'">
      <ion-title>Open Social Network</ion-title>
    </ion-toolbar>
    <the-tabs></the-tabs>
  </ion-header>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar } from "@ionic/vue";
import TheTabs from "./TheTabs";

export default {
  name: "TheHeader",
  components: {
    TheTabs,
    IonHeader,
    IonTitle,
    IonToolbar
  }
}
</script>

<style scoped>
ion-title {
  color: white
}
</style>
