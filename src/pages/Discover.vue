<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Discover page</h1>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage , IonContent} from "@ionic/vue"

export default {
  name: "Discover",
  components: {
    IonPage,
    IonContent
  }
}
</script>

<style scoped>

</style>
