<template>
  <ion-page>
    <ion-content>
      <user-profile v-if="biosInfo"
          :username="biosInfo.username"
          :bios="biosInfo.bios"
          :image="biosInfo.image"
          :number-of-beats="biosInfo.numberOfBeats"
          :address="myEthAddress"
      ></user-profile>
      <beat
          v-for="beat in orderedMyBeats"
          :key="beat.id"
          :id="beat.id"
          :title="beat.title"
          :author="beat.author"
          :datetime="beat.datetime"
          :content="beat.content"
          :username="beat.username"
          :userImage="beat.userImage"
          :replyTo="beat.replyTo"
      ></beat>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from "@ionic/vue";
import Beat from "../components/beats/Beat";
import UserProfile from "../components/layouts/UserProfile";
import {mapActions, mapGetters} from "vuex";
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
      }
    }
  },
  computed: {
    ...mapGetters([
      'myBeats',
      'biosInfo',
      'registered',
      'loading',
      'logged',
      'myEthAddress',
      'registering'
    ]),
    orderedMyBeats() {
      return _.orderBy(this.myBeats, ['datetime'], ['desc']);
    }
  },
  methods: {
    ...mapActions([
        'refreshMyBeats',
        'getBiosInfo',
        'setLoading'
    ]),
  },
  watch: {
    registering(newVal) {
      if (newVal === false){
        window.location.reload();
      }
    }
  },
  async ionViewWillEnter() {
    console.log('entro a me');
    if (this.registered && this.logged) {
      console.log('estic al if de me');
      this.setLoading(true);
      await this.getBiosInfo();
      await this.refreshMyBeats(10);
      this.setLoading(false);
    } else {
      console.log('not registered or logged', this.registering);
    }
    // } else {
    //   // await router.push({ name: 'MyWall'})
    // }
  },
}
</script>

<style scoped>

</style>
