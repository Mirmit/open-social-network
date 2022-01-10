<template>
  <ion-searchbar placeholder="paste an Eth address (0x...)" @keyup.enter="doSearch($event.target.value)"></ion-searchbar>
  <other-user-profile v-if="searchedBiosInfo"
      :username="searchedBiosInfo.username"
      :bios="searchedBiosInfo.bios"
      :image="searchedBiosInfo.image"
      :number-of-beats="searchedBiosInfo.numberOfBeats"
      :following="searchedBiosInfo.following"
      :author="name"
  ></other-user-profile>
</template>

<script>
import {IonSearchbar, toastController} from "@ionic/vue";
import {Utils} from "@ethersphere/bee-js";
import OtherUserProfile from "./OtherUserProfile";
import {mapActions} from "vuex";

export default {
  name: "TheUserSearch",
  components: {
    IonSearchbar,
    OtherUserProfile
  },
  data() {
    return {
      searchedBiosInfo: false,
      address: ''
    }
  },
  methods: {
    ...mapActions([
        'getBiosInfo'
    ]),
    async doSearch(address) {
      if (Utils.Eth.isHexEthAddress(address)) {
        this.searchedBiosInfo = await this.getBiosInfo(address);
        this.address = address;
      } else {
        const toast = await toastController
        .create({
          message: 'Invalid address: ' + address,
          duration: 2000,
          color: 'medium'
        })
        return toast.present();
      }
    }
  }
}
</script>

<style scoped>

</style>
