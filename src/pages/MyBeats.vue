<template>
  <ion-page>
    <ion-content>
      <user-profile
          :username="userInfo.username"
          :bios="userInfo.biosInfo"
      ></user-profile>
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
  inject: [ 'beeAddress', 'beatTopic', 'biosTopic' ],
  data() {
    return {
      userInfo: {
        username: '',
        bios: ''
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
    console.log('bee address', this.beeAddress);
    const bee = new Bee(this.beeAddress);
    const signer = await this.signer();
    try {
      const beats = await bee.getJsonFeed(
          this.beatTopic,
          { signer: signer }
      );
      const biosInfo = await bee.getJsonFeed(
          this.biosTopic,
          { signer: signer }
      );
      console.log('beats', beats);
      console.log('biosInfo', biosInfo);
      this.userInfo = biosInfo;
      if (beats.length > 0) {
        beats.sort(function(a, b) {
          return - ( a.id - b.id  ||  a.name.localeCompare(b.name) );
        });
        this.beatList = beats;
      }
    } catch(error) {
      console.log('custom error', error);
    }
  }
}
</script>

<style scoped>

</style>
