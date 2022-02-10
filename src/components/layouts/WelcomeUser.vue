<template>
  <ion-content>
    <ion-grid>
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
              <ion-text color="primary">1. Swarm node connection</ion-text><br><br>
              First of all, lets connect to your bee node. If you don't have one available,
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
                @change = "saveBeeAddress"
            ></ion-input>
          </ion-item>
          <div v-if="beeNodeConnected" style="margin-top:15px">
            <ion-text color="secondary" > Connection successful!!</ion-text>
          </div>
          <div v-if="changedNode || !beeNodeConnected">
            <action-button  class="btn-sm" @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
          </div>
          <ion-row v-if="postageBatchId === ''">
            <ion-col>
              <div class="ion-text-center">
                <p>
                  <ion-text color="primary">2. Post stamps</ion-text><br><br>
                  Now, you should buy some stamps. Click here to buy your first batch.
                </p>
                <ion-label position="stacked">Bee node debug url:</ion-label>
                <ion-input
                    v-model="beeAddressDebugUrl"
                    value="http://localhost:1635"
                ></ion-input>
                <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
                <ion-item v-else-if="buyingBatch">
                  <ion-spinner name="dots"></ion-spinner>
                  Buying some stamps. It can take some minutes...
                </ion-item>
              </div>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col>
              <div class="ion-text-center">
                <p>
                  <ion-text color="primary">2. Post stamps</ion-text>
                </p>
                <p>
                  Your postage stamp batch id is:<br>{{ postageBatchId }}<br>
                  <ion-text color="secondary">
                    <br>Fantastic, you have your stamps!!
                  </ion-text>
                </p>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <div class="ion-text-center">
                <p>
                  <ion-text color="primary">3. Your profile</ion-text><br><br>
                  Create your profile. Choose a username and tell something about you.<br>
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
            <ion-loading
                :is-open="loggingIn"
                cssClass="my-custom-class"
                message="Logging in..."
            ></ion-loading>
            <ion-button @click="loginAndClose" slot="end">
              Log in
            </ion-button>
            <p style="font-size: 12px">If you want to switch to another account, first clean your locally stored data.</p>
            <ion-loading
                :is-open="clearingData"
                cssClass="my-custom-class"
                message="Clearing stored data..."
            ></ion-loading>
            <ion-button @click="resetStateAndRefresh" color="light">
              Clear stored data
            </ion-button>
          </div>
        </ion-col>
        <ion-col v-else>
          <div class="ion-text-center">
            <h2><ion-text color="primary">Let's start!</ion-text></h2>
            <p>
              <ion-text color="primary">1. Swarm node connection</ion-text>
            </p>
            <ion-item>
              <ion-label position="stacked">Bee node url (default http://localhost:1633):</ion-label>
              <ion-input
                  placeholder="username"
                  v-model="beeAddressToChange"
                  value="http://localhost:1633"
                  @change = "saveBeeAddress"
              ></ion-input>
            </ion-item>
            <div v-if="beeNodeConnected" style="margin-top:15px">
              <ion-text color="secondary" > Connection successful!!</ion-text>
            </div>
            <div v-if="changedNode || !beeNodeConnected">
              <action-button  class="btn-sm" @custom-click="checkBeeNodeConnected" button-name="Check your node connection"></action-button>
            </div>
            <div v-if="!beeNodeConnected">
              <p>If you don't have one available, start bzzzing with the following link:</p>
              <a href="https://docs.ethswarm.org/docs/">Run your bee</a>
              <p>If you are new with Swarm and you want to learn more about Swarm and Bee</p>
              <a href="https://www.ethswarm.org">Learn more</a>
            </div>
          </div>
          <ion-row v-if="postageBatchId.length !== 64">
            <ion-col>
              <div class="ion-text-center">
                <p>
                  <ion-text color="primary"><br>2. Post stamps</ion-text>
                </p>
                <ion-label>You should buy some post stamps. Click here to buy your batch.<br><br></ion-label>
                <ion-label position="stacked">Bee node debug url:</ion-label>
                <ion-input
                    v-model="beeAddressDebugUrl"
                    value="http://localhost:1635"
                ></ion-input>
                <action-button v-if="!buyingBatch" @custom-click="buyPostageStampBatch" button-name="Buy batch"></action-button>
                <ion-spinner v-else-if="buyingBatch" name="dots">
                  Buying some stamps. It can take some minutes...
                </ion-spinner>
                <p>
                  If you already have a batchId, paste it:
                </p>
                <ion-item>
                  <ion-label position="stacked">Stamps batch id:</ion-label>
                  <ion-input
                      placeholder="batchId"
                      v-model="postageBatchIdToChange"
                  ></ion-input>
                </ion-item>
                <action-button @custom-click="saveBatchId" button-name="Save batchId"></action-button>
              </div>
            </ion-col>
          </ion-row>
          <ion-row v-else>
            <ion-col>
              <div class="ion-text-center">
                <p>
                  <ion-text color="primary">2. Post stamps</ion-text>
                </p>
                <p>
                   Your postage stamp batch id is:<br>{{ postageBatchId }}<br>
                  <ion-text color="secondary">
                    <br>Fantastic, you have your stamps!!
                  </ion-text>
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
    </ion-grid>
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
  IonTextarea,
  IonButton,
  IonLoading,
  toastController,
  IonGrid
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
    IonTextarea,
    IonButton,
    IonLoading,
    IonGrid
  },
  emits: ['closeWelcomeUser'],
  data() {
    return {
      'username': '',
      'bios': '',
      'buyingBatch' : false,
      'beeAddressToChange' : this.beeAddress,
      'postageBatchIdToChange': this.postageBatchId,
      'clearingData':false,
      'loggingIn':false,
      'beeAddressDebugUrl': 'http://localhost:1635',
      'changedNode': false
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
      const bee = new Bee(this.beeAddressDebugUrl);
      try {
        const postageBatchId = await bee.createPostageBatch("100", 17);
        this.setPostageBatchId(postageBatchId);
      } catch (error) {
        console.log('error buying postage batch', error)
        const toast = await toastController
        .create({
          message: error.message,
          duration: 2000,
          color: 'medium'
        })
        this.buyingBatch = false;
        return toast.present();
      }
      this.buyingBatch = false;
    },
    async loginAndClose() {
      this.loggingIn = true;
      await this.login();
      this.loggingIn = false;
    },
    close() {
      this.$emit('closeWelcomeUser');
    },
    saveBeeAddress() {
      this.setBeeAddress(this.beeAddressToChange);
      this.changedNode = true;
    },
    async saveBatchId() {
      if (this.postageBatchIdToChange.length === 64) {
        this.setPostageBatchId(this.postageBatchIdToChange);
      } else {
        const toast = await toastController
        .create({
          message: 'Invalid postage batch id: ' + this.postageBatchIdToChange,
          duration: 2000,
          color: 'medium'
        })
        return toast.present();
      }
    },
    resetStateAndRefresh() {
      this.clearingData = true;
      this.resetState();
      this.clearingData = false;
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
ion-grid{
  padding:20px;
  padding-top:30px
}
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
