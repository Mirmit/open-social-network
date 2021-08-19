<template>
  <ion-row class="ion-justify-content-center">
      <ion-col size="3">
        <ion-avatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </ion-avatar>
        <ion-label>{{ username }}</ion-label>
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
import {IonAvatar, IonLabel, IonCol, IonRow, IonButton, IonModal} from "@ionic/vue";
import EditUserProfile from "./EditUserProfile";

export default {
  name: "ActionButton",
  components: {
    EditUserProfile,
    IonAvatar,
    IonLabel,
    IonCol,
    IonRow,
    IonButton,
    IonModal
  },
  props: {
    username: String
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
