<template>
  <ion-fab vertical="bottom" horizontal="end">
    <ion-fab-button color="secondary" @click="$emit('customClick')">
      Beat!
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton } from "@ionic/vue";

export default {
  name: "NewPostButton",
  components: {
    IonFab,
    IonFabButton
  },
  emits: ['customClick']
}
</script>

<style scoped>

</style>
