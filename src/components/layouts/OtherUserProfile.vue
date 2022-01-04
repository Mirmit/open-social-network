<template>
  <ion-card class="ion-text-center" style="margin-top:20px">
    <img :src="image" style="height:120px">
    <h2>{{ username }}</h2>
    <p>{{ bios }}</p>
    <p>{{ numberOfBeats }} beats</p>
    <ion-button @click="openCloseWall">
      {{ isWallOpen ? 'Close' : 'View' }} wall
    </ion-button>
    <ion-button @click="followOrUnfollow">
      {{ isFollowed ? 'Unfollow' : 'Follow' }}
    </ion-button>
    <ion-card-content v-if="isWallOpen">
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
import { IonButton, IonCard, IonCardContent } from "@ionic/vue";
import _ from "lodash";
import {mapActions, mapGetters} from "vuex";
import Beat from "../beats/Beat";

export default {
  name: "OtherUserProfile",
  components: {
    IonButton,
    IonCard,
    IonCardContent,
    Beat
  },
  props: {
    username: String,
    bios: String,
    image: String,
    numberOfBeats: Number,
    following: Array,
    author: String
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
      beatsInWall: null
    }
  },
  methods: {
    ...mapActions([
      'refreshBeats',
      'getBiosInfo'
    ]),
    async openCloseWall() {
      this.isWallOpen = !this.isWallOpen
      if (this.isWallOpen) {
        const numberOfFollowing = this.following ? this.following.length : 0
        this.beatList= {}
        for(let i = 0; i < numberOfFollowing; i++) {
          await this.refreshBeats({ethAddress: this.following[i], number: 10})
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
      await this.getBiosInfo();
      let biosInfo = this.biosInfo;
      if (this.isFollowed) {
        console.log('bios info before filter', this.biosInfo)
        biosInfo.following = this.biosInfo.following.filter( el => el !== this.author);
        console.log('bios info after filter', biosInfo)
      }
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
