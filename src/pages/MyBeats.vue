<template>
  <ion-page>
    <ion-content>
      <user-profile :username="userInfo.username"></user-profile>
      <beat
          v-for="beat in beatList"
          :key="beat.id"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
      ></beat>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import Beat from "../components/beats/Beat";
import UserProfile from "../components/layouts/UserProfile";
import {Bee, Utils} from "@ethersphere/bee-js";

export default {
  name: "MyBeats",
  components: {
    Beat,
    UserProfile,
    IonPage,
    IonContent
  },
  inject: [ 'beeAddress', 'beatTopic' ],
  data() {
    return {
      userInfo: {
        username: 'johnsmith'
      },
      beatList: []
    }
  },
  methods: {
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    }
  },
  async ionViewDidEnter() {
    const bee = new Bee(this.beeAddress);
    const signer = await this.signer();
    const beats = await bee.getJsonFeed(
        this.beatTopic,
        { signer: signer }
    );
    console.log('beats', beats);
    console.log('beatsLength', beats.length);
    if (beats.length > 0) {
      beats.sort(function(a, b) {
        return - ( a.id - b.id  ||  a.name.localeCompare(b.name) );
      });
      this.beatList = beats;
    }
  }
}
</script>

<style scoped>

</style>
