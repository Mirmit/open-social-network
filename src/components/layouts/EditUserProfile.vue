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
            v-model="bios"
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
      <ion-item>
        <ion-label position="stacked">Follow beater:</ion-label>
        <ion-input
            placeholder="address"
            v-model="newFollower"
            type="text"
        ></ion-input>
      </ion-item>
      <ion-list v-if="following.length > 0">
        <ion-list-header>
          <ion-label>Following</ion-label>
        </ion-list-header>
        <ion-item v-for="followed in following" v-bind:key="followed">
          <ion-label>{{ followed }}</ion-label>
          <ion-icon name="close" @click="stopFollowing(followed)"></ion-icon>
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
  IonListHeader,
  IonList
} from "@ionic/vue";
import ActionButton from "../UI/ActionButton";
import {mapActions, mapGetters} from "vuex";

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
    IonListHeader,
    IonList
  },
  data() {
    return {
      username: '',
      image: '',
      bios: '',
      following: [],
      newFollower: '',
      numberOfBeats: 0
    }
  },
  computed: {
    ...mapGetters([
      'biosInfo',
      'myBeats'
    ]),
  },
  methods: {
    async updateProfile() {
      let newFollowing = this.following;
      if (!newFollowing) {
        newFollowing = [];
      }
      if (this.newFollower) {
        newFollowing.push(this.newFollower);
      }
      const biosInfo = {
        username: this.username,
        image: this.image,
        bios: this.bios,
        following: newFollowing,
        numberOfBeats: this.numberOfBeats
      };
      console.log(biosInfo);
      //update
      await this.setBiosInfo(biosInfo);
      this.$emit('closeEditProfile');
    },
    stopFollowing(followed) {
      console.log('enter');
      console.log('first follwing', followed, this.following);
      const newFollowing = this.following;
      this.following = newFollowing.filter(followedInArray => {
        console.log(followedInArray, followed, followedInArray !== followed);
        return followedInArray != followed;
      });
      console.log('last follwing', followed, newFollowing);
    }
    ,
    closeEdit() {
      this.$emit('closeEditProfile');
    },
    ...mapActions([
      'setBiosInfo',
      'getBiosInfo'
    ]),
  },
  async beforeCreate() {
    await this.getBiosInfo;
    this.username = this.biosInfo.username;
    this.image = this.biosInfo.image;
    this.bios = this.biosInfo.bios;
    this.following = this.biosInfo.following;
    this.numberOfBeats = this.biosInfo.numberOfBeats;
  }
}
</script>

<style scoped>

</style>
