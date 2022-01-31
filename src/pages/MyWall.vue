<template>
  <ion-page>
    <ion-content>
      <ion-card v-if="noBeats">
        <ion-card-header>
          <ion-card-subtitle>Start following someone to hear the beating</ion-card-subtitle>
        </ion-card-header>
      </ion-card>
      <beat
          v-for="beat in myWallBeats"
          :key="beat.id"
          :id="beat.id"
          :username="beat.username"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
          :userImage="beat.userImage"
      ></beat>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage , IonContent, IonCardHeader, IonCardSubtitle, IonCard} from "@ionic/vue"
import Beat from "../components/beats/Beat";
import { Utils } from "@ethersphere/bee-js";
import {mapActions, mapGetters} from "vuex";
import _ from "lodash";
import router from "../router";

export default {
  name: "MyWall",
  inject: [
    'beeAddress',
    'beatTopic'
  ],
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    Beat
  },
  computed: {
    ...mapGetters([
      'beats',
      'biosInfo',
      'registered',
      'logged'
    ]),
  },
  data() {
    return {
      orderedBeats: {},
      myWallBeats: {},
      noBeats: false
    }
  },
  methods: {
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    },
    ...mapActions([
      'refreshBeats',
      'getBiosInfo',
      'setLoading'
    ]),
  },
  async ionViewWillEnter() {
    if (this.registered && this.logged) {
      this.setLoading(true);
      await this.getBiosInfo();
      const numberOfFollowing = this.biosInfo.following ? this.biosInfo.following.length : 0;
      this.beatList= [];
      for(let i = 0; i < numberOfFollowing; i++) {
        console.log('following', numberOfFollowing, this.biosInfo.following[i]);
        await this.refreshBeats({ethAddress: this.biosInfo.following[i], number: 10});
      }
      this.orderedBeats = _.orderBy(this.beats, ['datetime'], ['desc']);
      this.myWallBeats = this.orderedBeats.filter(beat => {
        return this.biosInfo.following.includes(beat.author)
      });
      this.noBeats = Object.keys(this.myWallBeats).length <= 0;
      this.setLoading(false);
    } else {
      await router.push({ name: 'MyBeats'})
    }
  }
}
</script>

<style scoped>

</style>
