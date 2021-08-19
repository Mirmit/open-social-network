<template>
  <ion-card class="card-style">
    <ion-card-header>
      <ion-icon name="close" @click="closeEdit"></ion-icon>
      <ion-card-title>
        Edit profile
      </ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="stacked">Your username:</ion-label>
        <ion-input
            placeholder="username"
            v-model="username"
            type="text"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">More about you:</ion-label>
        <ion-input
            placeholder="bios info"
            v-model="biosInfo"
            type="text"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="stacked">Link to your picture:</ion-label>
        <ion-input
            placeholder="url"
            v-model="image"
            type="url"
        ></ion-input>
      </ion-item>
      <ion-list v-if="following.length > 0">
        <ion-list-header>
          <ion-label>Following</ion-label>
        </ion-list-header>
        <ion-item v-for="followed in following" v-bind:key="followed">
          <ion-label>{{ followed }}</ion-label>
        </ion-item>
      </ion-list>
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
  IonLabel,
  IonIcon,
  IonListHeader
} from "@ionic/vue";
import ActionButton from "../UI/ActionButton";

export default {
  name: "EditUserProfile",
  emits: [ 'closeEditProfile'],
  components: {
    ActionButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
    IonListHeader
  },
  data() {
    return {
      username: '',
      image: '',
      biosInfo: '',
      following: [
        '0x213',
        '0x123'
      ]
    }
  },
  methods: {
    updateProfile() {
      //update
      this.$emit('closeEditProfile');
    },
    closeEdit() {
      this.$emit('closeEditProfile');
    }
  }
}
</script>

<style scoped>

</style>
