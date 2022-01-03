<template>
  <ion-card class="ion-text-center" style="margin-top:20px">
    <img :src="image" style="height:120px">
    <h2>{{ username }}</h2>
    <h3>Signer Address</h3>
    <p>{{ bios }}</p>
    <p>{{ numberOfBeats }} beats</p>
    <ion-button>
      Go to wall
    </ion-button>
  </ion-card>
</template>

<script>
import { IonButton, IonCard } from "@ionic/vue";

export default {
  name: "OtherUserProfile",
  components: {
    IonButton,
    IonCard
  },
  props: {
    username: String,
    bios: String,
    image: String,
    numberOfBeats: Number
  }
}
</script>

<style scoped>
ion-row {
  margin-top: 20px;
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
