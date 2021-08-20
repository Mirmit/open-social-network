<template>
  <ion-page>
    <ion-content>
      <user-profile
          :username="biosInfo.username"
          :bios="biosInfo.bios"
      ></user-profile>
      <beat
          v-for="beat in myBeats"
          :key="beat.id"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
      ></beat>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import Beat from "../components/beats/Beat";
import UserProfile from "../components/layouts/UserProfile";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "MyBeats",
  components: {
    Beat,
    UserProfile,
    IonPage,
    IonContent
  },
  inject: [ 'beeAddress', 'beatTopic', 'biosTopic' ],
  data() {
    return {
      userInfo: {
        username: '',
        bios: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'myBeats',
      'biosInfo'
    ]),
  },
  methods: {
    ...mapActions([
        'getMyBeats',
        'getBiosInfo'
    ]),
  },
  async ionViewDidEnter() {
    await this.getMyBeats();
    await this.getBiosInfo();
  }
}
</script>

<style scoped>

</style>
