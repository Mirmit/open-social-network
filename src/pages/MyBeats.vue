<template>
  <ion-page>
    <ion-content>
      <h2>My beats list</h2>
      <div>
        <h1>Fixed Content</h1>
      </div>
      <new-post-button></new-post-button>
    </ion-content>
  </ion-page>
</template>

<script>
import NewPostButton from "../components/UI/NewPostButton";
import { IonContent, IonPage } from "@ionic/vue";

export default {
  name: "MyBeats",
  components: {
    NewPostButton,
    IonPage,
    IonContent
  }
}
</script>

<style scoped>

</style>
