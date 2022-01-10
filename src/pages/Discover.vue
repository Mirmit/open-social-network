<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <the-user-search></the-user-search>
      <other-user-profile v-for="(otherBiosInfo, name) in othersBiosInfo"
        :key="otherBiosInfo.username"
        :username="otherBiosInfo.username"
        :bios="otherBiosInfo.bios"
        :image="otherBiosInfo.image"
        :number-of-beats="otherBiosInfo.numberOfBeats"
        :following="otherBiosInfo.following"
        :author="name"
      ></other-user-profile>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage , IonContent} from "@ionic/vue"
import OtherUserProfile from "../components/layouts/OtherUserProfile";
import router from "../router";
import {mapActions, mapGetters} from "vuex";
import TheUserSearch from "../components/layouts/TheUserSearch";

export default {
  name: "Discover",
  components: {
    IonPage,
    IonContent,
    OtherUserProfile,
    TheUserSearch
  },
  computed: {
    ...mapGetters([
      'registered',
      'logged',
      'othersBiosInfo'
    ]),
  },
  methods: {
    ...mapActions([
        'getBiosInfo',
        'setLoading'
    ])
  }
  ,
  async ionViewWillEnter() {
    if (this.registered && this.logged) {
      this.setLoading(true);
      this.setLoading(false);
    } else {
      await router.push({ name: 'MyWall'})
    }
  }
}
</script>

<style scoped>

</style>
