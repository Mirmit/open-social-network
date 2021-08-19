<template>
  <ion-row class="ion-justify-content-center">
      <ion-col size="3">
        <ion-avatar>
          <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
        </ion-avatar>
        <ion-label>{{ username }}</ion-label>
        <ion-button @click="toggleEditProfileVisible">Edit profile</ion-button>
      </ion-col>
  </ion-row>
  <edit-user-profile :class="{hidden: editProfileVisible}" @close-edit-profile="toggleEditProfileVisible"></edit-user-profile>
</template>

<script>
import {IonAvatar, IonLabel, IonCol, IonRow, IonButton} from "@ionic/vue";
import EditUserProfile from "./EditUserProfile";

export default {
  name: "ActionButton",
  components: {
    EditUserProfile,
    IonAvatar,
    IonLabel,
    IonCol,
    IonRow,
    IonButton
  },
  props: {
    username: String
  },
  data() {
    return {
      'editProfileVisible': false
    }
  },
  methods: {
    toggleEditProfileVisible() {
      this.editProfileVisible = !this.editProfileVisible;
    }
  }
}
</script>

<style scoped>
ion-row {
  margin-top: 20px;
}

</style>
