<template>
  <ion-buttons>
    <ion-col>
      <ion-button router-link="/myBeats" expand="full">
        <ion-label>My Beats</ion-label>
      </ion-button>
    </ion-col>
    <ion-col>
      <ion-button router-link="/myWall" expand="full">
        <ion-label>My Wall</ion-label>
      </ion-button>
    </ion-col>
    <ion-col>
      <ion-button router-link="/discover" expand="full">
        <ion-label>Discover</ion-label>
      </ion-button>
    </ion-col>
  </ion-buttons>
</template>

<script>
import { IonButton, IonButtons, IonCol, IonLabel } from "@ionic/vue";

export default {
  name: "TheTabs",
  components: {
    IonButton,
    IonButtons,
    IonCol,
    IonLabel
  }
}
</script>

<style scoped>

</style>
