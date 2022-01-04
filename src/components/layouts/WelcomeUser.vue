<template>
  <ion-content>
    <ion-row>
      <ion-col>
        <div class="ion-text-center">
          <h1 v-if="!registered">Welcome to  <ion-text color="primary">Open Social Network</ion-text></h1>
          <h1 v-else-if="registered">Welcome back to <ion-text  color="primary">Open Social Network</ion-text></h1>
          <p>A <b>censorship-resistant</b>,<br> <b>permissionless</b> and <b>descentralized</b><br> social media platform based on Swarm. <br>Not based on the extractive attention economy.</p>
        </div>
      </ion-col>
    </ion-row>
    <ion-row v-if="!registered">
      <ion-col>
        <div class="ion-text-center">
          <h2><ion-text color="primary">Let's start!</ion-text></h2>
          <p>
            This is the first time you visit Open Social Network and you must initialize your account (just setting a username)
            in order to hear the network beating. <br><br>
            <ion-text color="primary">1. </ion-text><br>First of all, lets connect to your bee node. If you don't have one available,
            start bzzzing with the following link:
          </p>
          <a href="https://docs.ethswarm.org/docs/">Run your bee</a>
          <p>If you are new with Swarm and you want to learn more about Swarm and Bee</p>
          <a href="https://www.ethswarm.org">Learn more</a>
        </div>
        <p>Check your node connection entering your node url. </p>
        <ion-item>
          <ion-label position="stacked">Bee node url (default http://localhost:1633):</ion-label>
          <ion-input
              placeholder="username"
              v-model="beeAddressToChange"
              value="http://localhost:1633"
          ></ion-input>
        </ion-item>
        <ion-item v-if="!beeNodeConnected">
          <action-button  @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
          <action-button @custom-click="saveBeeAddress" button-name="Change address"></action-button>
        </ion-item>
        <ion-item v-else>
          Connection successful
        </ion-item>
        <ion-row v-if="postageBatchId === ''">
          <ion-col>
            <div class="ion-text-center">
              <p>
                <ion-text color="primary">2. </ion-text><br>
                Now, you should buy some stamps. Click here to buy your first batch</p>
              <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
              <ion-item v-else-if="buyingBatch">
                <ion-spinner name="dots"></ion-spinner>
                Buying some stamps
              </ion-item>
            </div>
          </ion-col>
        </ion-row>
        <ion-row v-else>
          <ion-col>
            <p>Fantastic, you have already bought some stamps. Your postage stamp batch id is:</p>
            <ion-item>
              {{ postageBatchId }}
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div class="ion-text-center">
              <p>
                <ion-text color="primary">3. </ion-text><br>
                Create your profile. Choose a username and tell something about you.
                Open Social Network is designed to keep your anonymity, choose properly what you want to explain about you.
              </p>
              <ion-item>
                <ion-label position="stacked">Username:</ion-label>
                <ion-input
                    placeholder="username"
                    v-model="username"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Something about you:</ion-label>
                <ion-textarea
                    placeholder="bios"
                    v-model="bios"
                ></ion-textarea>
              </ion-item>
              <action-button @custom-click="createFirstBios" button-name="Start"></action-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
    <ion-row v-else-if="registered">
      <ion-col v-if="!logged">
        <div class="ion-text-center">
          <h2><ion-text color="primary">Log in</ion-text></h2>
          <ion-button @click="loginAndClose" slot="end">
            <ion-icon :icon="logInOutline"></ion-icon>
          </ion-button>
          <ion-button @click="resetStateAndRefresh" slot="end">
            Reset state
          </ion-button>
        </div>
      </ion-col>
      <ion-col v-else>
        <div class="ion-text-center">
          <h2><ion-text color="primary">Let's start!</ion-text></h2>
          <p>
            <ion-text color="primary">1. </ion-text><br>Check your Swarm node connection.
          </p>
          <ion-item>
            <ion-label position="stacked">Bee node url (default http://localhost:1633):</ion-label>
            <ion-input
                placeholder="username"
                v-model="beeAddressToChange"
                value="http://localhost:1633"
            ></ion-input>
          </ion-item>
          <ion-item v-if="!beeNodeConnected">
            <action-button  @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
            <action-button @custom-click="saveBeeAddress" button-name="Change address"></action-button>
          </ion-item>
          <ion-item v-else>
            Connection successful
          </ion-item>
          <p>If you don't have one available, start bzzzing with the following link:</p>
          <a href="https://docs.ethswarm.org/docs/">Run your bee</a>
          <p>If you are new with Swarm and you want to learn more about Swarm and Bee</p>
          <a href="https://www.ethswarm.org">Learn more</a>
        </div>
        <ion-row v-if="postageBatchId === ''">
          <ion-col>
            <div class="ion-text-center">
              <p>
                <ion-text color="primary">2. </ion-text><br>You should buy some post stamps. Click here to buy your batch.
              </p>
              <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
              <ion-spinner v-else-if="buyingBatch" name="dots">Buying some stamps</ion-spinner>
            </div>
          </ion-col>
        </ion-row>
        <ion-row v-else>
          <ion-col>
            <div class="ion-text-center">
              <p>
                Fantastic, you have already bought some stamps. Your postage stamp batch id is:
                {{ postageBatchId }}
              </p>
              <action-button @custom-click="close" button-name="Start"></action-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-col>
    </ion-row>
    <ion-row v-else>
      <ion-col >
        <p>You don't have Metamask or another ethereum wallet EIP-1193 compatible provider.</p>
      </ion-col>
    </ion-row>
  </ion-content>
</template>

<script>
import ActionButton from "../UI/ActionButton";
import {logInOutline} from 'ionicons/icons';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonContent,
  IonSpinner,
  IonRow,
  IonCol,
  IonIcon,
  IonTextarea,
  IonButton
} from "@ionic/vue";
import {mapActions, mapGetters} from "vuex";
import {Bee} from "@ethersphere/bee-js";

export default {
  name: "WelcomeUser",
  components: {
    ActionButton,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
    IonContent,
    IonSpinner,
    IonRow,
    IonCol,
    IonIcon,
    IonTextarea,
    IonButton
  },
  emits: ['closeWelcomeUser'],
  data() {
    return {
      'username': '',
      'bios': '',
      'buyingBatch' : false,
      'beeAddressToChange' : this.beeAddress
    }
  },
  methods: {
    async createFirstBios() {
      const biosInfo = {
        username: this.username,
        image: '',
        bios: this.bios,
        following: [],
        numberOfBeats: 0
      };
      await this.setBiosInfo(biosInfo);
      await this.loginAndClose();
      this.$emit('closeWelcomeUser');
    },
    async buyPostageStampBatch() {
      this.buyingBatch = true;
      const bee = new Bee(this.beeAddress);
      const postageBatchId = await bee.createPostageBatch("100", 17);
      this.setPostageBatchId(postageBatchId);
      this.buyingBatch = false;
    },
    async loginAndClose() {
      this.close();
      await this.login();
      window.location.reload();
    },
    close() {
      this.$emit('closeWelcomeUser');
    },
    saveBeeAddress() {
      this.setBeeAddress(this.beeAddressToChange);
    },
    resetStateAndRefresh() {
      this.resetState();
      window.location.reload();
    },
    ...mapActions([
      'setBiosInfo',
      'setPostageBatchId',
      'signer',
      'setBeeAddress',
      'checkBeeNodeConnected',
      'login',
      'resetState'
    ]),
  },
  computed: {
    ...mapGetters([
      'beeAddress',
      'beatTopic',
      'biosTopic',
      'loading',
      'registered',
      'postageBatchId',
      'beeNodeConnected',
      'logged'
    ]),
  },
  setup() {
    return { logInOutline };
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px
}
h2 {
  font-size: 20px
}
h3 {
  font-size: 16px
}
a{
  font-color: primary
}

</style>
