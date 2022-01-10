<template>
  <ion-header :translucent="true">
    <ion-toolbar :color="'primary'">
      <ion-title><h1>Open Social Network</h1></ion-title>
      <ion-button v-if="logged" @click="logoutAndRefresh" slot="end">
        <ion-icon :icon="logOutOutline"></ion-icon>
      </ion-button>
    </ion-toolbar>
    <the-tabs>
    </the-tabs>
  </ion-header>
  <ion-loading
      :is-open="loggingOut"
      cssClass="my-custom-class"
      message="Logging out..."
  ></ion-loading>
</template>

<script>
import {IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonLoading} from "@ionic/vue";
import { logOutOutline, logInOutline } from 'ionicons/icons';
import TheTabs from "./TheTabs";
import {mapActions, mapGetters} from "vuex";
import router from "../../router";

export default {
  name: "TheHeader",
  components: {
    TheTabs,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton,
    IonLoading
  },
  data() {
    return {
      loggingOut: false,
    }
  },
  computed: {
    ...mapGetters([
      'logged'
    ])
  }
  ,
  methods: {
    ...mapActions([
      'emptyBiosInfo',
      'setMyEthAddress',
      'setLogged',
      'signer',
      'getBiosInfo',
      'logout'
    ]),
    async logoutAndRefresh() {
      this.loggingOut = true;
      await this.logout();
      await router.push({ name: 'MyWall'})
      window.location.reload();
      this.loggingOut = false;
    }
  },
  setup() {
    return { logOutOutline, logInOutline };
  },
}
</script>

<style scoped>
ion-title {
  color: white
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
</style>
