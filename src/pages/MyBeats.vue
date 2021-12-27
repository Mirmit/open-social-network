<template>
  <ion-page>
    <ion-content>
      <user-profile v-if="biosInfo"
          :username="biosInfo.username"
          :bios="biosInfo.bios"
          :image="biosInfo.image"
          :number-of-beats="biosInfo.numberOfBeats"
      ></user-profile>
      <beat
          v-for="beat in orderedMyBeats"
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
import router from "../router";
import _ from "lodash";

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
      },
      orderedMyBeats: {}
    }
  },
  computed: {
    ...mapGetters([
      'myBeats',
      'biosInfo',
      'registered',
      'loading',
      'logged'
    ]),
  },
  methods: {
    ...mapActions([
        'refreshMyBeats',
        'getBiosInfo',
        'setLoading'
    ]),
  },
  async ionViewWillEnter() {
    if (this.registered && this.logged) {
      this.setLoading(true);
      await this.getBiosInfo();
      await this.refreshMyBeats(10);
      this.orderedMyBeats = _.orderBy(this.myBeats, ['datetime'], ['desc']);
      this.setLoading(false);
    } else {
      await router.push({ name: 'MyWall'})
    }
  }
}
</script>

<style scoped>

</style>
