<template>
  <ion-searchbar placeholder="paste an Eth address (0x...)" @keyup.enter="doSearch($event.target.value)"></ion-searchbar>
  <ion-item>
    <ion-label v-if="aSearchIsDone">Your search result is...</ion-label>
  </ion-item>
  <ion-spinner v-if="isloading"></ion-spinner>
  <other-user-profile v-if="searchedBiosInfo"
      :username="searchedBiosInfo.username"
      :bios="searchedBiosInfo.bios"
      :image="searchedBiosInfo.image"
      :number-of-beats="searchedBiosInfo.numberOfBeats"
      :following="searchedBiosInfo.following"
      :author="address"
  ></other-user-profile>
  <ion-item v-if="!isloading && !searchedBiosInfo && aSearchIsDone">
    <ion-label >There are no results for your search</ion-label>
  </ion-item>
</template>

<script>
import {IonSearchbar, toastController, IonLabel, IonSpinner, IonItem} from "@ionic/vue";
import {Utils} from "@ethersphere/bee-js";
import OtherUserProfile from "./OtherUserProfile";
import {mapActions} from "vuex";

export default {
  name: "TheUserSearch",
  components: {
    IonSearchbar,
    IonLabel,
    OtherUserProfile,
    IonSpinner,
    IonItem
  },
  data() {
    return {
      searchedBiosInfo: false,
      address: '',
      isloading: false,
      aSearchIsDone: false
    }
  },
  methods: {
    ...mapActions([
        'getBiosInfo'
    ]),
    async doSearch(address) {
      this.aSearchIsDone = true;
      this.isloading = true;
      if (Utils.isHexEthAddress(address)) {
        this.searchedBiosInfo = await this.getBiosInfo(address.toLowerCase());
        this.address = address;
        this.isloading = false;
      } else {
        const toast = await toastController
        .create({
          message: 'Invalid address: ' + address,
          duration: 2000,
          color: 'medium'
        });
        this.isloading = false;

        return toast.present();

      }

    }
  }
}
</script>

<style scoped>

</style>
