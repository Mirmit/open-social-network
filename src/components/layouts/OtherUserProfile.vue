<template>
  <ion-loading
      :is-open="changingFollowStatus"
      cssClass="my-custom-class"
      message="Wait for signer..."
  ></ion-loading>
  <ion-card class="ion-text-center" style="margin-top:20px">
    <img :src="image" style="height:120px">
    <h2>{{ username }}</h2>
    <p>{{ bios }}</p>
    <p>({{ numberOfBeats }} beats)</p>
    <ion-button fill="outline" size="small" @click="followOrUnfollow">
      {{ isFollowed ? 'Unfollow' : 'Follow' }}
    </ion-button>
    <ion-button @click="openCloseWall" size="small" v-if="viewWall" >
      {{ isWallOpen ? 'Close' : 'View' }} wall
    </ion-button>
    <ion-card-content v-if="isWallOpen">
      <label>-- Welcome to {{username}}'s wall! --</label>
      <beat
          v-for="beat in beatsInWall"
          :key="beat.id"
          :id="beat.id"
          :username="beat.username"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
          :userImage="beat.userImage"
      ></beat>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {IonButton, IonCard, IonCardContent, IonLoading} from "@ionic/vue";
import _ from "lodash";
import {mapActions, mapGetters} from "vuex";
import Beat from "../beats/Beat";

export default {
  name: "OtherUserProfile",
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    Beat,
    IonLoading
  },
  props: {
    username: String,
    bios: String,
    image: String,
    numberOfBeats: Number,
    following: Array,
    author: String,
    viewWall: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters([
        'beats',
        'biosInfo'
    ]),
    isFollowed() {
      return this.biosInfo.following.find(el => el === this.author) !== undefined
    }
  },
  data() {
    return {
      isWallOpen: false,
      beatsInWall: null,
      changingFollowStatus: false
    }
  },
  methods: {
    ...mapActions([
      'refreshBeats',
      'setBiosInfo'
    ]),
    async openCloseWall() {
      this.isWallOpen = !this.isWallOpen
      if (this.isWallOpen) {
        const numberOfFollowing = this.following ? this.following.length : 0
        this.beatList= {}
        for(let i = 0; i < numberOfFollowing; i++) {
          await this.refreshBeats({ethAddress: this.following[i], number: 2})
          let addBeats = Object.fromEntries(Object.entries(this.beats).filter( beat => beat[1].author === this.following[i].toLowerCase()))
          this.beatList = {
            ...this.beatList,
            ...addBeats
          }
        }
        this.beatsInWall = _.orderBy(this.beatList, ['datetime'], ['desc'])
      }
    },
    async followOrUnfollow() {
      this.changingFollowStatus = true;
      let biosInfo = this.biosInfo;
      if (this.isFollowed) {
        biosInfo.following = biosInfo.following.filter( el => el !== this.author);
      } else {
        biosInfo.following.push(this.author);
      }
      await this.setBiosInfo(biosInfo);
      this.changingFollowStatus = false;
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
  font-size: 20px;
  color:black;
}
h3 {
  font-size: 16px
}

p{
  margin-top: 5px;
  margin-bottom: 5px;
}
ion-card{
  padding: 15px;
}

label{
  color:var(--ion-color-secondary-contrast)
}

</style>
