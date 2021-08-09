<template>
  <ion-page>
    <ion-content>
      <beat
          v-for="beat in beatList"
          :key="beat.id"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
      ></beat>
      <new-post-button></new-post-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage , IonContent} from "@ionic/vue"
import Beat from "../components/beats/Beat";
import NewPostButton from "../components/UI/NewPostButton";
import {Utils} from "@ethersphere/bee-js";

export default {
  name: "MyWall",
  components: {
    IonPage,
    IonContent,
    Beat,
    NewPostButton
  },
  data() {
    return {
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
    }
  },
  methods: {
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    }
  },
  async ionViewDidEnter() {
    const signer = await this.signer();
    console.log('hey', signer);
  }
}
</script>

<style scoped>

</style>
