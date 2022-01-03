<template>
  <div class="ion-text-center" style="margin-top:20px">
    <img :src="image" style="height:120px">
    <ion-label>
      <h2>{{ username }}</h2>
      <h3>Signer Address</h3>
      <p>{{ bios }}</p>
      <p>{{ numberOfBeats }} beats</p>
    </ion-label>
    <ion-button @click="setOpen(true)">Edit profile</ion-button>
  </div>
  <ion-modal
      :is-open="isOpen"
      css-class="my-custom-class"
      @didDismiss="setOpen(false)"
  >
    <edit-user-profile @close-edit-profile="setOpen(false)"></edit-user-profile>
  </ion-modal>
</template>

<script>
import { IonLabel, IonButton, IonModal} from "@ionic/vue";
import EditUserProfile from "./EditUserProfile";

export default {
  name: "UserProfile",
  components: {
    EditUserProfile,
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
