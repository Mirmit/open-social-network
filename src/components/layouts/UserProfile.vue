<template>
      <ion-avatar>
        <img :src="image">
      </ion-avatar>
      <ion-label>
        <h2>{{ username }}</h2>
        <h3>Signer Adress</h3>
        <p>{{ bios }}</p>
        <p>{{ numberOfBeats }} beats</p>
      </ion-label>
  <ion-button @click="setOpen(true)">Edit profile</ion-button>
  <ion-modal
      :is-open="isOpen"
      css-class="my-custom-class"
      @didDismiss="setOpen(false)"
  >
    <edit-user-profile @close-edit-profile="setOpen(false)"></edit-user-profile>
  </ion-modal>
</template>

<script>
import {IonAvatar, IonLabel, IonButton, IonModal} from "@ionic/vue";
import EditUserProfile from "./EditUserProfile";

export default {
  name: "ActionButton",
  components: {
    EditUserProfile,
    IonAvatar,
    IonLabel,
    IonButton,
    IonModal
  },
  props: {
    username: String,
    bios: String,
    image: String,
    numberOfBeats: Number
  },
  data() {
    return {
      'editProfileVisible': false,
      'isOpen': false,
    }
  },
  methods: {
    setOpen(value) {
      this.isOpen = value;
    }
  }
}
</script>

<style scoped>
ion-row {
  margin-top: 20px;
}

</style>
