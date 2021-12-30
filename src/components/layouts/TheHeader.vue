<template>
  <ion-header :translucent="true">
    <ion-toolbar :color="'primary'">
      <ion-title><h1>Open Social Network</h1></ion-title>
      <ion-button v-if="logged" @click="logoutAndRefresh" slot="end">
        <ion-icon :icon="logOutOutline"></ion-icon>
      </ion-button>
    </ion-toolbar>
    <the-tabs></the-tabs>
  </ion-header>
</template>

<script>
import { IonHeader, IonTitle, IonToolbar, IonIcon, IonButton } from "@ionic/vue";
import { logOutOutline, logInOutline } from 'ionicons/icons';
import TheTabs from "./TheTabs";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "TheHeader",
  components: {
    TheTabs,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButton
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
    logoutAndRefresh() {
      this.logout();
      window.location.reload();
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
