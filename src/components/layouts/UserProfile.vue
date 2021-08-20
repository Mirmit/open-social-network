<template>
  <ion-row class="ion-justify-content-center">
      <ion-col size="3">
        <ion-avatar>
          <img :src="image">
        </ion-avatar>
        <h2>{{ username }}</h2>
        <h3>Signer Adress</h3>
        <p>{{ bios }}</p>
        <ion-button @click="setOpen(true)">Edit profile</ion-button>
        <ion-modal
            :is-open="isOpen"
            css-class="my-custom-class"
            @didDismiss="setOpen(false)"
        >
          <edit-user-profile @close-edit-profile="setOpen(false)"></edit-user-profile>
        </ion-modal>
      </ion-col>
  </ion-row>
</template>

<script>
import {IonAvatar, IonCol, IonRow, IonButton, IonModal} from "@ionic/vue";
import EditUserProfile from "./EditUserProfile";

export default {
  name: "ActionButton",
  components: {
    EditUserProfile,
    IonAvatar,
    IonCol,
    IonRow,
    IonButton,
    IonModal
  },
  props: {
    username: String,
    bios: String,
    image: String
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
     // async presentModalEditProfile() {
     //    const modal = await modalController
     //    .create({
     //      component: EditUserProfile,
     //      // cssClass: 'my-custom-class',
     //      // componentProps: {
     //      //   title: 'New Title'
     //      // },
     //    })
     //    return modal.present();
     // }
  }
}
</script>

<style scoped>
ion-row {
  margin-top: 20px;
}

</style>
