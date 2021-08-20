<template>
  <ion-app>
    <ion-header :style="shadow">
      <the-header></the-header>
    </ion-header>
    <ion-content>
      <ion-router-outlet :style="shadow"/>
      <new-post-button @custom-click="openCloseNewBeat" :style="shadow"></new-post-button>
      <new-beat :class="{hidden: newBeatHidden}" @close-new-beat="openCloseNewBeat"></new-beat>
      <ion-modal
          :is-open="isModalOpen"
          css-class="my-custom-class"
          @didDismiss="setModalOpen(false)"
      >
        <welcome-user @close-welcome-user="setModalOpen(false)"></welcome-user>
      </ion-modal>
    </ion-content>
  </ion-app>
</template>

<script>
import {IonApp, IonRouterOutlet, IonHeader, IonContent, IonModal} from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";
import { Bee, Utils } from '@ethersphere/bee-js';
import NewPostButton from "./components/UI/NewPostButton";
import NewBeat from "./components/beats/NewBeat";
import WelcomeUser from "./components/layouts/WelcomeUser";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'App',
  components: {
    WelcomeUser,
    NewBeat,
    IonApp,
    IonRouterOutlet,
    TheHeader,
    IonHeader,
    IonContent,
    NewPostButton,
    IonModal
  },
  provide: {
    beeAddress: 'http://localhost:1633',
    beatTopic: 'opensocialnetwork.eth/beats',
    biosTopic: 'opensocialnetwork.eth/beater',
    postageBatchId: '18b343cbc3d0abf3232b6287a47754314c3264f9d6ffa89cc4294a8b7f85bfb7'
  },
  data() {
    return {
      newBeatHidden: true,
      isModalOpen: false
    }
  },
  methods: {
    openCloseNewBeat() {
      this.newBeatHidden = !this.newBeatHidden;
    },
    initializeUser() {
      //make first empty beats and basic user bios if userIsStill not in swarm
    },
    async signer() {
      return await Utils.Eth.makeEthereumWalletSigner(window.ethereum);
    },
    async checkIfUserHasRegistered() {
      let http = new XMLHttpRequest();
      const bee = new Bee(this.beeAddress);
      const signer = Utils.Eth.makeHexEthAddress((await this.signer()).address);
      const url = this.beeAddress + '/feeds/' + signer + '/' + bee.makeFeedTopic(this.biosTopic);
      await http.open('GET' ,url ,true);
      http.send();
      return http.status === 404;
    },
    setModalOpen(value) {
      this.isModalOpen = value;
    }
  },
  async created() {
    // const signer = await this.signer();
    // const bee = new Bee(this.beeAddress);
    const userHasRegistered = await this.checkIfUserHasRegistered();
    //check if user has already registered on the network. If not, make first beat "[]" and profile info "{ username: "username}"
    if (userHasRegistered) {
      this.setModalOpen(true);
    } else {
      this.setModalOpen(false);
    }
  },
  computed: {
    shadow() {
      if (this.signer === '' || !this.newBeatHidden) {
        return {
          opacity: 0.6
        }
      } else {
        return {
          opacity: 1
        }
      }
    },
    ...mapGetters([
      'beeAddress',
      'beatTopic',
      'biosTopic',
    ]),
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
