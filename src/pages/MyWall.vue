<template>
  <ion-page>
    <ion-content>
      <beat
          v-for="beat in beats"
          :key="beat.id"
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
import { IonPage , IonContent} from "@ionic/vue"
import Beat from "../components/beats/Beat";
import { Utils } from "@ethersphere/bee-js";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MyWall",
  inject: [
    'beeAddress',
    'beatTopic'
  ],
  components: {
    IonPage,
    IonContent,
    Beat
  },
  data() {
    return {
      // beatList: []
/*
      beatList: [
        {
          id: 3,
          title: 'third beat',
          author: 'me',
          datetime: 'now',
          content: 'I want to write my third beat'
        },
        {
          id: 2,
          title: 'second beat',
          author: 'me',
          datetime: 'now - 10 min',
          content: 'I want to write my second beat'
        },
        {
          id: 1,
          title: 'fist beat',
          author: 'me',
          datetime: 'now - 20 min',
          content: 'I want to write my first beat'
        },

      ]
*/
    }
  },
  computed: {
    ...mapGetters([
      'beats',
      'biosInfo',
      'registered'
    ]),
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
  async ionViewDidEnter() {
    if (this.registered) {
      this.setLoading(true);
      await this.getBiosInfo();
      const numberOfFollowing = this.biosInfo.following ? this.biosInfo.following.length : 0;
      console.log('array of following', this.biosInfo.following, numberOfFollowing);
      this.beatList= [];
      for(let i = 0; i < numberOfFollowing; i++) {
        console.log('followed inside for', this.biosInfo.following[i]);
        await this.refreshBeats({ethAddress: this.biosInfo.following[i], number: 10});
        // this.beatList = this.beatList.concat(this.beats);
      }
      // this.beatList.sort((a,b) => (a.datetime < b.datetime) ? 1 : ((b.datetime < a.datetime) ? -1 : 0))
      this.setLoading(false);
    }
  }
}
</script>

<style scoped>

</style>
