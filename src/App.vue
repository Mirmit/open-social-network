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
  <ion-loading
    :is-open="loading"
    cssClass="my-custom-class"
    message="Please wait..."
>
</ion-loading>
</template>

<script>
import {IonApp, IonRouterOutlet, IonHeader, IonContent, IonModal, IonLoading } from '@ionic/vue';
import { defineComponent } from 'vue';
import TheHeader from "./components/layouts/TheHeader";
import NewPostButton from "./components/UI/NewPostButton";
import NewBeat from "./components/beats/NewBeat";
import WelcomeUser from "./components/layouts/WelcomeUser";
import {mapActions, mapGetters} from "vuex";
import {Bee} from "@ethersphere/bee-js";

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
    IonModal,
    IonLoading
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
    async checkIfUserHasRegistered() {
      try {
        const bee = new Bee(this.beeAddress);
        const signer = await this.signer();
        if (signer) {
          await bee.getJsonFeed(
              this.biosTopic,
              { signer: signer }
          );
          this.setRegistered(true);

          return true;
        } else {
          alert('You don\'t have Metamask or another ethereum wallet EIP-1193 compatible provider');
        }
      } catch(error) {
        console.log('custom error in retriveing bios info in checkIfUSerHasRegistered', error);

        return false;
      }
    },
    setModalOpen(value) {
      this.isModalOpen = value;
    },
    ...mapActions([
      'setBiosInfo',
      'getBiosInfo',
      'setLoading',
      'signer',
      'setRegistered',
      'setPostageBatchId'
    ]),
    async checkUserStatus() {
      this.setLoading(true);
      const userHasRegistered = await this.checkIfUserHasRegistered();
      const userHasPostageStamps = this.postageBatchId !== '';
      //check if user has already registered on the network"
      if (userHasRegistered && userHasPostageStamps) {
        this.setModalOpen(false);
      } else {
        this.setModalOpen(true);
      }
      this.setLoading(false);
    }
  },
  async created() {
    await this.checkUserStatus();
  },
  computed: {
    shadow() {
      if (this.loading || !this.newBeatHidden) {
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
      'loading',
      'registered',
      'postageBatchId'
    ]),
  }
});
</script>

<style scoped>
.hidden {
  display: none;
}

</style>
