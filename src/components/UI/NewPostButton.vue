<template>
  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button>
      <ion-icon name="search-outline">how</ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonIcon, IonFabButton } from "@ionic/vue";

export default {
  name: "NewPostButton",
  components: {
    IonFab,
    IonIcon,
    IonFabButton
  }
}
</script>

<style scoped>

</style>
