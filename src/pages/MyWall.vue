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
  computed: {
    ...mapGetters([
      'beats',
      'biosInfo',
      'registered',
      'logged'
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
    if (this.registered && this.logged) {
      this.setLoading(true);
      await this.getBiosInfo();
      const numberOfFollowing = this.biosInfo.following ? this.biosInfo.following.length : 0;
      console.log('array of following', this.biosInfo.following, numberOfFollowing);
      this.beatList= [];
      for(let i = 0; i < numberOfFollowing; i++) {
        await this.refreshBeats({ethAddress: this.biosInfo.following[i], number: 10});
      }
      this.setLoading(false);
    }
  }
}
</script>

<style scoped>

</style>
