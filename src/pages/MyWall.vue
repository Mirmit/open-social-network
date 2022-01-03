<template>
  <ion-page>
    <ion-content>
      <ion-card v-if="noBeats">
        <ion-card-header>
          <ion-card-subtitle>Start following someone to hear the beating</ion-card-subtitle>
        </ion-card-header>
      </ion-card>
      <beat
          v-for="beat in beats"
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
        await this.refreshBeats({ethAddress: this.biosInfo.following[i], number: 10});
      }
      this.orderedBeats = _.orderBy(this.beats, ['datetime'], ['desc']);
      this.noBeats = Object.keys(this.orderedBeats).length <= 0;
      this.setLoading(false);
    }
  }
}
</script>

<style scoped>

</style>
