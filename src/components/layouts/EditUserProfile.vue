<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-card-title>
        Edit profile
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="stacked">Your username:</ion-label>
        <ion-input placeholder="username" v-model="username"></ion-input>
      </ion-item>
    </ion-card-content>
     <action-button @custom-click="updateProfile" button-name="Save"></action-button>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel
} from "@ionic/vue";

export default {
  name: "EditUserProfile",
  emits: [ 'closeEditProfile'],
  components: {
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonInput,
    IonItem,
    IonLabel
  },
  data() {
    return {
      username: '',
      image: '',
      biosInfo: '',
      following: []
    }
  },
  methods: {
    updateProfile() {
      this.$emit('closeEditProfile');
    }
  }
}
</script>

<style scoped>

</style>
