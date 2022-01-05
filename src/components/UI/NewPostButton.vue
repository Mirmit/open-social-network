<template>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button color="secondary" @click="$emit('customClick')">
      <ion-icon :icon="heart" style="color:white"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton } from "@ionic/vue";
import {heart} from 'ionicons/icons';

export default {
  name: "NewPostButton",
  components: {
    IonFab,
    IonFabButton
  },
  emits: ['customClick'],
  setup() {
    return { heart};
  },
}
</script>

<style scoped>

</style>
